import Calendars, { BaseCalendar, CalendarError, CDate } from '../src/Calendars'
import { HebrewCalendar } from '../src/Hebrew'

describe('Hebrew calendar', () => {
  const hebrew = Calendars.instance('hebrew')
  const now = new Date(2022, 1 - 1, 2, 3, 4, 5, 0).getTime()
  let dateNow: jest.SpyInstance<number, []>

  const checkDate = (date: CDate, year: number, month: number, day: number, cal?: BaseCalendar) => {
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

  it('should create a Hebrew calendar', () => {
    expect(hebrew).toBeInstanceOf(HebrewCalendar)
  })

  it('should create a new date', () => {
    const date1 = hebrew.date(5769, 7, 25)
    const date2 = hebrew.date(date1)
    const date3 = hebrew.date()

    checkDate(date1, 5769, 7, 25, hebrew)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 5782, 10, 29, hebrew)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { hebrew.date(5769, 17, 55) }).toThrow(new CalendarError('Invalid Hebrew date'))
    expect(() => { hebrew.date(5769, 1, 31) }).toThrow(new CalendarError('Invalid Hebrew date'))
    expect(() => { hebrew.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Hebrew date'))
  })

  it('should indicate leap years for a date', () => {
    expect(hebrew.date(5769, 7, 1).leapYear()).toEqual(false)
    expect(hebrew.date(5770, 7, 1).leapYear()).toEqual(false)
    expect(hebrew.date(5771, 7, 1).leapYear()).toEqual(true)
    expect(hebrew.date(5772, 7, 1).leapYear()).toEqual(false)
    expect(hebrew.date(5773, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(hebrew.leapYear(5769)).toEqual(false)
    expect(hebrew.leapYear(5770)).toEqual(false)
    expect(hebrew.leapYear(5771)).toEqual(true)
    expect(hebrew.leapYear(5772)).toEqual(false)
    expect(hebrew.leapYear(5773)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(hebrew.epoch(hebrew.date(5769, 1, 2))).toEqual('AM')
    expect(hebrew.epoch(hebrew.date(33, 1, 2))).toEqual('AM')
    expect(hebrew.epoch(hebrew.date(-505, 1, 2))).toEqual('BAM')
  })

  it('should return the epoch given a year', () => {
    expect(hebrew.epoch(5769)).toEqual('AM')
    expect(hebrew.epoch(33)).toEqual('AM')
    expect(hebrew.epoch(-505)).toEqual('BAM')
  })

  it('should format the year for a date', () => {
    expect(hebrew.formatYear(hebrew.date(5769, 1, 2))).toEqual('5769')
    expect(hebrew.formatYear(hebrew.date(33, 1, 2))).toEqual('0033')
    expect(hebrew.formatYear(hebrew.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(hebrew.formatYear(5769)).toEqual('5769')
    expect(hebrew.formatYear(33)).toEqual('0033')
    expect(hebrew.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(hebrew.monthsInYear(hebrew.date(5769, 1, 2))).toEqual(12)
    expect(hebrew.monthsInYear(hebrew.date(5770, 1, 2))).toEqual(12)
    expect(hebrew.monthsInYear(hebrew.date(5771, 1, 2))).toEqual(13)
    expect(hebrew.monthsInYear(hebrew.date(5772, 1, 2))).toEqual(12)
    expect(hebrew.monthsInYear(hebrew.date(5773, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(hebrew.monthsInYear(5769)).toEqual(12)
    expect(hebrew.monthsInYear(5770)).toEqual(12)
    expect(hebrew.monthsInYear(5771)).toEqual(13)
    expect(hebrew.monthsInYear(5772)).toEqual(12)
    expect(hebrew.monthsInYear(5773)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(hebrew.monthOfYear(hebrew.date(5769, 1, 2))).toEqual(7)
    expect(hebrew.monthOfYear(hebrew.date(5769, 7, 5))).toEqual(1)
    expect(hebrew.monthOfYear(hebrew.date(5769, 12, 29))).toEqual(6)
  })

  it('should return the month of the year given a year and month', () => {
    expect(hebrew.monthOfYear(5769, 1)).toEqual(7)
    expect(hebrew.monthOfYear(5769, 7)).toEqual(1)
    expect(hebrew.monthOfYear(5769, 12)).toEqual(6)
  })

  it('should return the month from the month of the year', () => {
    expect(hebrew.fromMonthOfYear(5769, 1)).toEqual(7)
    expect(hebrew.fromMonthOfYear(5769, 7)).toEqual(1)
    expect(hebrew.fromMonthOfYear(5769, 12)).toEqual(6)
    expect(hebrew.fromMonthOfYear(5771, 1)).toEqual(7)
    expect(hebrew.fromMonthOfYear(5771, 7)).toEqual(13)
    expect(hebrew.fromMonthOfYear(5771, 12)).toEqual(5)
  })

  it('should return the week of the year for a date', () => {
    expect(hebrew.weekOfYear(hebrew.date(5769, 1, 2))).toEqual(25)
    expect(hebrew.weekOfYear(hebrew.date(5769, 7, 5))).toEqual(55)
    expect(hebrew.weekOfYear(hebrew.date(5769, 12, 29))).toEqual(25)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(hebrew.weekOfYear(5769, 1, 2)).toEqual(25)
    expect(hebrew.weekOfYear(5769, 7, 5)).toEqual(55)
    expect(hebrew.weekOfYear(5769, 12, 29)).toEqual(25)
  })

  it('should return the days in the year for a date', () => {
    expect(hebrew.daysInYear(hebrew.date(5769, 1, 2))).toEqual(354)
    expect(hebrew.daysInYear(hebrew.date(5770, 4, 5))).toEqual(355)
    expect(hebrew.daysInYear(hebrew.date(5771, 7, 15))).toEqual(385)
    expect(hebrew.daysInYear(hebrew.date(5772, 10, 23))).toEqual(354)
    expect(hebrew.daysInYear(hebrew.date(5773, 12, 29))).toEqual(353)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(hebrew.daysInYear(5769)).toEqual(354)
    expect(hebrew.daysInYear(5770)).toEqual(355)
    expect(hebrew.daysInYear(5771)).toEqual(385)
    expect(hebrew.daysInYear(5772)).toEqual(354)
    expect(hebrew.daysInYear(5773)).toEqual(353)
  })

  it('should return the day of the year for a date', () => {
    expect(hebrew.dayOfYear(hebrew.date(5769, 1, 2))).toEqual(179)
    expect(hebrew.dayOfYear(hebrew.date(5769, 7, 5))).toEqual(5)
    expect(hebrew.dayOfYear(hebrew.date(5769, 12, 29))).toEqual(177)
    expect(hebrew.dayOfYear(hebrew.date(5771, 1, 2))).toEqual(210)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(hebrew.dayOfYear(5769, 1, 2)).toEqual(179)
    expect(hebrew.dayOfYear(5769, 7, 5)).toEqual(5)
    expect(hebrew.dayOfYear(5769, 12, 29)).toEqual(177)
    expect(hebrew.dayOfYear(5771, 1, 2)).toEqual(210)
  })

  it('should return the days in the month for a date', () => {
    expect(hebrew.daysInMonth(hebrew.date(5770, 1, 2))).toEqual(30)
    expect(hebrew.daysInMonth(hebrew.date(5773, 1, 2))).toEqual(30)
    expect(hebrew.daysInMonth(hebrew.date(5770, 8, 9))).toEqual(30)
    expect(hebrew.daysInMonth(hebrew.date(5773, 8, 9))).toEqual(29)
    expect(hebrew.daysInMonth(hebrew.date(5770, 9, 15))).toEqual(30)
    expect(hebrew.daysInMonth(hebrew.date(5773, 9, 15))).toEqual(29)
    expect(hebrew.daysInMonth(hebrew.date(5771, 12, 19))).toEqual(30)
    expect(hebrew.daysInMonth(hebrew.date(5771, 13, 20))).toEqual(29)
  })

  it('should return the days in the month given a year and month', () => {
    expect(hebrew.daysInMonth(5770, 1)).toEqual(30)
    expect(hebrew.daysInMonth(5773, 1)).toEqual(30)
    expect(hebrew.daysInMonth(5770, 8)).toEqual(30)
    expect(hebrew.daysInMonth(5773, 8)).toEqual(29)
    expect(hebrew.daysInMonth(5770, 9)).toEqual(30)
    expect(hebrew.daysInMonth(5773, 9)).toEqual(29)
    expect(hebrew.daysInMonth(5771, 12)).toEqual(30)
    expect(hebrew.daysInMonth(5771, 13)).toEqual(29)
  })

  it('should return the number of days in a standard week', () => {
    expect(hebrew.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(hebrew.dayOfWeek(hebrew.date(5769, 1, 3))).toEqual(6)
    expect(hebrew.dayOfWeek(hebrew.date(5771, 8, 5))).toEqual(3)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(hebrew.dayOfWeek(5769, 1, 3)).toEqual(6)
    expect(hebrew.dayOfWeek(5771, 8, 5)).toEqual(3)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(hebrew.weekDay(hebrew.date(5769, 1, 3))).toEqual(false)
    expect(hebrew.weekDay(hebrew.date(5771, 8, 5))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(hebrew.weekDay(5769, 1, 3)).toEqual(false)
    expect(hebrew.weekDay(5771, 8, 5)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(hebrew.extraInfo(hebrew.date(5769, 1, 3))).toEqual({ yearType: 'common regular' })
    expect(hebrew.extraInfo(hebrew.date(5771, 8, 5))).toEqual({ yearType: 'embolismic complete' })
    expect(hebrew.extraInfo(hebrew.date(5773, 12, 25))).toEqual({ yearType: 'common deficient' })
  })

  it('should return extra information given a year, month and day', () => {
    expect(hebrew.extraInfo(5769, 1, 3)).toEqual({ yearType: 'common regular' })
    expect(hebrew.extraInfo(5771, 8, 5)).toEqual({ yearType: 'embolismic complete' })
    expect(hebrew.extraInfo(5773, 12, 25)).toEqual({ yearType: 'common deficient' })
  })

  it('should add to a date', () => {
    let d = hebrew.date(5769, 1, 2)
    d = hebrew.add(d, 1, 'y')
    checkDate(d, 5770, 1, 2)
    d = hebrew.add(d, 2, 'm')
    checkDate(d, 5770, 3, 2)
    d = hebrew.add(d, 3, 'd')
    checkDate(d, 5770, 3, 5)
    d = hebrew.add(d, -1, 'y')
    d = hebrew.add(d, -2, 'm')
    d = hebrew.add(d, -3, 'd')
    checkDate(d, 5769, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = hebrew.date(5769, 1, 2)
    d = hebrew.sub(d, 1, 'y')
    checkDate(d, 5768, 1, 2)
    d = hebrew.sub(d, 2, 'm')
    checkDate(d, 5768, 12, 2)
    d = hebrew.sub(d, 3, 'd')
    checkDate(d, 5768, 11, 29)
    d = hebrew.sub(d, -1, 'y') // 5769/11/29
    d = hebrew.sub(d, -2, 'm') // 5769/01/29
    d = hebrew.sub(d, -3, 'd')
    checkDate(d, 5769, 2, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = hebrew.date(-1, 6, 29)
    d = hebrew.add(d, 1, 'y')
    checkDate(d, 1, 6, 29)
    d = hebrew.sub(d, 1, 'y')
    checkDate(d, -1, 6, 29)
    d = hebrew.add(d, 2, 'm')
    checkDate(d, 1, 8, 29)
    d = hebrew.sub(d, 2, 'm')
    checkDate(d, -1, 6, 29)
    d = hebrew.add(d, 5, 'd')
    checkDate(d, 1, 7, 5)
    d = hebrew.sub(d, 5, 'd')
    checkDate(d, -1, 6, 29)
  })

  it('should convert a date to a Julian day number', () => {
    expect(hebrew.date(5769, 1, 3).toJD()).toEqual(2454918.5)
    expect(hebrew.date(5771, 8, 5).toJD()).toEqual(2455482.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(hebrew.toJD(5769, 1, 3)).toEqual(2454918.5)
    expect(hebrew.toJD(5771, 8, 5)).toEqual(2455482.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(hebrew.fromJD(2454918.5), 5769, 1, 3)
    checkDate(hebrew.fromJD(2455482.5), 5771, 8, 5)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(hebrew.date(5769, 1, 3).toJSDate()).toEqual(new Date(2009, 3 - 1, 28))
    expect(hebrew.date(5771, 8, 5).toJSDate()).toEqual(new Date(2010, 10 - 1, 13))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(hebrew.toJSDate(5769, 1, 3)).toEqual(new Date(2009, 3 - 1, 28))
    expect(hebrew.toJSDate(5771, 8, 5)).toEqual(new Date(2010, 10 - 1, 13))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(hebrew.fromJSDate(new Date(2009, 3 - 1, 28)), 5769, 1, 3)
    checkDate(hebrew.fromJSDate(new Date(2010, 10 - 1, 13)), 5771, 8, 5)
  })
})
