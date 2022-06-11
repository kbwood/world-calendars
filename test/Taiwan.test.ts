import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { TaiwanCalendar } from '../src/Taiwan'

describe('Taiwan calendar', () => {
  const taiwan = Calendars.instance('taiwan')
  const now = new Date(2022, 1 - 1, 2, 3, 4, 5, 0).getTime()
  let dateNow: jest.SpyInstance<number, []>

  const checkDate = (date: CDate, year: number, month: number, day: number, cal?: CalendarBase) => {
    expect(date.year()).toEqual(year)
    expect(date.month()).toEqual(month)
    expect(date.day()).toEqual(day)
    if (cal) {
      expect(date.calendar()).toEqual(cal)
    }
  }

  beforeAll(() => {
    dateNow = jest.spyOn(Date, 'now').mockImplementation(() => now)
  })

  afterAll(() => {
    dateNow.mockRestore()
  })

  it('should create a Taiwan calendar', () => {
    expect(taiwan).toBeInstanceOf(TaiwanCalendar)
  })

  it('should create a new date', () => {
    const date1 = taiwan.date(88, 7, 25)
    const date2 = taiwan.date(date1)
    const date3 = taiwan.date()

    checkDate(date1, 88, 7, 25, taiwan)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 111, 1, 2, taiwan)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { taiwan.date(88, 17, 55) }).toThrow(new CalendarError('Invalid Taiwan date'))
    expect(() => { taiwan.date(88, 2, 29) }).toThrow(new CalendarError('Invalid Taiwan date'))
    expect(() => { taiwan.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Taiwan date'))
  })

  it('should indicate leap years for a date', () => {
    expect(taiwan.date(85, 7, 1).leapYear()).toEqual(true)
    expect(taiwan.date(86, 7, 1).leapYear()).toEqual(false)
    expect(taiwan.date(87, 7, 1).leapYear()).toEqual(false)
    expect(taiwan.date(88, 7, 1).leapYear()).toEqual(false)
    expect(taiwan.date(89, 7, 1).leapYear()).toEqual(true)
  })

  it('should indicate leap years given a year', () => {
    expect(taiwan.leapYear(85)).toEqual(true)
    expect(taiwan.leapYear(86)).toEqual(false)
    expect(taiwan.leapYear(87)).toEqual(false)
    expect(taiwan.leapYear(88)).toEqual(false)
    expect(taiwan.leapYear(89)).toEqual(true)
  })

  it('should return the epoch for a date', () => {
    expect(taiwan.epoch(taiwan.date(85, 1, 2))).toEqual('ROC')
    expect(taiwan.epoch(taiwan.date(33, 1, 2))).toEqual('ROC')
    expect(taiwan.epoch(taiwan.date(-505, 1, 2))).toEqual('BROC')
  })

  it('should return the epoch given a year', () => {
    expect(taiwan.epoch(85)).toEqual('ROC')
    expect(taiwan.epoch(33)).toEqual('ROC')
    expect(taiwan.epoch(-505)).toEqual('BROC')
  })

  it('should format the year for a date', () => {
    expect(taiwan.formatYear(taiwan.date(85, 1, 2))).toEqual('0085')
    expect(taiwan.formatYear(taiwan.date(33, 1, 2))).toEqual('0033')
    expect(taiwan.formatYear(taiwan.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(taiwan.formatYear(85)).toEqual('0085')
    expect(taiwan.formatYear(33)).toEqual('0033')
    expect(taiwan.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(taiwan.monthsInYear(taiwan.date(85, 1, 2))).toEqual(12)
    expect(taiwan.monthsInYear(taiwan.date(33, 1, 2))).toEqual(12)
    expect(taiwan.monthsInYear(taiwan.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(taiwan.monthsInYear(85)).toEqual(12)
    expect(taiwan.monthsInYear(33)).toEqual(12)
    expect(taiwan.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(taiwan.monthOfYear(taiwan.date(85, 1, 2))).toEqual(1)
    expect(taiwan.monthOfYear(taiwan.date(85, 7, 5))).toEqual(7)
    expect(taiwan.monthOfYear(taiwan.date(85, 12, 31))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(taiwan.monthOfYear(85, 1)).toEqual(1)
    expect(taiwan.monthOfYear(85, 7)).toEqual(7)
    expect(taiwan.monthOfYear(85, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(taiwan.fromMonthOfYear(85, 1)).toEqual(1)
    expect(taiwan.fromMonthOfYear(85, 7)).toEqual(7)
    expect(taiwan.fromMonthOfYear(85, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(taiwan.weekOfYear(taiwan.date(85, 1, 2))).toEqual(1)
    expect(taiwan.weekOfYear(taiwan.date(85, 7, 5))).toEqual(27)
    expect(taiwan.weekOfYear(taiwan.date(85, 12, 31))).toEqual(1)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(taiwan.weekOfYear(85, 1, 2)).toEqual(1)
    expect(taiwan.weekOfYear(85, 7, 5)).toEqual(27)
    expect(taiwan.weekOfYear(85, 12, 31)).toEqual(1)
  })

  it('should return the days in the year for a date', () => {
    expect(taiwan.daysInYear(taiwan.date(85, 1, 2))).toEqual(366)
    expect(taiwan.daysInYear(taiwan.date(86, 7, 5))).toEqual(365)
    expect(taiwan.daysInYear(taiwan.date(87, 12, 31))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(taiwan.daysInYear(85)).toEqual(366)
    expect(taiwan.daysInYear(86)).toEqual(365)
    expect(taiwan.daysInYear(87)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(taiwan.dayOfYear(taiwan.date(85, 1, 2))).toEqual(2)
    expect(taiwan.dayOfYear(taiwan.date(85, 7, 5))).toEqual(187)
    expect(taiwan.dayOfYear(taiwan.date(85, 12, 31))).toEqual(366)
    expect(taiwan.dayOfYear(taiwan.date(86, 12, 31))).toEqual(365)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(taiwan.dayOfYear(85, 1, 2)).toEqual(2)
    expect(taiwan.dayOfYear(85, 7, 5)).toEqual(187)
    expect(taiwan.dayOfYear(85, 12, 31)).toEqual(366)
    expect(taiwan.dayOfYear(86, 12, 31)).toEqual(365)
  })

  it('should return the days in the month for a date', () => {
    expect(taiwan.daysInMonth(taiwan.date(85, 1, 2))).toEqual(31)
    expect(taiwan.daysInMonth(taiwan.date(85, 2, 5))).toEqual(29)
    expect(taiwan.daysInMonth(taiwan.date(85, 4, 9))).toEqual(30)
    expect(taiwan.daysInMonth(taiwan.date(85, 12, 31))).toEqual(31)
    expect(taiwan.daysInMonth(taiwan.date(86, 1, 2))).toEqual(31)
    expect(taiwan.daysInMonth(taiwan.date(86, 2, 5))).toEqual(28)
    expect(taiwan.daysInMonth(taiwan.date(86, 4, 9))).toEqual(30)
    expect(taiwan.daysInMonth(taiwan.date(86, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(taiwan.daysInMonth(85, 1)).toEqual(31)
    expect(taiwan.daysInMonth(85, 2)).toEqual(29)
    expect(taiwan.daysInMonth(85, 4)).toEqual(30)
    expect(taiwan.daysInMonth(85, 12)).toEqual(31)
    expect(taiwan.daysInMonth(86, 1)).toEqual(31)
    expect(taiwan.daysInMonth(86, 2)).toEqual(28)
    expect(taiwan.daysInMonth(86, 4)).toEqual(30)
    expect(taiwan.daysInMonth(86, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(taiwan.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(taiwan.dayOfWeek(taiwan.date(93, 2, 29))).toEqual(0)
    expect(taiwan.dayOfWeek(taiwan.date(98, 1, 2))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(taiwan.dayOfWeek(93, 2, 29)).toEqual(0)
    expect(taiwan.dayOfWeek(98, 1, 2)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(taiwan.weekDay(taiwan.date(93, 2, 29))).toEqual(false)
    expect(taiwan.weekDay(taiwan.date(98, 1, 2))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(taiwan.weekDay(93, 2, 29)).toEqual(false)
    expect(taiwan.weekDay(98, 1, 2)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(taiwan.extraInfo(taiwan.date(85, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(taiwan.extraInfo(85, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = taiwan.date(85, 1, 2)
    d = taiwan.add(d, 1, 'y')
    checkDate(d, 86, 1, 2)
    d = taiwan.add(d, 2, 'm')
    checkDate(d, 86, 3, 2)
    d = taiwan.add(d, 3, 'd')
    checkDate(d, 86, 3, 5)
    d = taiwan.add(d, -1, 'y')
    d = taiwan.add(d, -2, 'm')
    d = taiwan.add(d, -3, 'd')
    checkDate(d, 85, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = taiwan.date(85, 1, 2)
    d = taiwan.sub(d, 1, 'y')
    checkDate(d, 84, 1, 2)
    d = taiwan.sub(d, 2, 'm')
    checkDate(d, 83, 11, 2)
    d = taiwan.sub(d, 3, 'd')
    checkDate(d, 83, 10, 30)
    d = taiwan.sub(d, -1, 'y') // 84/10/30
    d = taiwan.sub(d, -2, 'm') // 84/12/30
    d = taiwan.sub(d, -3, 'd')
    checkDate(d, 85, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = taiwan.date(-1, 12, 30)
    d = taiwan.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = taiwan.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = taiwan.add(d, 2, 'm')
    checkDate(d, 1, 2, 29)
    d = taiwan.sub(d, 2, 'm')
    checkDate(d, -1, 12, 29)
    d = taiwan.add(d, 5, 'd')
    checkDate(d, 1, 1, 3)
    d = taiwan.sub(d, 4, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(taiwan.date(93, 2, 29).toJD()).toEqual(2453064.5)
    expect(taiwan.date(98, 1, 2).toJD()).toEqual(2454833.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(taiwan.toJD(93, 2, 29)).toEqual(2453064.5)
    expect(taiwan.toJD(98, 1, 2)).toEqual(2454833.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(taiwan.fromJD(2453064.5), 93, 2, 29)
    checkDate(taiwan.fromJD(2454833.5), 98, 1, 2)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(taiwan.date(93, 2, 29).toJSDate()).toEqual(new Date(2004, 2 - 1, 29))
    expect(taiwan.date(98, 1, 2).toJSDate()).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(taiwan.toJSDate(93, 2, 29)).toEqual(new Date(2004, 2 - 1, 29))
    expect(taiwan.toJSDate(98, 1, 2)).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(taiwan.fromJSDate(new Date(2004, 2 - 1, 29)), 93, 2, 29)
    checkDate(taiwan.fromJSDate(new Date(2009, 1 - 1, 2)), 98, 1, 2)
  })
})
