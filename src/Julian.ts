/* http://keith-wood.name/worldCalendars.html
   Implementation of the Julian calendar.
   Based on code from http://www.fourmilab.ch/documents/calendar/.
   See also http://en.wikipedia.org/wiki/Julian_calendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Julian',
  epochs: ['BC', 'AD'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'mm/dd/yyyy',
  firstDay: 0,
  isRTL: false
}

class JulianCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Julian epoch: 1 January 0001 AD = 30 December 0001 BCE (Gregorian).
    super('Julian', 1721423.5, JulianCalendar.localisations[language] || JulianCalendar.localisations[''],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    if (y < 0) { y++ }; // No year zero
    return y % 4 === 0
  }

  // Determine the week of the year for a date - ISO 8601.
  weekOfYear(date: CDate): number;
  weekOfYear(year: number, month: number, day: number): number;
  weekOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    // Find Thursday of this week starting on Monday
    let checkDate = yearOrDate instanceof CDate
      ? this.date(yearOrDate)
      : this.date(yearOrDate, month as number, day as number)
    checkDate = checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd')
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    const [y, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return this.daysPerMonth[m - 1] + (m === 2 && this.leapYear(y) ? 1 : 0)
  }

  // Determine whether this date is a week day.
  weekDay(date: CDate): boolean;
  weekDay(year: number, month: number, day: number): boolean;
  weekDay (yearOrDate: CDate | number, month?: number, day?: number): boolean {
    const dow = yearOrDate instanceof CDate
      ? this.dayOfWeek(yearOrDate)
      : this.dayOfWeek(yearOrDate, month as number, day as number)
    return (dow || 7) < 6
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    let [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    if (y < 0) { y++ } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (m < 3) {
      m += 12
      y--
    }
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 1524.5
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    const a = Math.floor(jd + 0.5)
    const b = a + 1524
    const c = Math.floor((b - 122.1) / 365.25)
    const d = Math.floor(365.25 * c)
    const e = Math.floor((b - d) / 30.6001)
    const day = b - d - Math.floor(30.6001 * e)
    const month = e - Math.floor(e < 14 ? 1 : 13)
    let year = c - Math.floor(month > 2 ? 4716 : 4715)
    if (year <= 0) { year-- } // No year zero
    return this.date(year, month, day)
  }
}

Calendars.register('julian', JulianCalendar)

export { JulianCalendar }
