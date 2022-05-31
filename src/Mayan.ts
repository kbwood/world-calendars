/* http://keith-wood.name/worldCalendars.html
   Implementation of the Mayan Long Count calendar.
   See also http://en.wikipedia.org/wiki/Mayan_calendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { BaseCalendar, CalendarError, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Mayan',
  epochs: ['', ''],
  monthNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17'],
  monthNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17'],
  dayNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  dayNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  dayNamesMin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  digits: undefined,
  dateFormat: 'YYYY.m.d',
  firstDay: 0,
  isRTL: false
}

const haabMonths = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax',
  'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb']
const tzolkinMonths = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc',
  'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau']

// Modulus function which works for non-integers.
const mod = (a: number, b: number): number => a - (b * Math.floor(a / b))

// Modulus function which returns numerator if modulus is zero.
const amod = (a: number, b: number): number => mod(a - 1, b) + 1

class MayanCalendar extends BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Mayan epoch: 11 August 3114 BCE (Gregorian).
    super('Mayan', 584282.5, MayanCalendar.localisations[language] || MayanCalendar.localisations[''],
      [], 18, true, 0, 0, 0)
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

  // Format the year, if not a simple sequential number.
  formatYear (yearOrDate: CDate | number): string {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    const baktun = Math.floor(y / 400)
    y = y % 400
    y += (y < 0 ? 400 : 0)
    const katun = Math.floor(y / 20)
    return baktun + '.' + katun + '.' + (y % 20)
  }

  // Convert from the formatted year back to a single number.
  forYear (years: string): number {
    const parts = years.split('.')
    if (parts.length < 3) {
      throw new CalendarError('Invalid Mayan year')
    }
    let year = 0
    for (let i = 0; i < parts.length; i++) {
      const y = parseInt(parts[i], 10)
      if (Math.abs(y) > 19 || (i > 0 && y < 0)) {
        throw new CalendarError('Invalid Mayan year')
      }
      year = year * 20 + y
    }
    return year
  }

  // Determine the week of the year for a date.
  weekOfYear(date: CDate): number;
  weekOfYear(year: number, month: number, day: number): number;
  weekOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    yearOrDate instanceof CDate
      ? this.date(yearOrDate)
      : this.date(yearOrDate, month as number, day as number)
    return 0
  }

  // Retrieve the number of days in a year.
  daysInYear (yearOrDate: CDate | number): number {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return 360
  }

  // Retrieve the number of days in a month.
  daysInMonth(date: CDate): number;
  daysInMonth(year: number, month: number): number;
  daysInMonth (yearOrDate: CDate | number, month?: number): number {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay, { notDay: true })
    return 20
  }

  // Retrieve the number of days in a week.
  daysInWeek (): number {
    return 5 // Just for formatting
  }

  // Retrieve the day of the week for a date.
  dayOfWeek(date: CDate): number;
  dayOfWeek(year: number, month: number, day: number): number;
  dayOfWeek (yearOrDate: CDate | number, month?: number, day?: number): number {
    // @ts-ignore: first two return values aren't used
    const [y, m, d] = yearOrDate instanceof CDate // eslint-disable-line no-unused-vars
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return d
  }

  // Determine whether this date is a week day.
  weekDay(date: CDate): boolean;
  weekDay(year: number, month: number, day: number): boolean;
  weekDay (yearOrDate: CDate | number, month?: number, day?: number): boolean {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, day as number, { notDay: true })
    return true
  }

  // Retrieve additional information about a date - contents depends on calendar.
  extraInfo(date: CDate): Object;
  extraInfo(year: number, month: number, day: number): Object;
  extraInfo (yearOrDate: CDate | number, month?: number, day?: number): Object {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const jd = this.toJD(y, m, d)
    const haab = this.toHaab(jd)
    const tzolkin = this.toTzolkin(jd)
    return {
      haabMonthName: haabMonths[haab[0] - 1],
      haabMonth: haab[0],
      haabDay: haab[1],
      tzolkinDayName: tzolkinMonths[tzolkin[0] - 1],
      tzolkinDay: tzolkin[0],
      tzolkinTrecena: tzolkin[1]
    }
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD(date: CDate): number;
  toJD(year: number, month: number, day: number): number;
  toJD (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return d + (m * 20) + (y * 360) + this.jdEpoch
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd) + 0.5 - this.jdEpoch
    const year = Math.floor(jd / 360)
    jd = jd % 360
    jd += (jd < 0 ? 360 : 0)
    const month = Math.floor(jd / 20)
    const day = jd % 20
    return this.date(year, month, day)
  }

  // Retrieve Haab date (month and day) from a Julian date.
  private toHaab (jd: number): [number, number] {
    const day = mod(jd - this.jdEpoch + 8 + ((18 - 1) * 20), 365)
    return [Math.floor(day / 20) + 1, mod(day, 20)]
  }

  // Retrieve Tzolkin date (day and trecena) from a Julian date.
  private toTzolkin (jd: number): [number, number] {
    return [amod(jd - this.jdEpoch + 20, 20), amod(jd - this.jdEpoch + 4, 13)]
  }
}

Calendars.register('mayan', MayanCalendar)

export { MayanCalendar }
