/* http://keith-wood.name/worldCalendars.html
   Implementation of the Iranian or Solar Hijri calendar.
   Based on code from https://www.jqueryscript.net/demo/Iranian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/
   and information from https://www.time.ir/.
   See also http://en.wikipedia.org/wiki/Solar_Hijri_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) March 2025.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CalendarError, CDate } from './Calendars'
import type { CalendarLocalisation, DateParts, RegionalLocalisations, ValidOptions } from './Calendars'

type YearInfo = {
  gy: number
  leap: number
  march: number
}

const div = (a: number, b: number): number => ~~(a / b)
const mod = (a: number, b: number): number => a - ~~(a / b) * b

const special = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
  1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178]
const last = special.length - 1

const defaultLocalisation: CalendarLocalisation = {
  name: 'Iranian',
  epochs: ['BSH', 'SH'],
  monthNames: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
    'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
  monthNamesShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Dey', 'Bah', 'Esf'],
  dayNames: ['Yekshanbeh', 'Doshanbeh', 'Seshanbeh', 'Chahārshanbeh', 'Panjshanbeh', 'Jom\'eh', 'Shanbeh'],
  dayNamesShort: ['Yek', 'Do', 'Se', 'Cha', 'Panj', 'Jom', 'Sha'],
  dayNamesMin: ['Ye', 'Do', 'Se', 'Ch', 'Pa', 'Jo', 'Sh'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
}

class IranianCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Iranian epoch: 19 March 622 CE (Gregorian).
    super('Iranian', 1948320.5, IranianCalendar.localisations, language,
      [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return this.yearInfo(y).leap === 0
  }

  // Determine the week of the year for a date - ISO 8601.
  weekOfYear(date: CDate): number;
  weekOfYear(year: number, month: number, day: number): number;
  weekOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    // Find Saturday of this week starting on Saturday
    let checkDate = yearOrDate instanceof CDate
      ? this.date(yearOrDate)
      : this.date(yearOrDate, month as number, day as number)
    checkDate = checkDate.add(-((checkDate.dayOfWeek() + 1) % 7), 'd')
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    const [y, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return this.daysPerMonth[m - 1] + (m === 12 && this.leapYear(y) ? 1 : 0)
  }

  // Determine whether this date is a week day.
  weekDay(date: CDate): boolean;
  weekDay(year: number, month: number, day: number): boolean;
  weekDay (yearOrDate: CDate | number, month?: number, day?: number): boolean {
    const dow = yearOrDate instanceof CDate
      ? this.dayOfWeek(yearOrDate)
      : this.dayOfWeek(yearOrDate, month as number, day as number)
    return dow !== 5
  }

  // Determine whether a date is valid for this calendar.
  isValid (year: number, month: number, day: number, validOptions: ValidOptions = {}): boolean {
    const valid = super.isValid(year, month, day, validOptions)
    return valid && year >= special[0] && year < special[last]
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const info = this.yearInfo(y)
    return this.g2d(info.gy, 3, info.march) + 31 * (m - 1) - div(m, 7) * (m - 7) + d - 1
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    let day, month
    const gy = this.d2gy(jd)
    let year = gy - 621
    if (year <= 0) { year-- } // No year zero
    const info = this.yearInfo(year)
    let diff = jd - this.g2d(gy, 3, info.march)
    if (diff >= 0) {
      if (diff <= 185) {
        month = div(diff, 31) + 1
        day = mod(diff, 31) + 1
        return this.date(year, month, day)
      }
      diff -= 186
    } else {
      year--
      if (year === 0) { year-- } // No year zero
      diff += 179
      if (info.leap === 1) {
        diff++
      }
    }
    month = div(diff, 30) + 7
    day = mod(diff, 30) + 1
    return this.date(year, month, day)
  }

  // Convert from Julian date to Gregorian year.
  protected d2gy (jd: number): number {
    const i = 4 * (jd + 0.5) + 139361631 + 4 * div(3 * div(4 * (jd + 0.5) + 183187720, 146097), 4) - 3908
    const j = 5 * div(mod(i, 1461), 4) + 308
    const gm = mod(div(j, 153), 12) + 1
    return div(i, 1461) - 100100 + div(8 - gm, 6)
  }

  // Convert from Gregorian details to Julian date.
  protected g2d (year: number, month: number, day: number): number {
    const i = div(1461 * (year + div(month - 8, 6) + 100100), 4) +
      div(153 * mod(month + 9, 12) + 2, 5) + day - 34840408
    return i - div(3 * div(year + 100100 + div(month - 8, 6), 100), 4) + 752 - 0.5
  }

  // Check that a candidate date is from the same calendar and is valid.
  protected validate(error: string, date: CDate): DateParts;
  protected validate(error: string, year: number, month: number, day: number, validOptions?: ValidOptions): DateParts;
  protected validate (error: string, yearOrDate: CDate | number, month?: number, day?: number, validOptions?: ValidOptions): DateParts {
    const [y, m, d] = yearOrDate instanceof CDate
      ? super.validate(error, yearOrDate)
      : super.validate(error, yearOrDate, month as number, day as number, validOptions as ValidOptions)
    if (y < special[0] || y >= special[last]) {
      throw new CalendarError(error.replace(/\{0\}/, this.local.name))
    }
    return [y, m, d]
  }

  // Provide information about a given year.
  protected yearInfo (year: number): YearInfo {
    let specDiff = 0
    if (year < 0) { year++ } // No year zero
    const gy = year + 621
    let m = -14
    let prevSpec = special[0]
    for (let i = 1; i <= last && (specDiff = special[i] - prevSpec, special[i] <= year); i++) {
      m += 8 * div(specDiff, 33) + div(mod(specDiff, 33), 4)
      prevSpec = special[i]
    }
    let offset = year - prevSpec
    m += 8 * div(offset, 33) + div(mod(offset, 33) + 3, 4)
    if (mod(specDiff, 33) === 4 && specDiff - offset === 4) {
      m++
    }
    const r = div(gy, 4) - div(3 * (div(gy, 100) + 1), 4) - 150
    const march = 20 + m - r
    if (specDiff - offset < 6) {
      offset = offset - specDiff + 33 * div(specDiff + 4, 33)
    }
    let leap = mod(mod(offset + 1, 33) - 1, 4)
    leap = (leap === -1 ? 4 : leap)
    return { gy, leap, march }
  }
}

Calendars.register('iranian', IranianCalendar)

export { IranianCalendar }
