import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { DiscworldCalendar } from '../src/Discworld'

describe('Discworld calendar', () => {
  const discworld = Calendars.instance('discworld')
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

  it('should create a Discworld calendar', () => {
    expect(discworld).toBeInstanceOf(DiscworldCalendar)
  })

  it('should create a new date', () => {
    const date1 = discworld.date(2015, 7, 25)
    const date2 = discworld.date(date1)
    const date3 = discworld.date()

    checkDate(date1, 2015, 7, 25, discworld)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1846, 6, 13, discworld)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { discworld.date(2015, 17, 55) }).toThrow(new CalendarError('Invalid Discworld date'))
    expect(() => { discworld.date(2015, 1, 17) }).toThrow(new CalendarError('Invalid Discworld date'))
    expect(() => { discworld.date(2015, 2, 33) }).toThrow(new CalendarError('Invalid Discworld date'))
    expect(() => { discworld.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Discworld date'))
  })

  it('should indicate leap years for a date', () => {
    expect(discworld.date(2015, 7, 1).leapYear()).toEqual(false)
    expect(discworld.date(2016, 7, 1).leapYear()).toEqual(false)
    expect(discworld.date(2017, 7, 1).leapYear()).toEqual(false)
    expect(discworld.date(2018, 7, 1).leapYear()).toEqual(false)
    expect(discworld.date(2019, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(discworld.leapYear(2015)).toEqual(false)
    expect(discworld.leapYear(2016)).toEqual(false)
    expect(discworld.leapYear(2017)).toEqual(false)
    expect(discworld.leapYear(2018)).toEqual(false)
    expect(discworld.leapYear(2019)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(discworld.epoch(discworld.date(2015, 1, 2))).toEqual('UC')
    expect(discworld.epoch(discworld.date(33, 1, 2))).toEqual('UC')
    expect(discworld.epoch(discworld.date(-505, 1, 2))).toEqual('BUC')
  })

  it('should return the epoch given a year', () => {
    expect(discworld.epoch(2015)).toEqual('UC')
    expect(discworld.epoch(33)).toEqual('UC')
    expect(discworld.epoch(-505)).toEqual('BUC')
  })

  it('should format the year for a date', () => {
    expect(discworld.formatYear(discworld.date(2015, 1, 2))).toEqual('2015')
    expect(discworld.formatYear(discworld.date(33, 1, 2))).toEqual('0033')
    expect(discworld.formatYear(discworld.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(discworld.formatYear(2015)).toEqual('2015')
    expect(discworld.formatYear(33)).toEqual('0033')
    expect(discworld.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(discworld.monthsInYear(discworld.date(2015, 1, 2))).toEqual(13)
    expect(discworld.monthsInYear(discworld.date(33, 1, 2))).toEqual(13)
    expect(discworld.monthsInYear(discworld.date(-505, 1, 2))).toEqual(13)
  })

  it('should return the number of months in the year given a year', () => {
    expect(discworld.monthsInYear(2015)).toEqual(13)
    expect(discworld.monthsInYear(33)).toEqual(13)
    expect(discworld.monthsInYear(-505)).toEqual(13)
  })

  it('should return the month of the year for a date', () => {
    expect(discworld.monthOfYear(discworld.date(2015, 1, 2))).toEqual(1)
    expect(discworld.monthOfYear(discworld.date(2015, 7, 5))).toEqual(7)
    expect(discworld.monthOfYear(discworld.date(2015, 12, 31))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(discworld.monthOfYear(2015, 1)).toEqual(1)
    expect(discworld.monthOfYear(2015, 7)).toEqual(7)
    expect(discworld.monthOfYear(2015, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(discworld.fromMonthOfYear(2015, 1)).toEqual(1)
    expect(discworld.fromMonthOfYear(2015, 7)).toEqual(7)
    expect(discworld.fromMonthOfYear(2015, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(discworld.weekOfYear(discworld.date(2015, 1, 2))).toEqual(50)
    expect(discworld.weekOfYear(discworld.date(2015, 7, 5))).toEqual(22)
    expect(discworld.weekOfYear(discworld.date(2015, 12, 31))).toEqual(46)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(discworld.weekOfYear(2015, 1, 2)).toEqual(50)
    expect(discworld.weekOfYear(2015, 7, 5)).toEqual(22)
    expect(discworld.weekOfYear(2015, 12, 31)).toEqual(46)
  })

  it('should return the days in the year for a date', () => {
    expect(discworld.daysInYear(discworld.date(2015, 1, 2))).toEqual(400)
    expect(discworld.daysInYear(discworld.date(2016, 7, 5))).toEqual(400)
    expect(discworld.daysInYear(discworld.date(2017, 12, 31))).toEqual(400)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(discworld.daysInYear(2015)).toEqual(400)
    expect(discworld.daysInYear(2016)).toEqual(400)
    expect(discworld.daysInYear(2017)).toEqual(400)
  })

  it('should return the day of the year for a date', () => {
    expect(discworld.dayOfYear(discworld.date(2015, 1, 2))).toEqual(2)
    expect(discworld.dayOfYear(discworld.date(2015, 7, 5))).toEqual(181)
    expect(discworld.dayOfYear(discworld.date(2015, 12, 31))).toEqual(367)
    expect(discworld.dayOfYear(discworld.date(2016, 12, 31))).toEqual(367)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(discworld.dayOfYear(2015, 1, 2)).toEqual(2)
    expect(discworld.dayOfYear(2015, 7, 5)).toEqual(181)
    expect(discworld.dayOfYear(2015, 12, 31)).toEqual(367)
    expect(discworld.dayOfYear(2016, 12, 31)).toEqual(367)
  })

  it('should return the days in the month for a date', () => {
    expect(discworld.daysInMonth(discworld.date(2015, 1, 2))).toEqual(16)
    expect(discworld.daysInMonth(discworld.date(2015, 2, 5))).toEqual(32)
    expect(discworld.daysInMonth(discworld.date(2015, 8, 9))).toEqual(32)
    expect(discworld.daysInMonth(discworld.date(2015, 13, 31))).toEqual(32)
    expect(discworld.daysInMonth(discworld.date(2016, 1, 2))).toEqual(16)
    expect(discworld.daysInMonth(discworld.date(2016, 2, 5))).toEqual(32)
    expect(discworld.daysInMonth(discworld.date(2016, 8, 9))).toEqual(32)
    expect(discworld.daysInMonth(discworld.date(2016, 13, 31))).toEqual(32)
  })

  it('should return the days in the month given a year and month', () => {
    expect(discworld.daysInMonth(2015, 1)).toEqual(16)
    expect(discworld.daysInMonth(2015, 2)).toEqual(32)
    expect(discworld.daysInMonth(2015, 8)).toEqual(32)
    expect(discworld.daysInMonth(2015, 13)).toEqual(32)
    expect(discworld.daysInMonth(2016, 1)).toEqual(16)
    expect(discworld.daysInMonth(2016, 2)).toEqual(32)
    expect(discworld.daysInMonth(2016, 8)).toEqual(32)
    expect(discworld.daysInMonth(2016, 13)).toEqual(32)
  })

  it('should return the number of days in a standard week', () => {
    expect(discworld.daysInWeek()).toEqual(8)
  })

  it('should return the day of the week for a date', () => {
    expect(discworld.dayOfWeek(discworld.date(1915, 1, 5))).toEqual(6)
    expect(discworld.dayOfWeek(discworld.date(1916, 10, 24))).toEqual(1)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(discworld.dayOfWeek(1915, 1, 5)).toEqual(6)
    expect(discworld.dayOfWeek(1916, 10, 24)).toEqual(1)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(discworld.weekDay(discworld.date(1915, 1, 5))).toEqual(true)
    expect(discworld.weekDay(discworld.date(1916, 10, 24))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(discworld.weekDay(1915, 1, 5)).toEqual(true)
    expect(discworld.weekDay(1916, 10, 24)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(discworld.extraInfo(discworld.date(1840, 1, 1))).toEqual({ century: '' })
    expect(discworld.extraInfo(discworld.date(1915, 1, 1))).toEqual({ century: 'Fruitbat' })
    expect(discworld.extraInfo(discworld.date(2000, 1, 1))).toEqual({ century: 'Fruitbat' })
    expect(discworld.extraInfo(discworld.date(2001, 1, 1))).toEqual({ century: 'Anchovy' })
  })

  it('should return extra information given a year, month and day', () => {
    expect(discworld.extraInfo(1840, 1, 1)).toEqual({ century: '' })
    expect(discworld.extraInfo(1915, 1, 1)).toEqual({ century: 'Fruitbat' })
    expect(discworld.extraInfo(2000, 1, 1)).toEqual({ century: 'Fruitbat' })
    expect(discworld.extraInfo(2001, 1, 1)).toEqual({ century: 'Anchovy' })
  })

  it('should add to a date', () => {
    let d = discworld.date(2015, 1, 2)
    d = discworld.add(d, 1, 'y')
    checkDate(d, 2016, 1, 2)
    d = discworld.add(d, 2, 'm')
    checkDate(d, 2016, 3, 2)
    d = discworld.add(d, 3, 'd')
    checkDate(d, 2016, 3, 5)
    d = discworld.add(d, -1, 'y')
    d = discworld.add(d, -2, 'm')
    d = discworld.add(d, -3, 'd')
    checkDate(d, 2015, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = discworld.date(2015, 1, 2)
    d = discworld.sub(d, 1, 'y')
    checkDate(d, 2014, 1, 2)
    d = discworld.sub(d, 2, 'm')
    checkDate(d, 2013, 12, 2)
    d = discworld.sub(d, 3, 'd')
    checkDate(d, 2013, 11, 31)
    d = discworld.sub(d, -1, 'y') // 2014/11/31
    d = discworld.sub(d, -2, 'm') // 2014/13/31
    d = discworld.sub(d, -3, 'd')
    checkDate(d, 2015, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = discworld.date(-1, 13, 30)
    d = discworld.add(d, 1, 'y')
    checkDate(d, 1, 13, 30)
    d = discworld.sub(d, 1, 'y')
    checkDate(d, -1, 13, 30)
    d = discworld.add(d, 2, 'm')
    checkDate(d, 1, 2, 30)
    d = discworld.sub(d, 2, 'm')
    checkDate(d, -1, 13, 30)
    d = discworld.add(d, 5, 'd')
    checkDate(d, 1, 1, 3)
    d = discworld.sub(d, 5, 'd')
    checkDate(d, -1, 13, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(discworld.date(1915, 1, 5).toJD()).toEqual(2487029.5)
    expect(discworld.date(1916, 10, 24).toJD()).toEqual(2487720.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(discworld.toJD(1915, 1, 5)).toEqual(2487029.5)
    expect(discworld.toJD(1916, 10, 24)).toEqual(2487720.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(discworld.fromJD(2487029.5), 1915, 1, 5)
    checkDate(discworld.fromJD(2487720.5), 1916, 10, 24)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(discworld.date(1915, 1, 5).toJSDate()).toEqual(new Date(2097, 2 - 1, 25))
    expect(discworld.date(1916, 10, 24).toJSDate()).toEqual(new Date(2099, 1 - 1, 17))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(discworld.toJSDate(1915, 1, 5)).toEqual(new Date(2097, 2 - 1, 25))
    expect(discworld.toJSDate(1916, 10, 24)).toEqual(new Date(2099, 1 - 1, 17))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(discworld.fromJSDate(new Date(2097, 2 - 1, 25)), 1915, 1, 5)
    checkDate(discworld.fromJSDate(new Date(2099, 1 - 1, 17)), 1916, 10, 24)
  })
})
