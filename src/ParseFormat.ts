/* http://keith-wood.name/calendars.html
   Calendars parsing and formatting.
   Written by Keith Wood (kbwood.au{at}gmail.com) June 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CalendarError, CDate } from './Calendars'

// Date form for ATOM (RFC 3339/ISO 8601).
const ATOM = 'yyyy-mm-dd'
// Date form for cookies.
const COOKIE = 'D, dd M yyyy'
// Date form for full date.
const FULL = 'DD, MM d, yyyy'
// Date form for ISO 8601.
const ISO_8601 = 'yyyy-mm-dd'
// Date form for Julian day number.
const JULIAN = 'J'
// Date form for RFC 822.
const RFC_822 = 'D, d M yy'
// Date form for RFC 850.
const RFC_850 = 'DD, dd-M-yy'
// Date form for RFC 1036.
const RFC_1036 = 'D, d M yy'
// Date form for RFC 1123.
const RFC_1123 = 'D, d M yyyy'
// Date form for RFC 2822.
const RFC_2822 = 'D, d M yyyy'
// Date form for RSS (RFC 822).
const RSS = 'D, d M yy'
// Date form for W3c (ISO 8601).
const W3C = 'yyyy-mm-dd'

/* Format a date object into a string value.
   The format can be combinations of the following:
    * d  - day of month (no leading zero)
    * dd - day of month (two digit)
    * o  - day of year (no leading zeros)
    * oo - day of year (three digit)
    * D  - day name short
    * DD - day name long
    * w  - week of year (no leading zero)
    * ww - week of year (two digit)
    * m  - month of year (no leading zero)
    * mm - month of year (two digit)
    * M  - month name short
    * MM - month name long
    * yy - year (two digit)
    * yyyy - year (four digit)
    * YYYY - formatted year
    * e - epoch
    * '...' - literal text
    * '' - single quote */
const formatDate = function (date: CDate, pattern: string = ''): string {
  const cal = date.calendar()
  pattern = pattern || cal.local.dateFormat
  let index = 0
  // Check whether a format character is doubled
  const doubled = (match: string, step?: number): boolean => {
    let matches = 1
    while (index + matches < pattern.length && pattern.charAt(index + matches) === match) {
      matches++
    }
    index += matches - 1
    return Math.floor(matches / (step || 1)) > 1
  }
  // Localise numbers if requested
  const localiseNumbers = (value: string): string =>
    cal.local.localiseDigits ? cal.local.localiseDigits(value) : value
  // Format a number, with leading zeroes if necessary
  const formatNumber = (match: string, value: number, len: number): string => {
    let num = `${value}`
    if (doubled(match)) {
      while (num.length < len) {
        num = `0${num}`
      }
    }
    return num
  }
  // Format a name, short or long as requested
  const formatName = (match: string, value: number, shortNames: string[], longNames: string[]): string =>
    doubled(match) ? longNames[value] : shortNames[value]

  let output = ''
  let literal = false
  for (index = 0; index < pattern.length; index++) {
    if (literal) {
      if (pattern.charAt(index) === "'" && !doubled("'")) {
        literal = false
      } else {
        output += pattern.charAt(index)
      }
    } else {
      switch (pattern.charAt(index)) {
        case 'd': output += localiseNumbers(formatNumber('d', date.day(), 2)); break
        case 'D': output += formatName('D', date.dayOfWeek(), cal.local.dayNamesShort, cal.local.dayNames); break
        case 'o': output += localiseNumbers(formatNumber('o', date.dayOfYear(), 3)); break
        case 'w': output += localiseNumbers(formatNumber('w', date.weekOfYear(), 2)); break
        case 'm': output += localiseNumbers(formatNumber('m', date.month(), 2)); break
        case 'M': output += formatName('M', date.month() - cal.minMonth, cal.local.monthNamesShort, cal.local.monthNames); break
        case 'y':
          output += localiseNumbers(`${doubled('y', 2)
              ? date.year()
              : (date.year() % 100 < 10 ? '0' : '') + date.year() % 100}`)
          break
        case 'Y':
          doubled('Y', 2)
          output += date.formatYear()
          break
        case 'e': output += date.epoch(); break
        case "'":
          if (doubled("'")) {
            output += "'"
          } else {
            literal = true
          }
          break
        default:
          output += pattern.charAt(index)
      }
    }
  }
  return output
}

CalendarBase.prototype.format =
function format (yearOrDate: CDate | number, monthOrPattern: string | number | undefined, day?: number, pattern?: string): string {
  const [y, m, d] = yearOrDate instanceof CDate
  // @ts-ignore: validate is protected
    ? this.validate('', yearOrDate)
  // @ts-ignore: validate is protected
    : this.validate(Calendars.local.invalidDate, yearOrDate, monthOrPattern as number, day as number)
  return yearOrDate instanceof CDate
    ? formatDate(yearOrDate, monthOrPattern as string)
    : formatDate(this.date(y, m, d), pattern)
}

