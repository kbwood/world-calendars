/* http://keith-wood.name/worldCalendars.html
   Implementation of the Taiwanese calendar.
   See http://en.wikipedia.org/wiki/Minguo_calendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CDate } from './Calendars'
import './Gregorian'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Taiwan',
  epochs: ['BROC', 'ROC'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: false
}

class TaiwanCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }
  static gregorian: CalendarBase = Calendars.instance('gregorian')
  static readonly yearsOffset: number = 1911

  constructor (language: string = '') {
    // Julian date of start of Taiwan epoch: 1 January 1912 CE (Gregorian)
    super('Taiwan', 2419402.5, TaiwanCalendar.localisations[language] || TaiwanCalendar.localisations[''],
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return TaiwanCalendar.gregorian.leapYear(this.taiwanToGregorianYear(y))
  }

  // Determine the week of the year for a date - ISO 8601.
  weekOfYear(date: CDate): number;
  weekOfYear(year: number, month: number, day: number): number;
  weekOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, month as number, day as number)
    return TaiwanCalendar.gregorian.weekOfYear(this.taiwanToGregorianYear(y), m, d)
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
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return TaiwanCalendar.gregorian.toJD(this.taiwanToGregorianYear(y), m, d)
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    const date = TaiwanCalendar.gregorian.fromJD(jd)
    return this.date(this.gregorianToTaiwanYear(date.year()), date.month(), date.day())
  }

  // Convert Taiwan to Gregorian year.
  private taiwanToGregorianYear (year: number): number {
    return year + TaiwanCalendar.yearsOffset + (year >= -TaiwanCalendar.yearsOffset && year <= -1 ? 1 : 0)
  }

  // Convert Gregorian to Taiwan year.
  private gregorianToTaiwanYear (year: number): number {
    return year - TaiwanCalendar.yearsOffset - (year >= 1 && year <= TaiwanCalendar.yearsOffset ? 1 : 0)
  }
}

Calendars.register('taiwan', TaiwanCalendar)

export { TaiwanCalendar }
