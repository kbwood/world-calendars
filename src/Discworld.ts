/* http://keith-wood.name/worldCalendars.html
   Implementation of the Discworld calendar - Unseen University version.
   See also http://wiki.lspace.org/mediawiki/Discworld_calendar
   and http://discworld.wikia.com/wiki/Discworld_calendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { BaseCalendar, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

// Names of the centuries
const centuries: string[] = []
centuries[20] = 'Fruitbat'
centuries[21] = 'Anchovy'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Discworld',
  epochs: ['BUC', 'UC'],
  monthNames: ['Ick', 'Offle', 'February', 'March', 'April', 'May', 'June',
    'Grune', 'August', 'Spune', 'Sektober', 'Ember', 'December'],
  monthNamesShort: ['Ick', 'Off', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Gru', 'Aug', 'Spu', 'Sek', 'Emb', 'Dec'],
  dayNames: ['Sunday', 'Octeday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Oct', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Oc', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 2,
  isRTL: false
}

class DiscworldCalendar extends BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Discworld epoch: 1 January 0001 CE (Gregorian)
    super('Discworld', 1721425.5, DiscworldCalendar.localisations[language] || DiscworldCalendar.localisations[''],
      [16, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32], 13)
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return false
  }

  // Retrieve the number of days in a year.
  daysInYear (yearOrDate: CDate | number): number {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return 400
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    const [, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return this.daysPerMonth[m - 1]
  }

  // Retrieve the number of days in a week.
  daysInWeek (): number {
    return 8
  }

  // Retrieve the day of the week for a date.
  dayOfWeek(date: CDate): number;
  dayOfWeek(year: number, month: number, day: number): number;
  dayOfWeek (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [, , d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return (d + 1) % 8
  }

  // Determine whether this date is a week day.
  weekDay(date: CDate): boolean;
  weekDay(year: number, month: number, day: number): boolean;
  weekDay (yearOrDate: CDate | number, month?: number, day?: number): boolean {
    const dow = yearOrDate instanceof CDate
      ? this.dayOfWeek(yearOrDate)
      : this.dayOfWeek(yearOrDate, month as number, day as number)
    return dow >= 2 && dow <= 6
  }

  // Retrieve additional information about a date - contents depends on calendar.
  extraInfo(date: CDate): Object;
  extraInfo(year: number, month: number, day: number): Object;
  extraInfo (yearOrDate: CDate | number, month?: number, day?: number): Object {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return { century: centuries[Math.floor((y - 1) / 100) + 1] || '' }
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    let [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    if (y < 0) { y++ }
    return d + (m > 1 ? 16 : 0) + (m > 2 ? (m - 2) * 32 : 0) + (y - 1) * 400 + this.jdEpoch - 1
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd + 0.5) - Math.floor(this.jdEpoch) - 1
    const year = Math.floor(jd / 400) + 1
    jd -= (year - 1) * 400
    jd += (jd > 15 ? 16 : 0)
    const month = Math.floor(jd / 32) + 1
    const day = jd - (month - 1) * 32 + 1
    return this.date(year <= 0 ? year - 1 : year, month, day)
  }
}

Calendars.register('discworld', DiscworldCalendar)

export { DiscworldCalendar }