const errorMessages = {
  missingNumberAt: 'Missing number at position {0}',
  unknownNameAt: 'Unknown name at position {0}',
  unexpectedLiteralAt: 'Unexpected literal at position {0}',
  unexpectedText: 'Additional text found at end'
}

// Parse a string value into a date object.
const parseDate = function (cal: CalendarBase, value: string, pattern: string = ''): CDate {
  pattern = pattern || cal.local.dateFormat
  let iValue = 0 // Position in the value
  let iPattern = 0 // Position in the pattern
  let shortYear = false
  // Check whether a format character is doubled
  const doubled = (match: string, step?: number): boolean => {
    let matches = 1
    while (iPattern + matches < pattern.length && pattern.charAt(iPattern + matches) === match) {
      matches++
    }
    iPattern += matches - 1
    return Math.floor(matches / (step || 1)) > 1
  }
  // Extract a number from the string value
  const getNumber = (match: string, step?: number): number => {
    const isDoubled = doubled(match, step)
    if (match === 'y') {
      shortYear = !isDoubled
    }
    const size = [2, 3, isDoubled ? 4 : 2, isDoubled ? 4 : 2]['oyY'.indexOf(match) + 1]
    // Normalise numbers if necessary
    let localValue = value.substring(iValue)
    localValue = cal.local.normaliseDigits ? cal.local.normaliseDigits(localValue) : localValue
    const digits = new RegExp('^-?\\d{1,' + size + '}')
    const num = localValue.match(digits)
    if (!num) {
      throw new CalendarError(errorMessages.missingNumberAt.replace(/\{0\}/, `${iValue}`))
    }
    iValue += cal.local.localiseDigits ? cal.local.localiseDigits(num[0]).length : num[0].length
    return parseInt(num[0], 10)
  }
  // Extract a name from the string value and convert to an index
  const getName = (match: string, shortNames: string[], longNames: string[], offset: number = 0): number => {
    const names = (doubled(match) ? longNames : shortNames)
    let index = -1
    for (let i = 0; i < names.length; i++) {
      if (value.substring(iValue, iValue + names[i].length).toLowerCase() === names[i].toLowerCase()) {
        if (index === -1) {
          index = i
        } else if (names[i].length > names[index].length) {
          index = i
        }
      }
    }
    if (index > -1) {
      iValue += names[index].length
      return index + offset
    }
    throw new CalendarError(errorMessages.unknownNameAt.replace(/\{0\}/, `${iValue}`))
  }
  // Confirm that a literal character matches the string value
  const checkLiteral = (): void => {
    if (value.charAt(iValue) !== pattern.charAt(iPattern)) {
      throw new CalendarError(errorMessages.unexpectedLiteralAt.replace(/\{0\}/, `${iValue}`))
    }
    iValue++
  }
  let epoch = 1
  let year = NaN
  let month = NaN
  let day = NaN
  let doy = NaN
  let literal = false
  for (iPattern = 0; iPattern < pattern.length; iPattern++) {
    if (literal) {
      if (pattern.charAt(iPattern) === "'" && !doubled("'")) {
        literal = false
      } else {
        checkLiteral()
      }
    } else {
      switch (pattern.charAt(iPattern)) {
        case 'd': day = getNumber('d'); break
        case 'D': getName('D', cal.local.dayNamesShort, cal.local.dayNames); break
        case 'o': doy = getNumber('o'); break
        case 'w': getNumber('w'); break
        case 'm': month = getNumber('m'); break
        case 'M': month = getName('M', cal.local.monthNamesShort, cal.local.monthNames, cal.minMonth); break
        case 'y': year = getNumber('y', 2); break
        case 'Y': year = getNumber('Y', 2); break
        case 'e': epoch = getName('e', cal.local.epochs, cal.local.epochs); break
        case '*': iValue = value.length; break
        case "'":
          if (doubled("'")) {
            checkLiteral()
          } else {
            literal = true
          }
          break
        default: checkLiteral()
      }
    }
  }
  if (iValue < value.length) {
    throw new CalendarError(errorMessages.unexpectedText)
  }
  if (isNaN(year)) {
    year = cal.date().year()
  }
  if (year < 100 && shortYear) {
    year += Math.floor(cal.date().year() / 100) * 100
  }
  if (epoch === 0) {
    year = -year
  }
  if (!isNaN(doy)) {
    month = cal.firstMonth
    day = doy
    for (let dim = cal.daysInMonth(year, month); day > dim; dim = cal.daysInMonth(year, month)) {
      month++
      if (month > cal.monthsInYear(year)) {
        month = cal.minMonth
      }
      day -= dim
    }
  }
  return cal.date(year, month, day)
}

CalendarBase.prototype.parse = function (value: string, pattern: string = ''): CDate {
  return parseDate(this, value, pattern)
}

export { ATOM, COOKIE, FULL, ISO_8601, JULIAN, RFC_822, RFC_850, RFC_1036, RFC_1123, RFC_2822, RSS, W3C }
