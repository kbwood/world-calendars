/* http://keith-wood.name/worldCalendars.html
   Implementations of various world calendars.
   Written by Keith Wood (wood.keith{at}optusnet.com.au) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

type CompareResult = -1 | 0 | 1;
type Period = 'd' | 'm' | 'w' | 'y';

// Pad a numeric value with leading zeroes.
function pad (value: number, length: number): string {
  const strValue = `${value}`
  return `${'000000'.substring(0, length - strValue.length)}${strValue}`
}

// Generic date, based on a particular calendar.
class CDate {
  private cal: BaseCalendar // eslint-disable-line no-use-before-define
  private yr: number
  private mn: number
  private dy: number

  // Create a new date in the given calendar.
  constructor(calendar: BaseCalendar, date: CDate);
  constructor(calendar: BaseCalendar, year: number, month: number, day: number);
  constructor (calendar: BaseCalendar, yearOrDate: CDate | number, month?: number, day?: number) {
    this.cal = calendar
    if (yearOrDate instanceof CDate) {
      if (this.cal.name !== yearOrDate.calendar().name) {
        throw Calendars.local.differentCalendars
          .replace(/\{0\}/, this.cal.local.name).replace(/\{1\}/, yearOrDate.calendar().local.name)
      }
      this.yr = yearOrDate.yr
      this.mn = yearOrDate.mn
      this.dy = yearOrDate.dy
    } else {
      if (!this.cal.isValid(yearOrDate, month as number, day as number)) {
        throw Calendars.local.invalidDate.replace(/\{0\}/, this.cal.local.name)
      }
      this.yr = yearOrDate
      this.mn = month as number
      this.dy = day as number
    }
  }

  // Create a new date in the current calendar.
  date(): CDate;
  date(year: number, month: number, day: number): CDate;
  date (year?: number, month?: number, day?: number): CDate {
    if (typeof year === 'undefined') {
      return this.cal.date(this)
    }
    return this.cal.date(year as number, month as number, day as number)
  }

  // Retrieve the calendar backing this date.
  calendar (): BaseCalendar {
    return this.cal
  }

  // Retrieve or set the year for this date.
  year(value: number): CDate;
  year(): number;
  year (value?: number): CDate | number {
    return typeof value === 'undefined' ? this.yr : this.set(value, 'y')
  }

  // Retrieve or set the month for this date.
  month(value: number): CDate;
  month(): number;
  month (value?: number): CDate | number {
    return typeof value === 'undefined' ? this.mn : this.set(value, 'm')
  }

  // Retrieve or set the day for this date.
  day(value: number): CDate;
  day(): number;
  day (value?: number): CDate | number {
    return typeof value === 'undefined' ? this.dy : this.set(value, 'd')
  }

  // Retrieve the epoch designator for this date, e.g. BCE or CE.
  epoch (): string {
    return this.cal.epoch(this)
  }

  // Format the year, if not a simple sequential number.
  formatYear (): string {
    return this.cal.formatYear(this)
  }

  // Determine whether this date is in a leap year.
  leapYear (): boolean {
    return this.cal.leapYear(this)
  }

  // Retrieve the month of the year for this date, i.e. the month's position within a numbered year.
  monthOfYear (): number {
    return this.cal.monthOfYear(this)
  }

  // Retrieve the week of the year for this date.
  weekOfYear (): number {
    return this.cal.weekOfYear(this)
  }

  // Retrieve the number of days in the year for this date.
  daysInYear (): number {
    return this.cal.daysInYear(this)
  }

  // Retrieve the day of the year for this date.
  dayOfYear (): number {
    return this.cal.dayOfYear(this)
  }

  // Retrieve the number of days in the month for this date.
  daysInMonth (): number {
    return this.cal.daysInMonth(this)
  }

  // Retrieve the day of the week for this date.
  dayOfWeek (): number {
    return this.cal.dayOfWeek(this)
  }

  // Determine whether this date is a week day.
  weekDay (): boolean {
    return this.cal.weekDay(this)
  }

  // Retrieve additional information about this date - contents depends on calendar.
  extraInfo (): Object {
    return this.cal.extraInfo(this)
  }

  // Add period(s) to a date.
  add (offset: number, period: Period): CDate {
    return this.cal.add(this, offset, period)
  }

  // Subtract period(s) from a date.
  sub (offset: number, period: Period): CDate {
    return this.cal.sub(this, offset, period)
  }

  // Set a portion of the date.
  set (value: number, period: Period): CDate {
    return this.cal.set(this, value, period)
  }

  // Compare this date to another date.
  compareTo (date: CDate): CompareResult {
    if (this.cal.name !== date.cal.name) {
      throw (Calendars.local.differentCalendars)
        .replace(/\{0\}/, this.cal.local.name).replace(/\{1\}/, date.cal.local.name)
    }
    const c = (this.yr !== date.yr
      ? this.yr - date.yr
      : this.mn !== date.mn
        ? this.monthOfYear() - date.monthOfYear()
        : this.dy - date.dy)
    return c < 0 ? -1 : c > 0 ? +1 : 0
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD (): number {
    return this.cal.toJD(this)
  }

  // Create a new date from a Julian day number.
  fromJD (jd: number): CDate {
    return this.cal.fromJD(jd)
  }

  // Convert this date to a standard (Gregorian) JavaScript Date
  toJSDate (): Date {
    return this.cal.toJSDate(this)
  }

  // Create a new date from a standard (Gregorian) JavaScript Date.
  fromJSDate (jsd: Date): CDate {
    return this.cal.fromJSDate(jsd)
  }

  // Convert to a string for display.
  toString (): string {
    return `${this.yr < 0 ? '-' : ''}${pad(Math.abs(this.yr), 4)}-${pad(this.mn, 2)}-${pad(this.dy, 2)} (${this.cal.name})`
  }
}

type SubstituteDigits = (value: number) => string;
type CalendarLocalisation = {
  dateFormat: string,
  dayNames: string[],
  dayNamesMin: string[],
  dayNamesShort: string[],
  digits: SubstituteDigits | undefined,
  epochs: string[],
  firstDay: number,
  isRTL: boolean,
  monthNames: string[],
  monthNamesShort: string[],
  name: string,
};
type DateParts = [number, number, number];
type RegionalLocalisations = {
  '': CalendarLocalisation,
  [index: string]: CalendarLocalisation | undefined,
};
type ValidOptions = {
  notDay?: boolean,
  notMonth?: boolean,
}

// Basic functionality for all calendars. Other calendars should extend this.
abstract class BaseCalendar {
  // The calendar name.
  readonly name: string
  // Julian day number of start of calendar epoch.
  protected readonly jdEpoch: number
  // Days per month in a common year.
  protected readonly daysPerMonth: number[]
  // true if has a year zero, false if not.
  protected readonly hasYearZero: boolean
  // The number of months in the year.
  protected readonly monthsPerYear: number
  // The minimum month number.
  protected readonly minMonth: number
  // The first month in the year.
  protected readonly firstMonth: number
  // The minimum day number.
  protected readonly minDay: number
  // The current localisation in use.
  readonly local: CalendarLocalisation

  constructor (name: string, jdEpoch: number, local: CalendarLocalisation, daysPerMonth: number[],
    monthsPerYear: number = 12, hasYearZero: boolean = false, minMonth: number = 1, firstMonth: number = 1, minDay: number = 1) {
    this.name = name
    this.jdEpoch = jdEpoch
    this.daysPerMonth = daysPerMonth
    this.monthsPerYear = monthsPerYear
    this.hasYearZero = hasYearZero
    this.minMonth = minMonth
    this.firstMonth = firstMonth
    this.minDay = minDay
    this.local = local
  }

  // Create a new date within this calendar - today if no parameters given.
  date(date?: CDate): CDate;
  date(year: number, month: number, day: number): CDate;
  date (yearOrDate?: CDate | number, month?: number, day?: number): CDate {
    if (typeof yearOrDate === 'undefined') {
      return this.fromJSDate(new Date(Date.now()))
    }
    if (yearOrDate instanceof CDate) {
      this.validate('', yearOrDate)
      return new CDate(this, yearOrDate)
    }
    this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return new CDate(this, yearOrDate, month as number, day as number)
  }

  // Determine whether this date is in a leap year.
  abstract leapYear(date: CDate): boolean;
  abstract leapYear(year: number): boolean;

  // Retrieve the epoch designator for this date.
  epoch (yearOrDate: CDate | number): string {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return (y < 0 ? this.local.epochs[0] : this.local.epochs[1])
  }

  // Format the year, if not a simple sequential number.
  formatYear (yearOrDate: CDate | number): string {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return (y < 0 ? '-' : '') + pad(Math.abs(y), 4)
  }

  // Retrieve the number of months in a year.
  monthsInYear (yearOrDate: CDate | number): number {
    yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay, { notDay: true, notMonth: true })
    return this.monthsPerYear
  }

  // Calculate the month's ordinal position within the year - for those calendars that don't start at month 1!
  monthOfYear(date: CDate): number;
  monthOfYear(year: number, month: number): number;
  monthOfYear (yearOrDate: CDate | number, month?: number): number {
    const [y, m] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidMonth, yearOrDate, month as number, this.minDay)
    const miy = this.monthsInYear(y)
    return (m + miy - this.firstMonth) % miy + this.minMonth
  }

  // Calculate actual month from ordinal position, starting from minMonth.
  fromMonthOfYear (year: number, ord: number): number {
    const m = (ord + this.firstMonth - 2 * this.minMonth) %
      this.monthsInYear(year) + this.minMonth
    this.validate(Calendars.local.invalidMonth, year, m, this.minDay)
    return m
  }

  // Retrieve the week of the year for this date.
  abstract weekOfYear(date: CDate): number;
  abstract weekOfYear(year: number, month: number, day: number): number;

  // Retrieve the number of days in a year.
  daysInYear (yearOrDate: CDate | number): number {
    const [y] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay)
    return (this.leapYear(y) ? 366 : 365)
  }

  // Retrieve the day of the year for a date.
  dayOfYear(date: CDate): number;
  dayOfYear(year: number, month: number, day: number): number;
  dayOfYear (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const date = this.date(y, m, d)
    return date.toJD() - this.date(y, this.fromMonthOfYear(y, this.minMonth), this.minDay).toJD() + 1
  }

  // Retrieve the number of days in the month for this date.
  abstract daysInMonth(date: CDate): number;
  abstract daysInMonth(year: number, month: number): number;

  // Retrieve the number of days in a week.
  daysInWeek (): number {
    return 7
  }

  // Retrieve the day of the week for a date.
  dayOfWeek(date: CDate): number;
  dayOfWeek(year: number, month: number, day: number): number;
  dayOfWeek (yearOrDate: CDate | number, month?: number, day?: number): number {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    const date = this.date(y, m, d)
    return (Math.floor(date.toJD()) + 2) % this.daysInWeek()
  }

  // Determine whether this date is a week day.
  abstract weekDay(date: CDate): boolean;
  abstract weekDay(year: number, month: number, day: number): boolean;

  // Retrieve additional information about a date - contents depends on calendar.
  extraInfo(date: CDate): Object;
  extraInfo(year: number, month: number, day: number): Object;
  extraInfo (yearOrDate: CDate | number, month?: number, day?: number): Object {
    if (yearOrDate instanceof CDate) {
      this.validate(Calendars.local.invalidDate, yearOrDate)
    } else {
      this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    }
    return {}
  }

  // Add period(s) to a date. Cater for no year zero.
  add (date: CDate, offset: number, period: Period): CDate {
    this.validate('', date)
    return this.addInternal(date, offset, period)
  }

  // Subtract period(s) from a date. Cater for no year zero.
  sub (date: CDate, offset: number, period: Period): CDate {
    this.validate('', date)
    return this.addInternal(date, -offset, period)
  }

  // Set a portion of the date.
  set (date: CDate, value: number, period: Period): CDate {
    this.validate('', date)
    const y = (period === 'y' ? value : date.year())
    const m = (period === 'm' ? value : date.month())
    let d = (period === 'd' ? value : date.day())
    if (period === 'y' || period === 'm') {
      d = Math.min(d, this.daysInMonth(y, m))
    }
    return date.date(y, m, d)
  }

  // Determine whether a date is valid for this calendar.
  isValid (year: number, month: number, day: number, { notDay, notMonth }: ValidOptions = {}): boolean {
    return (this.hasYearZero || year !== 0) &&
      (notMonth || (month >= this.minMonth && month - this.minMonth < this.monthsInYear(year))) &&
      (notDay || (day >= this.minDay && day - this.minDay < this.daysInMonth(year, month)))
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  abstract toJD(date: CDate): number;
  abstract toJD(year: number, month: number, day: number): number;

  // Create a new date from a Julian day number.
  abstract fromJD(jd: number): CDate;

  // Convert the date to a standard (Gregorian) JavaScript Date.
  toJSDate(date: CDate): Date;
  toJSDate(year: number, month: number, day: number): Date;
  toJSDate (yearOrDate: CDate | number, month?: number, day?: number): Date {
    const [y, m, d] = yearOrDate instanceof CDate
      ? this.validate('', yearOrDate)
      : this.validate(Calendars.local.invalidDate, yearOrDate, month as number, day as number)
    return this.gregorianToJSDate(this.gregorianFromJD(this.date(y, m, d).toJD()))
  }

  // Convert the date from a standard (Gregorian) JavaScript Date.
  fromJSDate (jsd: Date): CDate {
    return this.fromJD(this.gregorianToJD(this.gregorianFromJSDate(jsd)))
  }

  // Add period(s) to a date.
  protected addInternal (date: CDate, offset: number, period: Period): CDate {
    const correctYear = (yr: number): number => {
      if (yr === 0 && !this.hasYearZero) {
        yr += Math.sign(offset)
      }
      return yr
    }

    if (period === 'd' || period === 'w') {
      const jd = date.toJD() + offset * (period === 'w' ? this.daysInWeek() : 1)
      return date.calendar().fromJD(jd)
    }

    let y: number = correctYear(date.year() + (period === 'y' ? offset : 0))
    let m: number = date.monthOfYear() + (period === 'm' ? offset : 0)
    let d: number = date.day()
    if (period === 'y') {
      if (date.month() !== this.fromMonthOfYear(y, m)) { // Hebrew
        m = this.date(y, date.month(), this.minDay).monthOfYear()
      }
      m = Math.min(m, this.monthsInYear(y))
      d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)))
    } else if (period === 'm') {
      while (m < this.minMonth) {
        y = correctYear(y - 1)
        m += this.monthsInYear(y)
      }
      let yearMonths = this.monthsInYear(y)
      while (m > yearMonths - 1 + this.minMonth) {
        y = correctYear(y + 1)
        m -= yearMonths
        yearMonths = this.monthsInYear(y)
      }
      d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)))
    }
    return date.date(y, this.fromMonthOfYear(y, m), d)
  }

  // Create a new date from a Julian day number.
  protected gregorianFromJD (jd: number): DateParts {
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    const z = Math.floor(jd + 0.5)
    let a = Math.floor((z - 1867216.25) / 36524.25)
    a = z + 1 + a - Math.floor(a / 4)
    const b = a + 1524
    const c = Math.floor((b - 122.1) / 365.25)
    const d = Math.floor(365.25 * c)
    const e = Math.floor((b - d) / 30.6001)
    const day = b - d - Math.floor(e * 30.6001)
    const month = e - (e > 13.5 ? 13 : 1)
    let year = c - (month > 2.5 ? 4716 : 4715)
    if (year <= 0) { year-- } // No year zero
    return [year, month, day]
  }

  // Create a new date from a standard (Gregorian) JavaScript Date.
  protected gregorianFromJSDate (jsd: Date): DateParts {
    return [jsd.getFullYear(), jsd.getMonth() + 1, jsd.getDate()]
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  protected gregorianToJD ([year, month, day]: DateParts): number {
    if (year < 0) { year++ } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (month < 3) {
      month += 12
      year--
    }
    const a = Math.floor(year / 100)
    const b = 2 - a + Math.floor(a / 4)
    return Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) + day + b - 1524.5
  }

  // Convert this date to a standard (Gregorian) JavaScript Date.
  protected gregorianToJSDate ([year, month, day]: DateParts): Date {
    const jsd = new Date(year, month - 1, day)
    jsd.setFullYear(year) // < 100 adds 1900 in constructor
    jsd.setHours(0)
    jsd.setMinutes(0)
    jsd.setSeconds(0)
    jsd.setMilliseconds(0)
    // Hours may be non-zero on daylight saving cut-over:
    // > 12 when midnight changeover, but then cannot generate
    // midnight datetime, so jump to 1AM, otherwise reset.
    jsd.setHours(jsd.getHours() > 12 ? jsd.getHours() + 2 : 0)
    return jsd
  }

  // Check that a candidate date is from the same calendar and is valid.
  protected validate(error: string, date: CDate): DateParts;
  protected validate(error: string, year: number, month: number, day: number, validOptions?: ValidOptions): DateParts;
  protected validate (error: string, yearOrDate: CDate | number, month?: number, day?: number, validOptions?: ValidOptions): DateParts {
    if (yearOrDate instanceof CDate) {
      if (this.name !== yearOrDate.calendar().name) {
        throw Calendars.local.differentCalendars
          .replace(/\{0\}/, this.local.name).replace(/\{1\}/, yearOrDate.calendar().local.name)
      }
      return [yearOrDate.year(), yearOrDate.month(), yearOrDate.day()]
    } else {
      if (!this.isValid(yearOrDate, month as number, day as number, validOptions as ValidOptions)) {
        throw error.replace(/\{0\}/, this.local.name)
      }
      return [yearOrDate, month as number, day as number]
    }
  }
}

type CalendarClass = new(language: string) => BaseCalendar;
type CalendarClasses = {
  [index: string]: CalendarClass,
};
type CalendarMap = {
  [index: string]: BaseCalendar,
};
type CalendarsLocalisation = {
  alreadyRegistered: string,
  differentCalendars: string,
  invalidCalendar: string,
  invalidDate: string,
  invalidMonth: string,
  invalidYear: string,
};

class Calendars {
  static local: CalendarsLocalisation = {
    alreadyRegistered: 'Calendar already registered: {0}',
    differentCalendars: 'Cannot mix {0} and {1} dates',
    invalidCalendar: 'Calendar {0} not found',
    invalidDate: 'Invalid {0} date',
    invalidMonth: 'Invalid {0} month',
    invalidYear: 'Invalid {0} year'
  }

  private static calendars: CalendarClasses = {}
  private static localCals: CalendarMap = {}

  // Obtain a calendar implementation and localisation.
  static instance (name: string = 'gregorian', language: string = ''): BaseCalendar {
    const calName = name.toLowerCase()
    let cal = this.localCals[`${calName}-${language}`]
    if (!cal && this.calendars[calName]) {
      cal = new this.calendars[calName](language)
      this.localCals[`${calName}-${language}`] = cal
    }
    if (!cal) {
      throw Calendars.local.invalidCalendar.replace(/\{0\}/, name)
    }
    return cal
  }

  // Create a new date - for today if no other parameters given.
  static date(date?: CDate): CDate;
  static date(year: number, month: number, day: number, calendar?: (BaseCalendar | string), language?: string): CDate;
  static date (yearOrDate?: CDate | number, month?: number, day?: number, calendar?: (BaseCalendar | string), language?: string): CDate {
    if (yearOrDate instanceof CDate) {
      return yearOrDate.calendar().date(yearOrDate)
    }
    const cal = (calendar instanceof BaseCalendar ? calendar : this.instance(calendar, language))
    return typeof yearOrDate === 'undefined' ? cal.date() : cal.date(yearOrDate, month as number, day as number)
  }

  // Register a new calendar implementation.
  static register (name: string, implementingClass: CalendarClass): void {
    const calName = name.toLowerCase()
    if (this.calendars[calName]) {
      throw Calendars.local.alreadyRegistered.replace(/\{0\}/, name)
    }
    this.calendars[calName] = implementingClass
  }

  // A simple digit substitution function for localising numbers via the Calendar digits option.
  static substituteDigits (digits: string[]): SubstituteDigits {
    return (value: number): string =>
      `${value}`.replace(/[0-9]/g, (digit: string): string => digits[Number(digit)])
  }

  // Digit substitution function for localising Chinese style numbers via the Calendar digits option.
  static substituteChineseDigits (digits: string[], powers: string[]): SubstituteDigits {
    return (value: number): string => {
      let localNumber = ''
      let power = 0
      while (value > 0) {
        const units = value % 10
        localNumber = `${units === 0 ? '' : `${digits[units]}${powers[power]}`}${localNumber}`
        power++
        value = Math.floor(value / 10)
      }
      if (localNumber.indexOf(digits[1] + powers[1]) === 0) {
        localNumber = localNumber.substr(1)
      }
      return localNumber || digits[0]
    }
  }
}

export type { CalendarLocalisation, CompareResult, Period, RegionalLocalisations, SubstituteDigits }
export { BaseCalendar, CDate }
export default Calendars
