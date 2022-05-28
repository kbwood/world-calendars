/* http://keith-wood.name/worldCalendars.html
   Implementation of the Persian or Jalali calendar.
   Based on code from <a href="http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php">http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php</a>.
   See also <a href="http://en.wikipedia.org/wiki/Iranian_calendar">http://en.wikipedia.org/wiki/Iranian_calendar</a>.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { BaseCalendar, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

// Modulus function which works for non-integers.
const mod = (a: number, b: number): number => a - (b * Math.floor(a / b))

const defaultLocalisation: CalendarLocalisation = {
  name: 'Persian',
  epochs: ['BP', 'AP'],
  monthNames: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
    'Mehr', 'Aban', 'Azar', 'Day', 'Bahman', 'Esfand'],
  monthNamesShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Day', 'Bah', 'Esf'],
  dayNames: ['Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e', 'Shanbe'],
  dayNamesShort: ['Yek', 'Do', 'Se', 'Chæ', 'Panj', 'Jom', 'Sha'],
  dayNamesMin: ['Ye', 'Do', 'Se', 'Ch', 'Pa', 'Jo', 'Sh'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
}

class PersianCalendar extends BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    super('Persian', 1948320.5, PersianCalendar.localisations[language] || PersianCalendar.localisations[''],
      [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return (((((y - (y > 0 ? 474 : 473)) % 2820) + 474 + 38) * 682) % 2816) < 682
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

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const epBase = y - (y >= 0 ? 474 : 473)
    const epYear = 474 + mod(epBase, 2820)
    return d + (m <= 7 ? (m - 1) * 31 : (m - 1) * 30 + 6) +
      Math.floor((epYear * 682 - 110) / 2816) + (epYear - 1) * 365 +
      Math.floor(epBase / 2820) * 1029983 + this.jdEpoch - 1
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd) + 0.5
    const dEpoch = jd - this.toJD(475, 1, 1)
    const cycle = Math.floor(dEpoch / 1029983)
    const cYear = mod(dEpoch, 1029983)
    let yCycle = 2820
    if (cYear !== 1029982) {
      const aux1 = Math.floor(cYear / 366)
      const aux2 = mod(cYear, 366)
      yCycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) + aux1 + 1
    }
    let year = yCycle + (2820 * cycle) + 474
    year = (year <= 0 ? year - 1 : year)
    const yDay = jd - this.toJD(year, 1, 1) + 1
    const month = (yDay <= 186 ? Math.ceil(yDay / 31) : Math.ceil((yDay - 6) / 30))
    const day = jd - this.toJD(year, month, 1) + 1
    return this.date(year, month, day)
  }
}

Calendars.register('persian', PersianCalendar)
Calendars.register('jalali', PersianCalendar)

export { PersianCalendar }
