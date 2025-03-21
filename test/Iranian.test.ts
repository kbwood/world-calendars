import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { IranianCalendar } from '../src/Iranian'

describe('Iranian calendar', () => {
  const iranian = Calendars.instance('iranian')
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

  it('should create a Iranian calendar', () => {
    expect(iranian).toBeInstanceOf(IranianCalendar)
  })

  it('should create a new date', () => {
    const date1 = iranian.date(1403, 7, 25)
    const date2 = iranian.date(date1)
    const date3 = iranian.date()

    checkDate(date1, 1403, 7, 25, iranian)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1400, 10, 12, iranian)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { iranian.date(1403, 17, 55) }).toThrow(new CalendarError('Invalid Iranian date'))
    expect(() => { iranian.date(1404, 12, 30) }).toThrow(new CalendarError('Invalid Iranian date'))
    expect(() => { iranian.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Iranian date'))
  })

  it('should indicate leap years for a date', () => {
    expect(iranian.date(1403, 7, 1).leapYear()).toEqual(true)
    expect(iranian.date(1404, 7, 1).leapYear()).toEqual(false)
    expect(iranian.date(1405, 7, 1).leapYear()).toEqual(false)
    expect(iranian.date(1406, 7, 1).leapYear()).toEqual(false)
    expect(iranian.date(1407, 7, 1).leapYear()).toEqual(false)
    expect(iranian.date(1408, 7, 1).leapYear()).toEqual(true)
  })

  it('should indicate leap years given a year', () => {
    expect(iranian.leapYear(1403)).toEqual(true)
    expect(iranian.leapYear(1404)).toEqual(false)
    expect(iranian.leapYear(1405)).toEqual(false)
    expect(iranian.leapYear(1406)).toEqual(false)
    expect(iranian.leapYear(1407)).toEqual(false)
    expect(iranian.leapYear(1408)).toEqual(true)
  })

  it('should return the epoch for a date', () => {
    expect(iranian.epoch(iranian.date(1403, 1, 2))).toEqual('SH')
    expect(iranian.epoch(iranian.date(33, 1, 2))).toEqual('SH')
    expect(iranian.epoch(iranian.date(-5, 1, 2))).toEqual('BSH')
  })

  it('should return the epoch given a year', () => {
    expect(iranian.epoch(1403)).toEqual('SH')
    expect(iranian.epoch(33)).toEqual('SH')
    expect(iranian.epoch(-5)).toEqual('BSH')
  })

  it('should format the year for a date', () => {
    expect(iranian.formatYear(iranian.date(1403, 1, 2))).toEqual('1403')
    expect(iranian.formatYear(iranian.date(33, 1, 2))).toEqual('0033')
    expect(iranian.formatYear(iranian.date(-5, 1, 2))).toEqual('0005')
  })

  it('should format the year given a year', () => {
    expect(iranian.formatYear(1403)).toEqual('1403')
    expect(iranian.formatYear(33)).toEqual('0033')
    expect(iranian.formatYear(-5)).toEqual('0005')
  })

  it('should return the number of months in the year for a date', () => {
    expect(iranian.monthsInYear(iranian.date(1403, 1, 2))).toEqual(12)
    expect(iranian.monthsInYear(iranian.date(33, 1, 2))).toEqual(12)
    expect(iranian.monthsInYear(iranian.date(-5, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(iranian.monthsInYear(1403)).toEqual(12)
    expect(iranian.monthsInYear(33)).toEqual(12)
    expect(iranian.monthsInYear(-5)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(iranian.monthOfYear(iranian.date(1403, 1, 2))).toEqual(1)
    expect(iranian.monthOfYear(iranian.date(1403, 7, 5))).toEqual(7)
    expect(iranian.monthOfYear(iranian.date(1403, 12, 29))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(iranian.monthOfYear(1403, 1)).toEqual(1)
    expect(iranian.monthOfYear(1403, 7)).toEqual(7)
    expect(iranian.monthOfYear(1403, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(iranian.fromMonthOfYear(1403, 1)).toEqual(1)
    expect(iranian.fromMonthOfYear(1403, 7)).toEqual(7)
    expect(iranian.fromMonthOfYear(1403, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(iranian.weekOfYear(iranian.date(1403, 12, 30))).toEqual(52)
    expect(iranian.weekOfYear(iranian.date(1388, 1, 1))).toEqual(1)
    expect(iranian.weekOfYear(iranian.date(1388, 12, 29))).toEqual(53)
    expect(iranian.weekOfYear(iranian.date(1389, 1, 6))).toEqual(53)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(iranian.weekOfYear(1403, 12, 30)).toEqual(52)
    expect(iranian.weekOfYear(1388, 1, 1)).toEqual(1)
    expect(iranian.weekOfYear(1388, 12, 29)).toEqual(53)
    expect(iranian.weekOfYear(1389, 1, 6)).toEqual(53)
  })

  it('should return the days in the year for a date', () => {
    expect(iranian.daysInYear(iranian.date(1403, 1, 2))).toEqual(366)
    expect(iranian.daysInYear(iranian.date(1404, 7, 5))).toEqual(365)
    expect(iranian.daysInYear(iranian.date(1405, 12, 29))).toEqual(365)
    expect(iranian.daysInYear(iranian.date(1406, 12, 29))).toEqual(365)
    expect(iranian.daysInYear(iranian.date(1407, 12, 29))).toEqual(365)
    expect(iranian.daysInYear(iranian.date(1408, 12, 30))).toEqual(366)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(iranian.daysInYear(1403)).toEqual(366)
    expect(iranian.daysInYear(1404)).toEqual(365)
    expect(iranian.daysInYear(1405)).toEqual(365)
    expect(iranian.daysInYear(1406)).toEqual(365)
    expect(iranian.daysInYear(1407)).toEqual(365)
    expect(iranian.daysInYear(1408)).toEqual(366)
  })

  it('should return the day of the year for a date', () => {
    expect(iranian.dayOfYear(iranian.date(1403, 1, 2))).toEqual(2)
    expect(iranian.dayOfYear(iranian.date(1403, 7, 5))).toEqual(191)
    expect(iranian.dayOfYear(iranian.date(1403, 12, 30))).toEqual(366)
    expect(iranian.dayOfYear(iranian.date(1404, 12, 29))).toEqual(365)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(iranian.dayOfYear(1403, 1, 2)).toEqual(2)
    expect(iranian.dayOfYear(1403, 7, 5)).toEqual(191)
    expect(iranian.dayOfYear(1403, 12, 30)).toEqual(366)
    expect(iranian.dayOfYear(1404, 12, 29)).toEqual(365)
  })

  it('should return the days in the month for a date', () => {
    expect(iranian.daysInMonth(iranian.date(1403, 1, 2))).toEqual(31)
    expect(iranian.daysInMonth(iranian.date(1403, 2, 5))).toEqual(31)
    expect(iranian.daysInMonth(iranian.date(1403, 9, 4))).toEqual(30)
    expect(iranian.daysInMonth(iranian.date(1403, 12, 30))).toEqual(30)
    expect(iranian.daysInMonth(iranian.date(1404, 1, 2))).toEqual(31)
    expect(iranian.daysInMonth(iranian.date(1404, 2, 5))).toEqual(31)
    expect(iranian.daysInMonth(iranian.date(1404, 9, 4))).toEqual(30)
    expect(iranian.daysInMonth(iranian.date(1404, 12, 29))).toEqual(29)
  })

  it('should return the days in the month given a year and month', () => {
    expect(iranian.daysInMonth(1403, 1)).toEqual(31)
    expect(iranian.daysInMonth(1403, 2)).toEqual(31)
    expect(iranian.daysInMonth(1403, 9)).toEqual(30)
    expect(iranian.daysInMonth(1403, 12)).toEqual(30)
    expect(iranian.daysInMonth(1404, 1)).toEqual(31)
    expect(iranian.daysInMonth(1404, 2)).toEqual(31)
    expect(iranian.daysInMonth(1404, 9)).toEqual(30)
    expect(iranian.daysInMonth(1404, 12)).toEqual(29)
  })

  it('should return the number of days in a standard week', () => {
    expect(iranian.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(iranian.dayOfWeek(iranian.date(1403, 10, 14))).toEqual(5)
    expect(iranian.dayOfWeek(iranian.date(1404, 10, 11))).toEqual(4)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(iranian.dayOfWeek(1403, 10, 14)).toEqual(5)
    expect(iranian.dayOfWeek(1404, 10, 11)).toEqual(4)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(iranian.weekDay(iranian.date(1403, 10, 14))).toEqual(false)
    expect(iranian.weekDay(iranian.date(1404, 10, 11))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(iranian.weekDay(1403, 10, 14)).toEqual(false)
    expect(iranian.weekDay(1404, 10, 11)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(iranian.extraInfo(iranian.date(1403, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(iranian.extraInfo(1403, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = iranian.date(1403, 1, 2)
    d = iranian.add(d, 1, 'y')
    checkDate(d, 1404, 1, 2)
    d = iranian.add(d, 2, 'm')
    checkDate(d, 1404, 3, 2)
    d = iranian.add(d, 3, 'd')
    checkDate(d, 1404, 3, 5)
    d = iranian.add(d, -1, 'y')
    d = iranian.add(d, -2, 'm')
    d = iranian.add(d, -3, 'd')
    checkDate(d, 1403, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = iranian.date(1403, 1, 2)
    d = iranian.sub(d, 1, 'y')
    checkDate(d, 1402, 1, 2)
    d = iranian.sub(d, 2, 'm')
    checkDate(d, 1401, 11, 2)
    d = iranian.sub(d, 3, 'd')
    checkDate(d, 1401, 10, 29)
    d = iranian.sub(d, -1, 'y') // 1402/10/29
    d = iranian.sub(d, -2, 'm') // 1402/12/29
    d = iranian.sub(d, -3, 'd')
    checkDate(d, 1403, 1, 3)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = iranian.date(-1, 12, 29)
    d = iranian.add(d, 1, 'y')
    checkDate(d, 1, 12, 29)
    d = iranian.sub(d, 1, 'y')
    checkDate(d, -1, 12, 29)
    d = iranian.add(d, 2, 'm')
    checkDate(d, 1, 2, 29)
    d = iranian.sub(d, 2, 'm')
    checkDate(d, -1, 12, 29)
    d = iranian.add(d, 5, 'd')
    checkDate(d, 1, 1, 4)
    d = iranian.sub(d, 5, 'd')
    checkDate(d, -1, 12, 29)
  })

  it('should convert a date to a Julian day number', () => {
    expect(iranian.date(1403, 10, 14).toJD()).toEqual(2460678.5)
    expect(iranian.date(1404, 10, 11).toJD()).toEqual(2461041.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(iranian.toJD(1403, 10, 14)).toEqual(2460678.5)
    expect(iranian.toJD(1404, 10, 11)).toEqual(2461041.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(iranian.fromJD(2460678.5), 1403, 10, 14)
    checkDate(iranian.fromJD(2461041.5), 1404, 10, 11)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(iranian.date(1403, 10, 14).toJSDate()).toEqual(new Date(2025, 1 - 1, 3))
    expect(iranian.date(1404, 10, 11).toJSDate()).toEqual(new Date(2026, 1 - 1, 1))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(iranian.toJSDate(1403, 10, 14)).toEqual(new Date(2025, 1 - 1, 3))
    expect(iranian.toJSDate(1404, 10, 11)).toEqual(new Date(2026, 1 - 1, 1))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(iranian.fromJSDate(new Date(2025, 1 - 1, 3)), 1403, 10, 14)
    checkDate(iranian.fromJSDate(new Date(2026, 1 - 1, 1)), 1404, 10, 11)
  })
})
