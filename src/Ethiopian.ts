/* http://keith-wood.name/worldCalendars.html
   Implementation of the Ethiopian calendar.
   See http://en.wikipedia.org/wiki/Ethiopian_calendar.
   See also Calendrical Calculations: The Millennium Edition
   (http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml).
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Ethiopian',
  epochs: ['BEE', 'EE'],
  monthNames: ['Meskerem', 'Tikemet', 'Hidar', 'Tahesas', 'Tir', 'Yekatit',
    'Megabit', 'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'],
  monthNamesShort: ['Mes', 'Tik', 'Hid', 'Tah', 'Tir', 'Yek',
    'Meg', 'Mia', 'Gen', 'Sen', 'Ham', 'Neh', 'Pag'],
  dayNames: ['Ehud', 'Segno', 'Maksegno', 'Irob', 'Hamus', 'Arb', 'Kidame'],
  dayNamesShort: ['Ehu', 'Seg', 'Mak', 'Iro', 'Ham', 'Arb', 'Kid'],
  dayNamesMin: ['Eh', 'Se', 'Ma', 'Ir', 'Ha', 'Ar', 'Ki'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}

class EthiopianCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Ethiopian epoch: 27 August 8 CE (Gregorian).
    super('Ethiopian', 1724220.5, EthiopianCalendar.localisations, language,
      [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5], 13)
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    if (y < 0) { y++ }; // No year zero
    return y % 4 === 3 || y % 4 === -1
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    const [y, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return this.daysPerMonth[m - 1] + (m === 13 && this.leapYear(y) ? 1 : 0)
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
    return d + (m - 1) * 30 + (y - 1) * 365 + Math.floor(y / 4) + this.jdEpoch - 1
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    let c = Math.floor(jd) + 0.5 - this.jdEpoch
    let year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1
    if (year <= 0) { year-- } // No year zero
    c = Math.floor(jd) + 0.5 - this.date(year, 1, 1).toJD()
    const month = Math.floor(c / 30) + 1
    const day = c - (month - 1) * 30 + 1
    return this.date(year, month, day)
  }
}

Calendars.register('ethiopian', EthiopianCalendar)

export { EthiopianCalendar }
