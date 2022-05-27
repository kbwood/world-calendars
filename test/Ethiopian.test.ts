import Calendars, { BaseCalendar, CalendarError, CDate } from '../src/Calendars'
import { EthiopianCalendar } from '../src/Ethiopian'

describe('Ethiopian calendar', () => {
  const ethiopian = Calendars.instance('ethiopian')
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

  it('should create an Ethiopian calendar', () => {
    expect(ethiopian).toBeInstanceOf(EthiopianCalendar)
  })

  it('should create a new date', () => {
    const date1 = ethiopian.date(2014, 7, 25)
    const date2 = ethiopian.date(date1)
    const date3 = ethiopian.date()

    checkDate(date1, 2014, 7, 25, ethiopian)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 2014, 4, 24, ethiopian)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { ethiopian.date(2014, 17, 55) }).toThrow(new CalendarError('Invalid Ethiopian date'))
    expect(() => { ethiopian.date(2014, 13, 6) }).toThrow(new CalendarError('Invalid Ethiopian date'))
    expect(() => { ethiopian.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Ethiopian date'))
  })

  it('should indicate leap years for a date', () => {
    expect(ethiopian.date(2001, 7, 1).leapYear()).toEqual(false)
    expect(ethiopian.date(2002, 7, 1).leapYear()).toEqual(false)
    expect(ethiopian.date(2003, 7, 1).leapYear()).toEqual(true)
    expect(ethiopian.date(2004, 7, 1).leapYear()).toEqual(false)
    expect(ethiopian.date(2005, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(ethiopian.leapYear(2001)).toEqual(false)
    expect(ethiopian.leapYear(2002)).toEqual(false)
    expect(ethiopian.leapYear(2003)).toEqual(true)
    expect(ethiopian.leapYear(2004)).toEqual(false)
    expect(ethiopian.leapYear(2005)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(ethiopian.epoch(ethiopian.date(2014, 1, 2))).toEqual('EE')
    expect(ethiopian.epoch(ethiopian.date(33, 1, 2))).toEqual('EE')
    expect(ethiopian.epoch(ethiopian.date(-505, 1, 2))).toEqual('BEE')
  })

  it('should return the epoch given a year', () => {
    expect(ethiopian.epoch(2014)).toEqual('EE')
    expect(ethiopian.epoch(33)).toEqual('EE')
    expect(ethiopian.epoch(-505)).toEqual('BEE')
  })

  it('should format the year for a date', () => {
    expect(ethiopian.formatYear(ethiopian.date(2014, 1, 2))).toEqual('2014')
    expect(ethiopian.formatYear(ethiopian.date(33, 1, 2))).toEqual('0033')
    expect(ethiopian.formatYear(ethiopian.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(ethiopian.formatYear(2014)).toEqual('2014')
    expect(ethiopian.formatYear(33)).toEqual('0033')
    expect(ethiopian.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(ethiopian.monthsInYear(ethiopian.date(2014, 1, 2))).toEqual(13)
    expect(ethiopian.monthsInYear(ethiopian.date(33, 1, 2))).toEqual(13)
    expect(ethiopian.monthsInYear(ethiopian.date(-505, 1, 2))).toEqual(13)
  })

  it('should return the number of months in the year given a year', () => {
    expect(ethiopian.monthsInYear(2014)).toEqual(13)
    expect(ethiopian.monthsInYear(33)).toEqual(13)
    expect(ethiopian.monthsInYear(-505)).toEqual(13)
  })

  it('should return the month of the year for a date', () => {
    expect(ethiopian.monthOfYear(ethiopian.date(2014, 1, 2))).toEqual(1)
    expect(ethiopian.monthOfYear(ethiopian.date(2014, 7, 5))).toEqual(7)
    expect(ethiopian.monthOfYear(ethiopian.date(2014, 13, 5))).toEqual(13)
  })

  it('should return the month of the year given a year and month', () => {
    expect(ethiopian.monthOfYear(2014, 1)).toEqual(1)
    expect(ethiopian.monthOfYear(2014, 7)).toEqual(7)
    expect(ethiopian.monthOfYear(2014, 13)).toEqual(13)
  })

  it('should return the month from the month of the year', () => {
    expect(ethiopian.fromMonthOfYear(2014, 1)).toEqual(1)
    expect(ethiopian.fromMonthOfYear(2014, 7)).toEqual(7)
    expect(ethiopian.fromMonthOfYear(2014, 13)).toEqual(13)
  })

  it('should return the week of the year for a date', () => {
    expect(ethiopian.weekOfYear(ethiopian.date(2000, 13, 5))).toEqual(52)
    expect(ethiopian.weekOfYear(ethiopian.date(2001, 1, 3))).toEqual(52)
    expect(ethiopian.weekOfYear(ethiopian.date(2001, 1, 4))).toEqual(1)
    expect(ethiopian.weekOfYear(ethiopian.date(2001, 1, 10))).toEqual(1)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(ethiopian.weekOfYear(2000, 13, 5)).toEqual(52)
    expect(ethiopian.weekOfYear(2001, 1, 3)).toEqual(52)
    expect(ethiopian.weekOfYear(2001, 1, 4)).toEqual(1)
    expect(ethiopian.weekOfYear(2001, 1, 10)).toEqual(1)
  })

  it('should return the days in the year for a date', () => {
    expect(ethiopian.daysInYear(ethiopian.date(2001, 1, 2))).toEqual(365)
    expect(ethiopian.daysInYear(ethiopian.date(2002, 4, 5))).toEqual(365)
    expect(ethiopian.daysInYear(ethiopian.date(2003, 7, 14))).toEqual(366)
    expect(ethiopian.daysInYear(ethiopian.date(2004, 10, 21))).toEqual(365)
    expect(ethiopian.daysInYear(ethiopian.date(2005, 13, 5))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(ethiopian.daysInYear(2001)).toEqual(365)
    expect(ethiopian.daysInYear(2002)).toEqual(365)
    expect(ethiopian.daysInYear(2003)).toEqual(366)
    expect(ethiopian.daysInYear(2004)).toEqual(365)
    expect(ethiopian.daysInYear(2005)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(ethiopian.dayOfYear(ethiopian.date(2006, 2, 5))).toEqual(35)
    expect(ethiopian.dayOfYear(ethiopian.date(2007, 8, 18))).toEqual(228)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(ethiopian.dayOfYear(2006, 2, 5)).toEqual(35)
    expect(ethiopian.dayOfYear(2007, 8, 18)).toEqual(228)
  })

  it('should return the days in the month for a date', () => {
    expect(ethiopian.daysInMonth(ethiopian.date(2002, 1, 2))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2002, 4, 9))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2002, 9, 23))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2002, 13, 3))).toEqual(5)
    expect(ethiopian.daysInMonth(ethiopian.date(2003, 1, 2))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2003, 4, 9))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2003, 9, 23))).toEqual(30)
    expect(ethiopian.daysInMonth(ethiopian.date(2003, 13, 3))).toEqual(6)
  })

  it('should return the days in the month given a year and month', () => {
    expect(ethiopian.daysInMonth(2002, 1)).toEqual(30)
    expect(ethiopian.daysInMonth(2002, 4)).toEqual(30)
    expect(ethiopian.daysInMonth(2002, 9)).toEqual(30)
    expect(ethiopian.daysInMonth(2002, 13)).toEqual(5)
    expect(ethiopian.daysInMonth(2003, 1)).toEqual(30)
    expect(ethiopian.daysInMonth(2003, 4)).toEqual(30)
    expect(ethiopian.daysInMonth(2003, 9)).toEqual(30)
    expect(ethiopian.daysInMonth(2003, 13)).toEqual(6)
  })

  it('should return the number of days in a standard week', () => {
    expect(ethiopian.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(ethiopian.dayOfWeek(ethiopian.date(2006, 2, 5))).toEqual(2)
    expect(ethiopian.dayOfWeek(ethiopian.date(2007, 8, 18))).toEqual(0)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(ethiopian.dayOfWeek(2006, 2, 5)).toEqual(2)
    expect(ethiopian.dayOfWeek(2007, 8, 18)).toEqual(0)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(ethiopian.weekDay(ethiopian.date(2006, 2, 5))).toEqual(true)
    expect(ethiopian.weekDay(ethiopian.date(2007, 8, 18))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(ethiopian.weekDay(2006, 2, 5)).toEqual(true)
    expect(ethiopian.weekDay(2007, 8, 18)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(ethiopian.extraInfo(ethiopian.date(2022, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(ethiopian.extraInfo(2022, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = ethiopian.date(2014, 1, 2)
    d = ethiopian.add(d, 1, 'y')
    checkDate(d, 2015, 1, 2)
    d = ethiopian.add(d, 2, 'm')
    checkDate(d, 2015, 3, 2)
    d = ethiopian.add(d, 3, 'd')
    checkDate(d, 2015, 3, 5)
    d = ethiopian.add(d, -1, 'y')
    d = ethiopian.add(d, -2, 'm')
    d = ethiopian.add(d, -3, 'd')
    checkDate(d, 2014, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = ethiopian.date(2014, 1, 2)
    d = ethiopian.sub(d, 1, 'y')
    checkDate(d, 2013, 1, 2)
    d = ethiopian.sub(d, 2, 'm')
    checkDate(d, 2012, 12, 2)
    d = ethiopian.sub(d, 3, 'd')
    checkDate(d, 2012, 11, 29)
    d = ethiopian.sub(d, -1, 'y') // 2013/11/29
    d = ethiopian.sub(d, -2, 'm') // 2013/13/05
    d = ethiopian.sub(d, -3, 'd')
    checkDate(d, 2014, 1, 3)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = ethiopian.date(-1, 12, 30)
    d = ethiopian.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = ethiopian.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = ethiopian.add(d, 2, 'm')
    checkDate(d, 1, 1, 30)
    d = ethiopian.sub(d, 2, 'm')
    checkDate(d, -1, 12, 30)
    d = ethiopian.add(d, 15, 'd')
    checkDate(d, 1, 1, 10)
    d = ethiopian.sub(d, 15, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(ethiopian.date(-25, 13, 5).toJD()).toEqual(1715453.5)
    expect(ethiopian.date(2001, 1, 1).toJD()).toEqual(2454720.5)
    expect(ethiopian.date(2004, 13, 5).toJD()).toEqual(2456180.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(ethiopian.toJD(-25, 13, 5)).toEqual(1715453.5)
    expect(ethiopian.toJD(2001, 1, 1)).toEqual(2454720.5)
    expect(ethiopian.toJD(2004, 13, 5)).toEqual(2456180.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(ethiopian.fromJD(1715453.5), -25, 13, 5)
    checkDate(ethiopian.fromJD(2454720.5), 2001, 1, 1)
    checkDate(ethiopian.fromJD(2456180.5), 2004, 13, 5)
  })

  it('should convert a date to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(ethiopian.date(49, 3, 27).toJSDate()).toEqual(earlyDate)
    expect(ethiopian.date(1991, 12, 6).toJSDate()).toEqual(new Date(1999, 8 - 1, 12))
    expect(ethiopian.date(2014, 5, 7).toJSDate()).toEqual(new Date(2022, 1 - 1, 15))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(ethiopian.toJSDate(49, 3, 27)).toEqual(earlyDate)
    expect(ethiopian.toJSDate(1991, 12, 6)).toEqual(new Date(1999, 8 - 1, 12))
    expect(ethiopian.toJSDate(2014, 5, 7)).toEqual(new Date(2022, 1 - 1, 15))
  })

  it('should convert from a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    checkDate(ethiopian.fromJSDate(earlyDate), 49, 3, 27)
    checkDate(ethiopian.fromJSDate(new Date(1999, 8 - 1, 12)), 1991, 12, 6)
    checkDate(ethiopian.fromJSDate(new Date(2022, 1 - 1, 15)), 2014, 5, 7)
  })
})
