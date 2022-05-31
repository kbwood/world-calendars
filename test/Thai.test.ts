import Calendars, { BaseCalendar, CalendarError, CDate } from '../src/Calendars'
import { ThaiCalendar } from '../src/Thai'

describe('Thai calendar', () => {
  const thai = Calendars.instance('thai')
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

  it('should create a Thai calendar', () => {
    expect(thai).toBeInstanceOf(ThaiCalendar)
  })

  it('should create a new date', () => {
    const date1 = thai.date(2544, 7, 25)
    const date2 = thai.date(date1)
    const date3 = thai.date()

    checkDate(date1, 2544, 7, 25, thai)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 2565, 1, 2, thai)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { thai.date(2544, 17, 55) }).toThrow(new CalendarError('Invalid Thai date'))
    expect(() => { thai.date(2544, 2, 29) }).toThrow(new CalendarError('Invalid Thai date'))
    expect(() => { thai.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Thai date'))
  })

  it('should indicate leap years for a date', () => {
    expect(thai.date(2542, 7, 1).leapYear()).toEqual(false)
    expect(thai.date(2543, 7, 1).leapYear()).toEqual(true)
    expect(thai.date(2544, 7, 1).leapYear()).toEqual(false)
    expect(thai.date(2545, 7, 1).leapYear()).toEqual(false)
    expect(thai.date(2546, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(thai.leapYear(2542)).toEqual(false)
    expect(thai.leapYear(2543)).toEqual(true)
    expect(thai.leapYear(2544)).toEqual(false)
    expect(thai.leapYear(2545)).toEqual(false)
    expect(thai.leapYear(2546)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(thai.epoch(thai.date(2544, 1, 2))).toEqual('BE')
    expect(thai.epoch(thai.date(33, 1, 2))).toEqual('BE')
    expect(thai.epoch(thai.date(-505, 1, 2))).toEqual('BBE')
  })

  it('should return the epoch given a year', () => {
    expect(thai.epoch(2544)).toEqual('BE')
    expect(thai.epoch(33)).toEqual('BE')
    expect(thai.epoch(-505)).toEqual('BBE')
  })

  it('should format the year for a date', () => {
    expect(thai.formatYear(thai.date(2544, 1, 2))).toEqual('2544')
    expect(thai.formatYear(thai.date(33, 1, 2))).toEqual('0033')
    expect(thai.formatYear(thai.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(thai.formatYear(2544)).toEqual('2544')
    expect(thai.formatYear(33)).toEqual('0033')
    expect(thai.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(thai.monthsInYear(thai.date(2544, 1, 2))).toEqual(12)
    expect(thai.monthsInYear(thai.date(33, 1, 2))).toEqual(12)
    expect(thai.monthsInYear(thai.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(thai.monthsInYear(2544)).toEqual(12)
    expect(thai.monthsInYear(33)).toEqual(12)
    expect(thai.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(thai.monthOfYear(thai.date(2544, 1, 2))).toEqual(1)
    expect(thai.monthOfYear(thai.date(2544, 7, 5))).toEqual(7)
    expect(thai.monthOfYear(thai.date(2544, 12, 31))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(thai.monthOfYear(2544, 1)).toEqual(1)
    expect(thai.monthOfYear(2544, 7)).toEqual(7)
    expect(thai.monthOfYear(2544, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(thai.fromMonthOfYear(2544, 1)).toEqual(1)
    expect(thai.fromMonthOfYear(2544, 7)).toEqual(7)
    expect(thai.fromMonthOfYear(2544, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(thai.weekOfYear(thai.date(2544, 1, 2))).toEqual(1)
    expect(thai.weekOfYear(thai.date(2544, 7, 5))).toEqual(27)
    expect(thai.weekOfYear(thai.date(2544, 12, 31))).toEqual(1)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(thai.weekOfYear(2544, 1, 2)).toEqual(1)
    expect(thai.weekOfYear(2544, 7, 5)).toEqual(27)
    expect(thai.weekOfYear(2544, 12, 31)).toEqual(1)
  })

  it('should return the days in the year for a date', () => {
    expect(thai.daysInYear(thai.date(2542, 1, 2))).toEqual(365)
    expect(thai.daysInYear(thai.date(2543, 7, 5))).toEqual(366)
    expect(thai.daysInYear(thai.date(2544, 12, 31))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(thai.daysInYear(2542)).toEqual(365)
    expect(thai.daysInYear(2543)).toEqual(366)
    expect(thai.daysInYear(2544)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(thai.dayOfYear(thai.date(2544, 1, 2))).toEqual(2)
    expect(thai.dayOfYear(thai.date(2544, 7, 5))).toEqual(186)
    expect(thai.dayOfYear(thai.date(2544, 12, 31))).toEqual(365)
    expect(thai.dayOfYear(thai.date(2543, 12, 31))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(thai.dayOfYear(2544, 1, 2)).toEqual(2)
    expect(thai.dayOfYear(2544, 7, 5)).toEqual(186)
    expect(thai.dayOfYear(2544, 12, 31)).toEqual(365)
    expect(thai.dayOfYear(2543, 12, 31)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(thai.daysInMonth(thai.date(2543, 1, 2))).toEqual(31)
    expect(thai.daysInMonth(thai.date(2543, 2, 5))).toEqual(29)
    expect(thai.daysInMonth(thai.date(2543, 4, 9))).toEqual(30)
    expect(thai.daysInMonth(thai.date(2543, 12, 31))).toEqual(31)
    expect(thai.daysInMonth(thai.date(2544, 1, 2))).toEqual(31)
    expect(thai.daysInMonth(thai.date(2544, 2, 5))).toEqual(28)
    expect(thai.daysInMonth(thai.date(2544, 4, 9))).toEqual(30)
    expect(thai.daysInMonth(thai.date(2544, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(thai.daysInMonth(2543, 1)).toEqual(31)
    expect(thai.daysInMonth(2543, 2)).toEqual(29)
    expect(thai.daysInMonth(2543, 4)).toEqual(30)
    expect(thai.daysInMonth(2543, 12)).toEqual(31)
    expect(thai.daysInMonth(2544, 1)).toEqual(31)
    expect(thai.daysInMonth(2544, 2)).toEqual(28)
    expect(thai.daysInMonth(2544, 4)).toEqual(30)
    expect(thai.daysInMonth(2544, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(thai.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(thai.dayOfWeek(thai.date(2547, 2, 29))).toEqual(0)
    expect(thai.dayOfWeek(thai.date(2552, 1, 2))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(thai.dayOfWeek(2547, 2, 29)).toEqual(0)
    expect(thai.dayOfWeek(2552, 1, 2)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(thai.weekDay(thai.date(2547, 2, 29))).toEqual(false)
    expect(thai.weekDay(thai.date(2552, 1, 2))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(thai.weekDay(2547, 2, 29)).toEqual(false)
    expect(thai.weekDay(2552, 1, 2)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(thai.extraInfo(thai.date(2544, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(thai.extraInfo(2544, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = thai.date(2544, 1, 2)
    d = thai.add(d, 1, 'y')
    checkDate(d, 2545, 1, 2)
    d = thai.add(d, 2, 'm')
    checkDate(d, 2545, 3, 2)
    d = thai.add(d, 3, 'd')
    checkDate(d, 2545, 3, 5)
    d = thai.add(d, -1, 'y')
    d = thai.add(d, -2, 'm')
    d = thai.add(d, -3, 'd')
    checkDate(d, 2544, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = thai.date(2544, 1, 2)
    d = thai.sub(d, 1, 'y')
    checkDate(d, 2543, 1, 2)
    d = thai.sub(d, 2, 'm')
    checkDate(d, 2542, 11, 2)
    d = thai.sub(d, 3, 'd')
    checkDate(d, 2542, 10, 30)
    d = thai.sub(d, -1, 'y') // 2543/10/30
    d = thai.sub(d, -2, 'm') // 2543/12/30
    d = thai.sub(d, -3, 'd')
    checkDate(d, 2544, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = thai.date(-1, 12, 30)
    d = thai.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = thai.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = thai.add(d, 2, 'm')
    checkDate(d, 1, 2, 28)
    d = thai.sub(d, 2, 'm')
    checkDate(d, -1, 12, 28)
    d = thai.add(d, 5, 'd')
    checkDate(d, 1, 1, 2)
    d = thai.sub(d, 3, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(thai.date(2547, 2, 29).toJD()).toEqual(2453064.5)
    expect(thai.date(2552, 1, 2).toJD()).toEqual(2454833.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(thai.toJD(2547, 2, 29)).toEqual(2453064.5)
    expect(thai.toJD(2552, 1, 2)).toEqual(2454833.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(thai.fromJD(2453064.5), 2547, 2, 29)
    checkDate(thai.fromJD(2454833.5), 2552, 1, 2)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(thai.date(2547, 2, 29).toJSDate()).toEqual(new Date(2004, 2 - 1, 29))
    expect(thai.date(2552, 1, 2).toJSDate()).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(thai.toJSDate(2547, 2, 29)).toEqual(new Date(2004, 2 - 1, 29))
    expect(thai.toJSDate(2552, 1, 2)).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(thai.fromJSDate(new Date(2004, 2 - 1, 29)), 2547, 2, 29)
    checkDate(thai.fromJSDate(new Date(2009, 1 - 1, 2)), 2552, 1, 2)
  })
})
