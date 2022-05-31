/* http://keith-wood.name/worldCalendars.html
   Implementation of the Proleptic Gregorian Calendar.
   See http://en.wikipedia.org/wiki/Gregoriancalendar
   and http://en.wikipedia.org/wiki/Proleptic_Gregoriancalendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { BaseCalendar, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
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

class GregorianCalendar extends BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Gregorian epoch: 1 January 0001 CE (Gregorian).
    super('Gregorian', 1721425.5, GregorianCalendar.localisations[language] || GregorianCalendar.localisations[''],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    if (y < 0) { y++ } // No year zero
    return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)
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
    const dateParts = yearOrDate instanceof CDate
      ? this.validate(Calendars.local.invalidDate, yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return this.gregorianToJD(dateParts)
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    const [year, month, day] = this.gregorianFromJD(jd)
    return this.date(year, month, day)
  }

  // Convert this date to a standard (Gregorian) JavaScript Date.
  toJSDate(date: CDate): Date;
  toJSDate(year: number, month: number, day: number): Date;
  toJSDate (yearOrDate: CDate | number, month?: number, day?: number): Date {
    const dateParts = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return this.gregorianToJSDate(dateParts)
  }

  // Create a new date from a standard (Gregorian) JavaScript Date.
  fromJSDate (jsd: Date): CDate {
    const [y, m, d] = this.gregorianFromJSDate(jsd)
    return this.date(y, m, d)
  }
}

Calendars.register('gregorian', GregorianCalendar)

export { GregorianCalendar }
