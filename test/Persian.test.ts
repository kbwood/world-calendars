import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { PersianCalendar } from '../src/Persian'

describe('Persian calendar', () => {
  const persian = Calendars.instance('persian')
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

  it('should create a Persian calendar', () => {
    expect(persian).toBeInstanceOf(PersianCalendar)
    expect(Calendars.instance('jalali')).toBeInstanceOf(PersianCalendar)
  })

  it('should create a new date', () => {
    const date1 = persian.date(1386, 7, 25)
    const date2 = persian.date(date1)
    const date3 = persian.date()

    checkDate(date1, 1386, 7, 25, persian)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1400, 10, 12, persian)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { persian.date(1386, 17, 55) }).toThrow(new CalendarError('Invalid Persian date'))
    expect(() => { persian.date(1386, 12, 30) }).toThrow(new CalendarError('Invalid Persian date'))
    expect(() => { persian.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Persian date'))
  })

  it('should indicate leap years for a date', () => {
    expect(persian.date(1386, 7, 1).leapYear()).toEqual(false)
    expect(persian.date(1387, 7, 1).leapYear()).toEqual(true)
    expect(persian.date(1388, 7, 1).leapYear()).toEqual(false)
    expect(persian.date(1390, 7, 1).leapYear()).toEqual(false)
    expect(persian.date(1391, 7, 1).leapYear()).toEqual(true)
  })

  it('should indicate leap years given a year', () => {
    expect(persian.leapYear(1386)).toEqual(false)
    expect(persian.leapYear(1387)).toEqual(true)
    expect(persian.leapYear(1388)).toEqual(false)
    expect(persian.leapYear(1390)).toEqual(false)
    expect(persian.leapYear(1391)).toEqual(true)
  })

  it('should return the epoch for a date', () => {
    expect(persian.epoch(persian.date(1386, 1, 2))).toEqual('AP')
    expect(persian.epoch(persian.date(33, 1, 2))).toEqual('AP')
    expect(persian.epoch(persian.date(-505, 1, 2))).toEqual('BP')
  })

  it('should return the epoch given a year', () => {
    expect(persian.epoch(1386)).toEqual('AP')
    expect(persian.epoch(33)).toEqual('AP')
    expect(persian.epoch(-505)).toEqual('BP')
  })

  it('should format the year for a date', () => {
    expect(persian.formatYear(persian.date(1386, 1, 2))).toEqual('1386')
    expect(persian.formatYear(persian.date(33, 1, 2))).toEqual('0033')
    expect(persian.formatYear(persian.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(persian.formatYear(1386)).toEqual('1386')
    expect(persian.formatYear(33)).toEqual('0033')
    expect(persian.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(persian.monthsInYear(persian.date(1386, 1, 2))).toEqual(12)
    expect(persian.monthsInYear(persian.date(33, 1, 2))).toEqual(12)
    expect(persian.monthsInYear(persian.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(persian.monthsInYear(1386)).toEqual(12)
    expect(persian.monthsInYear(33)).toEqual(12)
    expect(persian.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(persian.monthOfYear(persian.date(1386, 1, 2))).toEqual(1)
    expect(persian.monthOfYear(persian.date(1386, 7, 5))).toEqual(7)
    expect(persian.monthOfYear(persian.date(1386, 12, 29))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(persian.monthOfYear(1386, 1)).toEqual(1)
    expect(persian.monthOfYear(1386, 7)).toEqual(7)
    expect(persian.monthOfYear(1386, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(persian.fromMonthOfYear(1386, 1)).toEqual(1)
    expect(persian.fromMonthOfYear(1386, 7)).toEqual(7)
    expect(persian.fromMonthOfYear(1386, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(persian.weekOfYear(persian.date(1387, 12, 30))).toEqual(52)
    expect(persian.weekOfYear(persian.date(1388, 1, 1))).toEqual(1)
    expect(persian.weekOfYear(persian.date(1388, 12, 29))).toEqual(53)
    expect(persian.weekOfYear(persian.date(1389, 1, 6))).toEqual(53)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(persian.weekOfYear(1387, 12, 30)).toEqual(52)
    expect(persian.weekOfYear(1388, 1, 1)).toEqual(1)
    expect(persian.weekOfYear(1388, 12, 29)).toEqual(53)
    expect(persian.weekOfYear(1389, 1, 6)).toEqual(53)
  })

  it('should return the days in the year for a date', () => {
    expect(persian.daysInYear(persian.date(1386, 1, 2))).toEqual(365)
    expect(persian.daysInYear(persian.date(1387, 7, 5))).toEqual(366)
    expect(persian.daysInYear(persian.date(1388, 12, 29))).toEqual(365)
    expect(persian.daysInYear(persian.date(1390, 12, 29))).toEqual(365)
    expect(persian.daysInYear(persian.date(1391, 12, 30))).toEqual(366)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(persian.daysInYear(1386)).toEqual(365)
    expect(persian.daysInYear(1387)).toEqual(366)
    expect(persian.daysInYear(1388)).toEqual(365)
    expect(persian.daysInYear(1390)).toEqual(365)
    expect(persian.daysInYear(1391)).toEqual(366)
  })

  it('should return the day of the year for a date', () => {
    expect(persian.dayOfYear(persian.date(1386, 1, 2))).toEqual(2)
    expect(persian.dayOfYear(persian.date(1386, 7, 5))).toEqual(191)
    expect(persian.dayOfYear(persian.date(1386, 12, 29))).toEqual(365)
    expect(persian.dayOfYear(persian.date(1387, 12, 30))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(persian.dayOfYear(1386, 1, 2)).toEqual(2)
    expect(persian.dayOfYear(1386, 7, 5)).toEqual(191)
    expect(persian.dayOfYear(1386, 12, 29)).toEqual(365)
    expect(persian.dayOfYear(1387, 12, 30)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(persian.daysInMonth(persian.date(1386, 1, 2))).toEqual(31)
    expect(persian.daysInMonth(persian.date(1386, 2, 5))).toEqual(31)
    expect(persian.daysInMonth(persian.date(1386, 9, 4))).toEqual(30)
    expect(persian.daysInMonth(persian.date(1386, 12, 29))).toEqual(29)
    expect(persian.daysInMonth(persian.date(1387, 1, 2))).toEqual(31)
    expect(persian.daysInMonth(persian.date(1387, 2, 5))).toEqual(31)
    expect(persian.daysInMonth(persian.date(1387, 9, 4))).toEqual(30)
    expect(persian.daysInMonth(persian.date(1387, 12, 30))).toEqual(30)
  })

  it('should return the days in the month given a year and month', () => {
    expect(persian.daysInMonth(1386, 1)).toEqual(31)
    expect(persian.daysInMonth(1386, 2)).toEqual(31)
    expect(persian.daysInMonth(1386, 9)).toEqual(30)
    expect(persian.daysInMonth(1386, 12)).toEqual(29)
    expect(persian.daysInMonth(1387, 1)).toEqual(31)
    expect(persian.daysInMonth(1387, 2)).toEqual(31)
    expect(persian.daysInMonth(1387, 9)).toEqual(30)
    expect(persian.daysInMonth(1387, 12)).toEqual(30)
  })

  it('should return the number of days in a standard week', () => {
    expect(persian.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(persian.dayOfWeek(persian.date(1382, 12, 10))).toEqual(0)
    expect(persian.dayOfWeek(persian.date(1387, 10, 13))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(persian.dayOfWeek(1382, 12, 10)).toEqual(0)
    expect(persian.dayOfWeek(1387, 10, 13)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(persian.weekDay(persian.date(1382, 12, 10))).toEqual(true)
    expect(persian.weekDay(persian.date(1387, 10, 13))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(persian.weekDay(1382, 12, 10)).toEqual(true)
    expect(persian.weekDay(1387, 10, 13)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(persian.extraInfo(persian.date(1386, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(persian.extraInfo(1386, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = persian.date(1386, 1, 2)
    d = persian.add(d, 1, 'y')
    checkDate(d, 1387, 1, 2)
    d = persian.add(d, 2, 'm')
    checkDate(d, 1387, 3, 2)
    d = persian.add(d, 3, 'd')
    checkDate(d, 1387, 3, 5)
    d = persian.add(d, -1, 'y')
    d = persian.add(d, -2, 'm')
    d = persian.add(d, -3, 'd')
    checkDate(d, 1386, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = persian.date(1386, 1, 2)
    d = persian.sub(d, 1, 'y')
    checkDate(d, 1385, 1, 2)
    d = persian.sub(d, 2, 'm')
    checkDate(d, 1384, 11, 2)
    d = persian.sub(d, 3, 'd')
    checkDate(d, 1384, 10, 29)
    d = persian.sub(d, -1, 'y') // 1385/10/29
    d = persian.sub(d, -2, 'm') // 1385/12/29
    d = persian.sub(d, -3, 'd')
    checkDate(d, 1386, 1, 3)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = persian.date(-1, 12, 29)
    d = persian.add(d, 1, 'y')
    checkDate(d, 1, 12, 29)
    d = persian.sub(d, 1, 'y')
    checkDate(d, -1, 12, 29)
    d = persian.add(d, 2, 'm')
    checkDate(d, 1, 2, 29)
    d = persian.sub(d, 2, 'm')
    checkDate(d, -1, 12, 29)
    d = persian.add(d, 5, 'd')
    checkDate(d, 1, 1, 4)
    d = persian.sub(d, 5, 'd')
    checkDate(d, -1, 12, 29)
  })

  it('should convert a date to a Julian day number', () => {
    expect(persian.date(1382, 12, 10).toJD()).toEqual(2453064.5)
    expect(persian.date(1387, 10, 13).toJD()).toEqual(2454833.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(persian.toJD(1382, 12, 10)).toEqual(2453064.5)
    expect(persian.toJD(1387, 10, 13)).toEqual(2454833.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(persian.fromJD(2453064.5), 1382, 12, 10)
    checkDate(persian.fromJD(2454833.5), 1387, 10, 13)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(persian.date(1382, 12, 10).toJSDate()).toEqual(new Date(2004, 2 - 1, 29))
    expect(persian.date(1387, 10, 13).toJSDate()).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(persian.toJSDate(1382, 12, 10)).toEqual(new Date(2004, 2 - 1, 29))
    expect(persian.toJSDate(1387, 10, 13)).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(persian.fromJSDate(new Date(2004, 2 - 1, 29)), 1382, 12, 10)
    checkDate(persian.fromJSDate(new Date(2009, 1 - 1, 2)), 1387, 10, 13)
  })
})
