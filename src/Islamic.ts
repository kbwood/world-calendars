/* http://keith-wood.name/worldCalendars.html
   Implementation of the Islamic or '16 civil' calendar.
   Based on code from http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php.
   See also http://en.wikipedia.org/wiki/Islamic_calendar.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

import Calendars, { CalendarBase, CDate } from './Calendars'
import type { CalendarLocalisation, RegionalLocalisations } from './Calendars'

const defaultLocalisation: CalendarLocalisation = {
  name: 'Islamic',
  epochs: ['BH', 'AH'],
  monthNames: ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani',
    'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
  monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
  dayNames: ['Yawm al-ahad', 'Yawm al-ithnayn', 'Yawm ath-thulaathaa\'',
    'Yawm al-arbi\'aa\'', 'Yawm al-khamīs', 'Yawm al-jum\'a', 'Yawm as-sabt'],
  dayNamesShort: ['Aha', 'Ith', 'Thu', 'Arb', 'Kha', 'Jum', 'Sab'],
  dayNamesMin: ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
}

class IslamicCalendar extends CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  static localisations: RegionalLocalisations = { '': defaultLocalisation }

  constructor (language: string = '') {
    // Julian date of start of Islamic epoch: 16 July 622 CE (Gregorian).
    super('Islamic', 1948439.5, IslamicCalendar.localisations[language] || IslamicCalendar.localisations[''],
      [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29])
  }

  // Determine whether this date is in a leap year.
  leapYear(date: CDate): boolean;
  leapYear(year: number): boolean;
  leapYear (yearOrDate: CDate | number): boolean {
    let [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    if (y < 0) { y++ }; // No year zero
    return (y * 11 + 14) % 30 < 11
  }

  // Retrieve the number of days in a year.
  daysInYear (yearOrDate: CDate | number): number {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return (this.leapYear(y) ? 355 : 354)
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
    let [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    if (y <= 0) { y++ } // No year zero
    return d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + (11 * y)) / 30) + this.jdEpoch - 1
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    jd = Math.floor(jd) + 0.5
    let year = Math.floor((30 * (jd - this.jdEpoch) + 10646) / 10631)
    year = (year <= 0 ? year - 1 : year)
    const month = Math.min(12, Math.ceil((jd - 29 - this.toJD(year, 1, 1)) / 29.5) + 1)
    const day = jd - this.toJD(year, month, 1) + 1
    return this.date(year, month, day)
  }
}

Calendars.register('islamic', IslamicCalendar)

export { IslamicCalendar }
