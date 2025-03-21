/* http://keith-wood.name/worldCalendars.html
   Implementation of the Nanakshahi calendar.
   See also https://en.wikipedia.org/wiki/Nanakshahi_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CDate } from './Calendars'
import './Gregorian'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Nanakshahi',
  epochs: ['BN', 'AN'],
  monthNames: ['Chet', 'Vaisakh', 'Jeth', 'Harh', 'Sawan', 'Bhadon',
    'Assu', 'Katak', 'Maghar', 'Poh', 'Magh', 'Phagun'],
  monthNamesShort: ['Che', 'Vai', 'Jet', 'Har', 'Saw', 'Bha', 'Ass', 'Kat', 'Mgr', 'Poh', 'Mgh', 'Pha'],
  dayNames: ['Somvaar', 'Mangalvar', 'Budhvaar', 'Veervaar', 'Shukarvaar', 'Sanicharvaar', 'Etvaar'],
  dayNamesShort: ['Som', 'Mangal', 'Budh', 'Veer', 'Shukar', 'Sanichar', 'Et'],
  dayNamesMin: ['So', 'Ma', 'Bu', 'Ve', 'Sh', 'Sa', 'Et'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false
}

class NanakshahiCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }
  static gregorian: CalendarBase = Calendars.instance('gregorian')

  constructor (language: string = '') {
    // Julian date of start of Nanakshahi epoch: 14 March 1469 CE (Gregorian).
    super('Nanakshahi', 2257673.5, NanakshahiCalendar.localisations, language,
      [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return NanakshahiCalendar.gregorian.leapYear(y + (y < 1 ? 1 : 0) + 1469)
  }

  // Determine the week of the year for a date - ISO 8601.
  weekOfYear(date: CDate): number;
  weekOfYear(year: number, month: number, day: number): number;
  weekOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    // Find Thursday of this week starting on Monday
    let checkDate = yearOrDate instanceof CDate
      ? this.date(yearOrDate)
      : this.date(yearOrDate, month as number, day as number)
    checkDate = checkDate.add(1 - (checkDate.dayOfWeek() || 7), 'd')
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
    let doy = d
    for (let mn = 1; mn < m; mn++) {
      doy += this.daysPerMonth[mn - 1]
    }
    return doy + NanakshahiCalendar.gregorian.toJD(y + 1468, 3, 13)
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd + 0.5)
    let year = Math.floor((jd - (this.jdEpoch - 1)) / 366)
    if (year <= 0) { year-- }
    while (jd >= this.toJD(year + (year === -1 ? 2 : 1), 1, 1)) {
      year++
      if (year === 0) { year++ }
    }
    let day = jd - Math.floor(this.toJD(year, 1, 1))
    let month = 1
    while (day > this.daysInMonth(year, month)) {
      day -= this.daysInMonth(year, month)
      month++
    }
    return this.date(year, month, day)
  }
}

Calendars.register('nanakshahi', NanakshahiCalendar)

export { NanakshahiCalendar }
