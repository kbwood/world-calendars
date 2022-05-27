/* http://keith-wood.name/worldCalendars.html
   Implementation of the Hebrew civil calendar.
   Based on code from <a href="http://www.fourmilab.ch/documents/calendar/">http://www.fourmilab.ch/documents/calendar/</a>.
   See also <a href="http://en.wikipedia.org/wiki/Hebrew_calendar">http://en.wikipedia.org/wiki/Hebrew_calendar</a>.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { BaseCalendar, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Hebrew',
  epochs: ['BAM', 'AM'],
  monthNames: ['Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul',
    'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Adar II'],
  monthNamesShort: ['Nis', 'Iya', 'Siv', 'Tam', 'Av', 'Elu', 'Tis', 'Che', 'Kis', 'Tev', 'She', 'Ada', 'Ad2'],
  dayNames: ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi\'i', 'Yom Chamishi', 'Yom Shishi', 'Yom Shabbat'],
  dayNamesShort: ['Ris', 'She', 'Shl', 'Rev', 'Cha', 'Shi', 'Sha'],
  dayNamesMin: ['Ri', 'She', 'Shl', 'Re', 'Ch', 'Shi', 'Sha'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}

// Modulus function which works for non-integers.
const mod = (a: number, b: number): number => a - (b * Math.floor(a / b))

class HebrewCalendar extends BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    super('Hebrew', 347995.5, HebrewCalendar.localisations[language] || HebrewCalendar.localisations[''],
      [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 29], 12, false, 1, 7, 1)
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    if (y < 0) { y++ } // No year zero
    return this.isLeapYear(y)
  }

  // Retrieve the number of months in a year.
  monthsInYear (yearOrDate: CDate | number): number {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay, { notDay: true, notMonth: true })
    if (y < 0) { y++ } // No year zero
    return this.isLeapYear(y) ? 13 : 12
  }

  // Retrieve the number of days in a year.
  daysInYear (yearOrDate: CDate | number): number {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return this.toJD((y === -1 ? +1 : y + 1), 7, 1) - this.toJD(y, 7, 1)
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    const [y, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    if (m === 12 && this.leapYear(y)) {
      // Adar I
      return 30
    }
    if (m === 8 && mod(this.daysInYear(y), 10) === 5) {
      // Cheshvan in shlemah year
      return 30
    }
    if (m === 9 && mod(this.daysInYear(y), 10) === 3) {
      // Kislev in chaserah year
      return 29
    }
    return this.daysPerMonth[m - 1]
  }

  // Determine whether this date is a week day.
  weekDay(date: CDate): boolean;
  weekDay(year: number, month: number, day: number): boolean;
  weekDay (yearOrDate: CDate | number, month?: number, day?: number): boolean {
    const dow = yearOrDate instanceof CDate
      ? this.dayOfWeek(yearOrDate)
      : this.dayOfWeek(yearOrDate, month as number, day as number)
    return dow !== 6
  }

  // Retrieve additional information about a date - contents depends on calendar.
  extraInfo(date: CDate): Object;
  extraInfo(year: number, month: number, day: number): Object;
  extraInfo (yearOrDate: CDate | number, month?: number, _?: number): Object {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return { yearType: `${this.leapYear(y) ? 'embolismic' : 'common'} ${['deficient', 'regular', 'complete'][this.daysInYear(y) % 10 - 3]}` }
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const adjYear = y <= 0 ? y + 1 : y
    let jd = this.jdEpoch + this.delay1(adjYear) + this.delay2(adjYear) + d + 1
    if (m < 7) {
      for (let mn = 7; mn <= this.monthsInYear(y); mn++) {
        jd += this.daysInMonth(y, mn)
      }
      for (let mn = 1; mn < m; mn++) {
        jd += this.daysInMonth(y, mn)
      }
    } else {
      for (let mn = 7; mn < m; mn++) {
        jd += this.daysInMonth(y, mn)
      }
    }
    return jd
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd) + 0.5
    let year = Math.floor(((jd - this.jdEpoch) * 98496.0) / 35975351.0) - 1
    while (jd >= this.toJD((year === -1 ? +1 : year + 1), 7, 1)) {
      year++
    }
    let month = (jd < this.toJD(year, 1, 1)) ? 7 : 1
    while (jd > this.toJD(year, month, this.daysInMonth(year, month))) {
      month++
    }
    const day = jd - this.toJD(year, month, 1) + 1
    return this.date(year, month, day)
  }

  // Test for delay of start of new year and to avoid Sunday, Wednesday, or Friday as start of the new year.
  private delay1 (year: number): number {
    const months = Math.floor((235 * year - 234) / 19)
    const parts = 12084 + 13753 * months
    let day = months * 29 + Math.floor(parts / 25920)
    if (mod(3 * (day + 1), 7) < 3) {
      day++
    }
    return day
  }

  // Check for delay in start of new year due to length of adjacent years.
  private delay2 (year: number): number {
    const last = this.delay1(year - 1)
    const present = this.delay1(year)
    const next = this.delay1(year + 1)
    return ((next - present) === 356 ? 2 : ((present - last) === 382 ? 1 : 0))
  }

  // Determine whether this year is a leap year.
  private isLeapYear (year: number): boolean {
    return mod(year * 7 + 1, 19) < 7
  }
}

Calendars.register('hebrew', HebrewCalendar)

export { HebrewCalendar }
