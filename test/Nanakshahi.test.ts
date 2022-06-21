import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { NanakshahiCalendar } from '../src/Nanakshahi'

describe('Nanakshahi calendar', () => {
  const nanakshahi = Calendars.instance('nanakshahi')
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

  it('should create a Nanakshahi calendar', () => {
    expect(nanakshahi).toBeInstanceOf(NanakshahiCalendar)
  })

  it('should create a new date', () => {
    const date1 = nanakshahi.date(546, 7, 25)
    const date2 = nanakshahi.date(date1)
    const date3 = nanakshahi.date()

    checkDate(date1, 546, 7, 25, nanakshahi)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 553, 10, 20, nanakshahi)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { nanakshahi.date(546, 17, 55) }).toThrow(new CalendarError('Invalid Nanakshahi date'))
    expect(() => { nanakshahi.date(546, 12, 31) }).toThrow(new CalendarError('Invalid Nanakshahi date'))
    expect(() => { nanakshahi.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Nanakshahi date'))
  })

  it('should indicate leap years for a date', () => {
    expect(nanakshahi.date(546, 7, 1).leapYear()).toEqual(false)
    expect(nanakshahi.date(547, 7, 1).leapYear()).toEqual(true)
    expect(nanakshahi.date(548, 7, 1).leapYear()).toEqual(false)
    expect(nanakshahi.date(549, 7, 1).leapYear()).toEqual(false)
    expect(nanakshahi.date(550, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(nanakshahi.leapYear(546)).toEqual(false)
    expect(nanakshahi.leapYear(547)).toEqual(true)
    expect(nanakshahi.leapYear(548)).toEqual(false)
    expect(nanakshahi.leapYear(549)).toEqual(false)
    expect(nanakshahi.leapYear(550)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(nanakshahi.epoch(nanakshahi.date(546, 1, 2))).toEqual('AN')
    expect(nanakshahi.epoch(nanakshahi.date(33, 1, 2))).toEqual('AN')
    expect(nanakshahi.epoch(nanakshahi.date(-505, 1, 2))).toEqual('BN')
  })

  it('should return the epoch given a year', () => {
    expect(nanakshahi.epoch(546)).toEqual('AN')
    expect(nanakshahi.epoch(33)).toEqual('AN')
    expect(nanakshahi.epoch(-505)).toEqual('BN')
  })

  it('should format the year for a date', () => {
    expect(nanakshahi.formatYear(nanakshahi.date(546, 1, 2))).toEqual('0546')
    expect(nanakshahi.formatYear(nanakshahi.date(33, 1, 2))).toEqual('0033')
    expect(nanakshahi.formatYear(nanakshahi.date(-505, 1, 2))).toEqual('0505')
  })

  it('should format the year given a year', () => {
    expect(nanakshahi.formatYear(546)).toEqual('0546')
    expect(nanakshahi.formatYear(33)).toEqual('0033')
    expect(nanakshahi.formatYear(-505)).toEqual('0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(nanakshahi.monthsInYear(nanakshahi.date(546, 1, 2))).toEqual(12)
    expect(nanakshahi.monthsInYear(nanakshahi.date(33, 1, 2))).toEqual(12)
    expect(nanakshahi.monthsInYear(nanakshahi.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(nanakshahi.monthsInYear(546)).toEqual(12)
    expect(nanakshahi.monthsInYear(33)).toEqual(12)
    expect(nanakshahi.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(nanakshahi.monthOfYear(nanakshahi.date(546, 1, 2))).toEqual(1)
    expect(nanakshahi.monthOfYear(nanakshahi.date(546, 7, 5))).toEqual(7)
    expect(nanakshahi.monthOfYear(nanakshahi.date(546, 12, 30))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(nanakshahi.monthOfYear(546, 1)).toEqual(1)
    expect(nanakshahi.monthOfYear(546, 7)).toEqual(7)
    expect(nanakshahi.monthOfYear(546, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(nanakshahi.fromMonthOfYear(546, 1)).toEqual(1)
    expect(nanakshahi.fromMonthOfYear(546, 7)).toEqual(7)
    expect(nanakshahi.fromMonthOfYear(546, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(nanakshahi.weekOfYear(nanakshahi.date(546, 1, 2))).toEqual(52)
    expect(nanakshahi.weekOfYear(nanakshahi.date(546, 7, 5))).toEqual(27)
    expect(nanakshahi.weekOfYear(nanakshahi.date(546, 12, 30))).toEqual(52)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(nanakshahi.weekOfYear(546, 1, 2)).toEqual(52)
    expect(nanakshahi.weekOfYear(546, 7, 5)).toEqual(27)
    expect(nanakshahi.weekOfYear(546, 12, 30)).toEqual(52)
  })

  it('should return the days in the year for a date', () => {
    expect(nanakshahi.daysInYear(nanakshahi.date(546, 1, 2))).toEqual(365)
    expect(nanakshahi.daysInYear(nanakshahi.date(547, 7, 5))).toEqual(366)
    expect(nanakshahi.daysInYear(nanakshahi.date(548, 12, 30))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(nanakshahi.daysInYear(546)).toEqual(365)
    expect(nanakshahi.daysInYear(547)).toEqual(366)
    expect(nanakshahi.daysInYear(548)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(nanakshahi.dayOfYear(nanakshahi.date(546, 1, 2))).toEqual(2)
    expect(nanakshahi.dayOfYear(nanakshahi.date(546, 7, 5))).toEqual(190)
    expect(nanakshahi.dayOfYear(nanakshahi.date(546, 12, 30))).toEqual(365)
    expect(nanakshahi.dayOfYear(nanakshahi.date(547, 12, 31))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(nanakshahi.dayOfYear(546, 1, 2)).toEqual(2)
    expect(nanakshahi.dayOfYear(546, 7, 5)).toEqual(190)
    expect(nanakshahi.dayOfYear(546, 12, 30)).toEqual(365)
    expect(nanakshahi.dayOfYear(547, 12, 31)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(nanakshahi.daysInMonth(nanakshahi.date(546, 1, 2))).toEqual(31)
    expect(nanakshahi.daysInMonth(nanakshahi.date(546, 2, 5))).toEqual(31)
    expect(nanakshahi.daysInMonth(nanakshahi.date(546, 6, 9))).toEqual(30)
    expect(nanakshahi.daysInMonth(nanakshahi.date(546, 12, 30))).toEqual(30)
    expect(nanakshahi.daysInMonth(nanakshahi.date(547, 1, 2))).toEqual(31)
    expect(nanakshahi.daysInMonth(nanakshahi.date(547, 2, 5))).toEqual(31)
    expect(nanakshahi.daysInMonth(nanakshahi.date(547, 6, 9))).toEqual(30)
    expect(nanakshahi.daysInMonth(nanakshahi.date(547, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(nanakshahi.daysInMonth(546, 1)).toEqual(31)
    expect(nanakshahi.daysInMonth(546, 2)).toEqual(31)
    expect(nanakshahi.daysInMonth(546, 6)).toEqual(30)
    expect(nanakshahi.daysInMonth(546, 12)).toEqual(30)
    expect(nanakshahi.daysInMonth(547, 1)).toEqual(31)
    expect(nanakshahi.daysInMonth(547, 2)).toEqual(31)
    expect(nanakshahi.daysInMonth(547, 6)).toEqual(30)
    expect(nanakshahi.daysInMonth(547, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(nanakshahi.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(nanakshahi.dayOfWeek(nanakshahi.date(545, 1, 5))).toEqual(1)
    expect(nanakshahi.dayOfWeek(nanakshahi.date(547, 10, 20))).toEqual(6)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(nanakshahi.dayOfWeek(545, 1, 5)).toEqual(1)
    expect(nanakshahi.dayOfWeek(547, 10, 20)).toEqual(6)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(nanakshahi.weekDay(nanakshahi.date(545, 1, 5))).toEqual(true)
    expect(nanakshahi.weekDay(nanakshahi.date(547, 10, 20))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(nanakshahi.weekDay(545, 1, 5)).toEqual(true)
    expect(nanakshahi.weekDay(547, 10, 20)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(nanakshahi.extraInfo(nanakshahi.date(546, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(nanakshahi.extraInfo(546, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = nanakshahi.date(546, 1, 2)
    d = nanakshahi.add(d, 1, 'y')
    checkDate(d, 547, 1, 2)
    d = nanakshahi.add(d, 2, 'm')
    checkDate(d, 547, 3, 2)
    d = nanakshahi.add(d, 3, 'd')
    checkDate(d, 547, 3, 5)
    d = nanakshahi.add(d, -1, 'y')
    d = nanakshahi.add(d, -2, 'm')
    d = nanakshahi.add(d, -3, 'd')
    checkDate(d, 546, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = nanakshahi.date(546, 1, 2)
    d = nanakshahi.sub(d, 1, 'y')
    checkDate(d, 545, 1, 2)
    d = nanakshahi.sub(d, 2, 'm')
    checkDate(d, 544, 11, 2)
    d = nanakshahi.sub(d, 3, 'd')
    checkDate(d, 544, 10, 29)
    d = nanakshahi.sub(d, -1, 'y') // 0545/10/29
    d = nanakshahi.sub(d, -2, 'm') // 0545/12/29
    d = nanakshahi.sub(d, -3, 'd')
    checkDate(d, 546, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = nanakshahi.date(-1, 12, 30)
    d = nanakshahi.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = nanakshahi.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = nanakshahi.add(d, 2, 'm')
    checkDate(d, 1, 2, 30)
    d = nanakshahi.sub(d, 2, 'm')
    checkDate(d, -1, 12, 30)
    d = nanakshahi.add(d, 3, 'd')
    checkDate(d, 1, 1, 3)
    d = nanakshahi.sub(d, 3, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(nanakshahi.date(545, 1, 5).toJD()).toEqual(2456369.5)
    expect(nanakshahi.date(547, 10, 20).toJD()).toEqual(2457389.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(nanakshahi.toJD(545, 1, 5)).toEqual(2456369.5)
    expect(nanakshahi.toJD(547, 10, 20)).toEqual(2457389.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(nanakshahi.fromJD(2456369.5), 545, 1, 5)
    checkDate(nanakshahi.fromJD(2457389.5), 547, 10, 20)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(nanakshahi.date(545, 1, 5).toJSDate()).toEqual(new Date(2013, 3 - 1, 18))
    expect(nanakshahi.date(547, 10, 20).toJSDate()).toEqual(new Date(2016, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(nanakshahi.toJSDate(545, 1, 5)).toEqual(new Date(2013, 3 - 1, 18))
    expect(nanakshahi.toJSDate(547, 10, 20)).toEqual(new Date(2016, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(nanakshahi.fromJSDate(new Date(2013, 3 - 1, 18)), 545, 1, 5)
    checkDate(nanakshahi.fromJSDate(new Date(2016, 1 - 1, 2)), 547, 10, 20)
  })
})
