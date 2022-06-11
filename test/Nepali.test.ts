import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { NepaliCalendar } from '../src/Nepali'

describe('Nepali calendar', () => {
  const nepali = Calendars.instance('nepali')
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

  it('should create a Nepali calendar', () => {
    expect(nepali).toBeInstanceOf(NepaliCalendar)
  })

  it('should create a new date', () => {
    const date1 = nepali.date(2070, 4, 32)
    const date2 = nepali.date(date1)
    const date3 = nepali.date()

    checkDate(date1, 2070, 4, 32, nepali)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 2078, 9, 18, nepali)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { nepali.date(2070, 22, 52) }).toThrow(new CalendarError('Invalid Nepali date'))
    expect(() => { nepali.date(2070, 2, 32) }).toThrow(new CalendarError('Invalid Nepali date'))
    expect(() => { nepali.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Nepali date'))
  })

  it('should indicate leap years for a date', () => {
    expect(nepali.date(2070, 7, 1).leapYear()).toEqual(false)
    expect(nepali.date(2071, 7, 1).leapYear()).toEqual(false)
    expect(nepali.date(2072, 7, 1).leapYear()).toEqual(false)
    expect(nepali.date(2073, 7, 1).leapYear()).toEqual(true)
    expect(nepali.date(2074, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(nepali.leapYear(2070)).toEqual(false)
    expect(nepali.leapYear(2071)).toEqual(false)
    expect(nepali.leapYear(2072)).toEqual(false)
    expect(nepali.leapYear(2073)).toEqual(true)
    expect(nepali.leapYear(2074)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(nepali.epoch(nepali.date(2022, 1, 2))).toEqual('ABS')
    expect(nepali.epoch(nepali.date(33, 1, 2))).toEqual('ABS')
    expect(nepali.epoch(nepali.date(-505, 1, 2))).toEqual('BBS')
  })

  it('should return the epoch given a year', () => {
    expect(nepali.epoch(2022)).toEqual('ABS')
    expect(nepali.epoch(33)).toEqual('ABS')
    expect(nepali.epoch(-505)).toEqual('BBS')
  })

  it('should format the year for a date', () => {
    expect(nepali.formatYear(nepali.date(2070, 1, 2))).toEqual('2070')
    expect(nepali.formatYear(nepali.date(33, 1, 2))).toEqual('0033')
    expect(nepali.formatYear(nepali.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(nepali.formatYear(2070)).toEqual('2070')
    expect(nepali.formatYear(33)).toEqual('0033')
    expect(nepali.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(nepali.monthsInYear(nepali.date(2070, 1, 2))).toEqual(12)
    expect(nepali.monthsInYear(nepali.date(33, 1, 2))).toEqual(12)
    expect(nepali.monthsInYear(nepali.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(nepali.monthsInYear(2070)).toEqual(12)
    expect(nepali.monthsInYear(33)).toEqual(12)
    expect(nepali.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(nepali.monthOfYear(nepali.date(2070, 1, 2))).toEqual(1)
    expect(nepali.monthOfYear(nepali.date(2070, 7, 5))).toEqual(7)
    expect(nepali.monthOfYear(nepali.date(2070, 12, 30))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(nepali.monthOfYear(2070, 1)).toEqual(1)
    expect(nepali.monthOfYear(2070, 7)).toEqual(7)
    expect(nepali.monthOfYear(2070, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(nepali.fromMonthOfYear(2070, 1)).toEqual(1)
    expect(nepali.fromMonthOfYear(2070, 7)).toEqual(7)
    expect(nepali.fromMonthOfYear(2070, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(nepali.weekOfYear(nepali.date(2072, 1, 5))).toEqual(52)
    expect(nepali.weekOfYear(nepali.date(2072, 7, 5))).toEqual(27)
    expect(nepali.weekOfYear(nepali.date(2072, 12, 30))).toEqual(52)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(nepali.weekOfYear(2072, 1, 5)).toEqual(52)
    expect(nepali.weekOfYear(2072, 7, 5)).toEqual(27)
    expect(nepali.weekOfYear(2072, 12, 30)).toEqual(52)
  })

  it('should return the days in the year for a date', () => {
    expect(nepali.daysInYear(nepali.date(2070, 1, 2))).toEqual(365)
    expect(nepali.daysInYear(nepali.date(2071, 4, 9))).toEqual(365)
    expect(nepali.daysInYear(nepali.date(2072, 7, 5))).toEqual(365)
    expect(nepali.daysInYear(nepali.date(2073, 10, 23))).toEqual(366)
    expect(nepali.daysInYear(nepali.date(2074, 12, 30))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(nepali.daysInYear(2070)).toEqual(365)
    expect(nepali.daysInYear(2071)).toEqual(365)
    expect(nepali.daysInYear(2072)).toEqual(365)
    expect(nepali.daysInYear(2073)).toEqual(366)
    expect(nepali.daysInYear(2074)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(nepali.dayOfYear(nepali.date(2072, 1, 5))).toEqual(5)
    expect(nepali.dayOfYear(nepali.date(2073, 9, 23))).toEqual(270)
    expect(nepali.dayOfYear(nepali.date(2073, 10, 19))).toEqual(295)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(nepali.dayOfYear(2072, 1, 5)).toEqual(5)
    expect(nepali.dayOfYear(2073, 9, 23)).toEqual(270)
    expect(nepali.dayOfYear(2073, 10, 19)).toEqual(295)
  })

  it('should return the days in the month for a date', () => {
    expect(nepali.daysInMonth(nepali.date(2070, 1, 2))).toEqual(31)
    expect(nepali.daysInMonth(nepali.date(2070, 2, 5))).toEqual(31)
    expect(nepali.daysInMonth(nepali.date(2070, 4, 9))).toEqual(32)
    expect(nepali.daysInMonth(nepali.date(2070, 12, 30))).toEqual(30)
    expect(nepali.daysInMonth(nepali.date(2073, 1, 2))).toEqual(31)
    expect(nepali.daysInMonth(nepali.date(2073, 2, 5))).toEqual(32)
    expect(nepali.daysInMonth(nepali.date(2073, 4, 9))).toEqual(32)
    expect(nepali.daysInMonth(nepali.date(2073, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(nepali.daysInMonth(2070, 1)).toEqual(31)
    expect(nepali.daysInMonth(2070, 2)).toEqual(31)
    expect(nepali.daysInMonth(2070, 4)).toEqual(32)
    expect(nepali.daysInMonth(2070, 12)).toEqual(30)
    expect(nepali.daysInMonth(2073, 1)).toEqual(31)
    expect(nepali.daysInMonth(2073, 2)).toEqual(32)
    expect(nepali.daysInMonth(2073, 4)).toEqual(32)
    expect(nepali.daysInMonth(2073, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(nepali.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(nepali.dayOfWeek(nepali.date(2072, 1, 5))).toEqual(6)
    expect(nepali.dayOfWeek(nepali.date(2073, 9, 23))).toEqual(6)
    expect(nepali.dayOfWeek(nepali.date(2073, 10, 19))).toEqual(3)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(nepali.dayOfWeek(2072, 1, 5)).toEqual(6)
    expect(nepali.dayOfWeek(2073, 9, 23)).toEqual(6)
    expect(nepali.dayOfWeek(2073, 10, 19)).toEqual(3)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(nepali.weekDay(nepali.date(2072, 1, 5))).toEqual(false)
    expect(nepali.weekDay(nepali.date(2073, 9, 23))).toEqual(false)
    expect(nepali.weekDay(nepali.date(2073, 10, 19))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(nepali.weekDay(2072, 1, 5)).toEqual(false)
    expect(nepali.weekDay(2073, 9, 23)).toEqual(false)
    expect(nepali.weekDay(2073, 10, 19)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(nepali.extraInfo(nepali.date(2070, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(nepali.extraInfo(2070, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = nepali.date(2070, 1, 2)
    d = nepali.add(d, 1, 'y')
    checkDate(d, 2071, 1, 2)
    d = nepali.add(d, 2, 'm')
    checkDate(d, 2071, 3, 2)
    d = nepali.add(d, 3, 'd')
    checkDate(d, 2071, 3, 5)
    d = nepali.add(d, -1, 'y')
    d = nepali.add(d, -2, 'm')
    d = nepali.add(d, -3, 'd')
    checkDate(d, 2070, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = nepali.date(2070, 1, 2)
    d = nepali.sub(d, 1, 'y')
    checkDate(d, 2069, 1, 2)
    d = nepali.sub(d, 2, 'm')
    checkDate(d, 2068, 11, 2)
    d = nepali.sub(d, 3, 'd')
    checkDate(d, 2068, 10, 28)
    d = nepali.sub(d, -1, 'y') // 2069/10/28
    d = nepali.sub(d, -2, 'm') // 2069/12/28
    d = nepali.sub(d, -3, 'd')
    checkDate(d, 2069, 12, 31)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = nepali.date(-1, 12, 29)
    d = nepali.add(d, 1, 'y')
    checkDate(d, 1, 12, 29)
    d = nepali.sub(d, 1, 'y')
    checkDate(d, -1, 12, 29)
    d = nepali.add(d, 2, 'm')
    checkDate(d, 1, 2, 29)
    d = nepali.sub(d, 2, 'm')
    checkDate(d, -1, 12, 29)
    d = nepali.add(d, 5, 'd')
    checkDate(d, 1, 1, 4)
    d = nepali.sub(d, 5, 'd')
    checkDate(d, -1, 12, 29)
  })

  it('should convert a date to a Julian day number', () => {
    expect(nepali.date(1956, 11, 23).toJD()).toEqual(2415085.5)
    expect(nepali.date(2070, 8, 12).toJD()).toEqual(2456623.5)
    expect(nepali.date(2072, 1, 2).toJD()).toEqual(2457127.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(nepali.toJD(1956, 11, 23)).toEqual(2415085.5)
    expect(nepali.toJD(2070, 8, 12)).toEqual(2456623.5)
    expect(nepali.toJD(2072, 1, 2)).toEqual(2457127.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(nepali.fromJD(2415085.5), 1956, 11, 23)
    checkDate(nepali.fromJD(2456623.5), 2070, 8, 12)
    checkDate(nepali.fromJD(2457127.5), 2072, 1, 2)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(nepali.date(1956, 11, 23).toJSDate()).toEqual(new Date(1900, 3 - 1, 7))
    expect(nepali.date(2070, 8, 12).toJSDate()).toEqual(new Date(2013, 11 - 1, 27))
    expect(nepali.date(2072, 1, 2).toJSDate()).toEqual(new Date(2015, 4 - 1, 15))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(nepali.toJSDate(1956, 11, 23)).toEqual(new Date(1900, 3 - 1, 7))
    expect(nepali.toJSDate(2070, 8, 12)).toEqual(new Date(2013, 11 - 1, 27))
    expect(nepali.toJSDate(2072, 1, 2)).toEqual(new Date(2015, 4 - 1, 15))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(nepali.fromJSDate(new Date(1900, 3 - 1, 7)), 1956, 11, 23)
    checkDate(nepali.fromJSDate(new Date(2013, 11 - 1, 27)), 2070, 8, 12)
    checkDate(nepali.fromJSDate(new Date(2015, 4 - 1, 15)), 2072, 1, 2)
  })
})
