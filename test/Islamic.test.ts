import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { IslamicCalendar } from '../src/Islamic'

describe('Islamic calendar', () => {
  const islamic = Calendars.instance('islamic')
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

  it('should create a Islamic calendar', () => {
    expect(islamic).toBeInstanceOf(IslamicCalendar)
  })

  it('should create a new date', () => {
    const date1 = islamic.date(1425, 7, 25)
    const date2 = islamic.date(date1)
    const date3 = islamic.date()

    checkDate(date1, 1425, 7, 25, islamic)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1443, 5, 28, islamic)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { islamic.date(1425, 17, 55) }).toThrow(new CalendarError('Invalid Islamic date'))
    expect(() => { islamic.date(1425, 12, 30) }).toThrow(new CalendarError('Invalid Islamic date'))
    expect(() => { islamic.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Islamic date'))
  })

  it('should indicate leap years for a date', () => {
    expect(islamic.date(1425, 7, 1).leapYear()).toEqual(false)
    expect(islamic.date(1426, 7, 1).leapYear()).toEqual(true)
    expect(islamic.date(1427, 7, 1).leapYear()).toEqual(false)
    expect(islamic.date(1428, 7, 1).leapYear()).toEqual(true)
    expect(islamic.date(1429, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(islamic.leapYear(1425)).toEqual(false)
    expect(islamic.leapYear(1426)).toEqual(true)
    expect(islamic.leapYear(1427)).toEqual(false)
    expect(islamic.leapYear(1428)).toEqual(true)
    expect(islamic.leapYear(1429)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(islamic.epoch(islamic.date(1425, 1, 2))).toEqual('AH')
    expect(islamic.epoch(islamic.date(33, 1, 2))).toEqual('AH')
    expect(islamic.epoch(islamic.date(-505, 1, 2))).toEqual('BH')
  })

  it('should return the epoch given a year', () => {
    expect(islamic.epoch(1425)).toEqual('AH')
    expect(islamic.epoch(33)).toEqual('AH')
    expect(islamic.epoch(-505)).toEqual('BH')
  })

  it('should format the year for a date', () => {
    expect(islamic.formatYear(islamic.date(1425, 1, 2))).toEqual('1425')
    expect(islamic.formatYear(islamic.date(33, 1, 2))).toEqual('0033')
    expect(islamic.formatYear(islamic.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(islamic.formatYear(1425)).toEqual('1425')
    expect(islamic.formatYear(33)).toEqual('0033')
    expect(islamic.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(islamic.monthsInYear(islamic.date(1425, 1, 2))).toEqual(12)
    expect(islamic.monthsInYear(islamic.date(33, 1, 2))).toEqual(12)
    expect(islamic.monthsInYear(islamic.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(islamic.monthsInYear(1425)).toEqual(12)
    expect(islamic.monthsInYear(33)).toEqual(12)
    expect(islamic.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(islamic.monthOfYear(islamic.date(1425, 1, 2))).toEqual(1)
    expect(islamic.monthOfYear(islamic.date(1425, 7, 5))).toEqual(7)
    expect(islamic.monthOfYear(islamic.date(1425, 12, 29))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(islamic.monthOfYear(1425, 1)).toEqual(1)
    expect(islamic.monthOfYear(1425, 7)).toEqual(7)
    expect(islamic.monthOfYear(1425, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(islamic.fromMonthOfYear(1425, 1)).toEqual(1)
    expect(islamic.fromMonthOfYear(1425, 7)).toEqual(7)
    expect(islamic.fromMonthOfYear(1425, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(islamic.weekOfYear(islamic.date(1425, 1, 2))).toEqual(1)
    expect(islamic.weekOfYear(islamic.date(1425, 7, 5))).toEqual(26)
    expect(islamic.weekOfYear(islamic.date(1425, 12, 29))).toEqual(51)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(islamic.weekOfYear(1425, 1, 2)).toEqual(1)
    expect(islamic.weekOfYear(1425, 7, 5)).toEqual(26)
    expect(islamic.weekOfYear(1425, 12, 29)).toEqual(51)
  })

  it('should return the days in the year for a date', () => {
    expect(islamic.daysInYear(islamic.date(1425, 1, 2))).toEqual(354)
    expect(islamic.daysInYear(islamic.date(1426, 4, 5))).toEqual(355)
    expect(islamic.daysInYear(islamic.date(1427, 7, 13))).toEqual(354)
    expect(islamic.daysInYear(islamic.date(1428, 10, 21))).toEqual(355)
    expect(islamic.daysInYear(islamic.date(1429, 12, 29))).toEqual(354)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(islamic.daysInYear(1425)).toEqual(354)
    expect(islamic.daysInYear(1426)).toEqual(355)
    expect(islamic.daysInYear(1427)).toEqual(354)
    expect(islamic.daysInYear(1428)).toEqual(355)
    expect(islamic.daysInYear(1429)).toEqual(354)
  })

  it('should return the day of the year for a date', () => {
    expect(islamic.dayOfYear(islamic.date(1426, 10, 19))).toEqual(285)
    expect(islamic.dayOfYear(islamic.date(1426, 12, 30))).toEqual(355)
    expect(islamic.dayOfYear(islamic.date(1430, 1, 5))).toEqual(5)
    expect(islamic.dayOfYear(islamic.date(1430, 12, 29))).toEqual(354)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(islamic.dayOfYear(1426, 10, 19)).toEqual(285)
    expect(islamic.dayOfYear(1426, 12, 30)).toEqual(355)
    expect(islamic.dayOfYear(1430, 1, 5)).toEqual(5)
    expect(islamic.dayOfYear(1430, 12, 29)).toEqual(354)
  })

  it('should return the days in the month for a date', () => {
    expect(islamic.daysInMonth(islamic.date(1425, 1, 2))).toEqual(30)
    expect(islamic.daysInMonth(islamic.date(1425, 2, 5))).toEqual(29)
    expect(islamic.daysInMonth(islamic.date(1425, 4, 19))).toEqual(29)
    expect(islamic.daysInMonth(islamic.date(1425, 12, 29))).toEqual(29)
    expect(islamic.daysInMonth(islamic.date(1426, 1, 2))).toEqual(30)
    expect(islamic.daysInMonth(islamic.date(1426, 2, 5))).toEqual(29)
    expect(islamic.daysInMonth(islamic.date(1426, 4, 19))).toEqual(29)
    expect(islamic.daysInMonth(islamic.date(1426, 12, 30))).toEqual(30)
  })

  it('should return the days in the month given a year and month', () => {
    expect(islamic.daysInMonth(1425, 1)).toEqual(30)
    expect(islamic.daysInMonth(1425, 2)).toEqual(29)
    expect(islamic.daysInMonth(1425, 4)).toEqual(29)
    expect(islamic.daysInMonth(1425, 12)).toEqual(29)
    expect(islamic.daysInMonth(1426, 1)).toEqual(30)
    expect(islamic.daysInMonth(1426, 2)).toEqual(29)
    expect(islamic.daysInMonth(1426, 4)).toEqual(29)
    expect(islamic.daysInMonth(1426, 12)).toEqual(30)
  })

  it('should return the number of days in a standard week', () => {
    expect(islamic.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(islamic.dayOfWeek(islamic.date(1426, 10, 19))).toEqual(1)
    expect(islamic.dayOfWeek(islamic.date(1430, 1, 5))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(islamic.dayOfWeek(1426, 10, 19)).toEqual(1)
    expect(islamic.dayOfWeek(1430, 1, 5)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(islamic.weekDay(islamic.date(1426, 10, 19))).toEqual(true)
    expect(islamic.weekDay(islamic.date(1430, 1, 5))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(islamic.weekDay(1426, 10, 19)).toEqual(true)
    expect(islamic.weekDay(1430, 1, 5)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(islamic.extraInfo(islamic.date(1425, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(islamic.extraInfo(1425, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = islamic.date(1425, 1, 2)
    d = islamic.add(d, 1, 'y')
    checkDate(d, 1426, 1, 2)
    d = islamic.add(d, 2, 'm')
    checkDate(d, 1426, 3, 2)
    d = islamic.add(d, 3, 'd')
    checkDate(d, 1426, 3, 5)
    d = islamic.add(d, -1, 'y')
    d = islamic.add(d, -2, 'm')
    d = islamic.add(d, -3, 'd')
    checkDate(d, 1425, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = islamic.date(1425, 1, 2)
    d = islamic.sub(d, 1, 'y')
    checkDate(d, 1424, 1, 2)
    d = islamic.sub(d, 2, 'm')
    checkDate(d, 1423, 11, 2)
    d = islamic.sub(d, 3, 'd')
    checkDate(d, 1423, 10, 28)
    d = islamic.sub(d, -1, 'y') // 1424/10/28
    d = islamic.sub(d, -2, 'm') // 1424/12/28
    d = islamic.sub(d, -3, 'd')
    checkDate(d, 1425, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = islamic.date(-1, 12, 29)
    d = islamic.add(d, 1, 'y')
    checkDate(d, 1, 12, 29)
    d = islamic.sub(d, 1, 'y')
    checkDate(d, -1, 12, 29)
    d = islamic.add(d, 2, 'm')
    checkDate(d, 1, 2, 29)
    d = islamic.sub(d, 2, 'm')
    checkDate(d, -1, 12, 29)
    d = islamic.add(d, 5, 'd')
    checkDate(d, 1, 1, 5)
    d = islamic.sub(d, 5, 'd')
    checkDate(d, -1, 12, 29)
  })

  it('should convert a date to a Julian day number', () => {
    expect(islamic.date(1426, 10, 19).toJD()).toEqual(2453695.5)
    expect(islamic.date(1430, 1, 5).toJD()).toEqual(2454833.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(islamic.toJD(1426, 10, 19)).toEqual(2453695.5)
    expect(islamic.toJD(1430, 1, 5)).toEqual(2454833.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(islamic.fromJD(2453695.5), 1426, 10, 19)
    checkDate(islamic.fromJD(2454833.5), 1430, 1, 5)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(islamic.date(1426, 10, 19).toJSDate()).toEqual(new Date(2005, 11 - 1, 21))
    expect(islamic.date(1430, 1, 5).toJSDate()).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(islamic.toJSDate(1426, 10, 19)).toEqual(new Date(2005, 11 - 1, 21))
    expect(islamic.toJSDate(1430, 1, 5)).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(islamic.fromJSDate(new Date(2005, 11 - 1, 21)), 1426, 10, 19)
    checkDate(islamic.fromJSDate(new Date(2009, 1 - 1, 2)), 1430, 1, 5)
  })
})
