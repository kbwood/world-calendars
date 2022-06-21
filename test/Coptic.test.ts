import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { CopticCalendar } from '../src/Coptic'

describe('Coptic calendar', () => {
  const coptic = Calendars.instance('coptic')
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

  it('should create a Coptic calendar', () => {
    expect(coptic).toBeInstanceOf(CopticCalendar)
  })

  it('should create a new date', () => {
    const date1 = coptic.date(1724, 7, 25)
    const date2 = coptic.date(date1)
    const date3 = coptic.date()

    checkDate(date1, 1724, 7, 25, coptic)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1738, 4, 24, coptic)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { coptic.date(1724, 17, 55) }).toThrow(new CalendarError('Invalid Coptic date'))
    expect(() => { coptic.date(1724, 13, 6) }).toThrow(new CalendarError('Invalid Coptic date'))
    expect(() => { coptic.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Coptic date'))
  })

  it('should indicate leap years for a date', () => {
    expect(coptic.date(1724, 7, 1).leapYear()).toEqual(false)
    expect(coptic.date(1725, 7, 1).leapYear()).toEqual(false)
    expect(coptic.date(1726, 7, 1).leapYear()).toEqual(false)
    expect(coptic.date(1727, 7, 1).leapYear()).toEqual(true)
    expect(coptic.date(1728, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(coptic.leapYear(1724)).toEqual(false)
    expect(coptic.leapYear(1725)).toEqual(false)
    expect(coptic.leapYear(1726)).toEqual(false)
    expect(coptic.leapYear(1727)).toEqual(true)
    expect(coptic.leapYear(1728)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(coptic.epoch(coptic.date(2022, 1, 2))).toEqual('AM')
    expect(coptic.epoch(coptic.date(33, 1, 2))).toEqual('AM')
    expect(coptic.epoch(coptic.date(-505, 1, 2))).toEqual('BAM')
  })

  it('should return the epoch given a year', () => {
    expect(coptic.epoch(2022)).toEqual('AM')
    expect(coptic.epoch(33)).toEqual('AM')
    expect(coptic.epoch(-505)).toEqual('BAM')
  })

  it('should format the year for a date', () => {
    expect(coptic.formatYear(coptic.date(1724, 1, 2))).toEqual('1724')
    expect(coptic.formatYear(coptic.date(33, 1, 2))).toEqual('0033')
    expect(coptic.formatYear(coptic.date(-505, 1, 2))).toEqual('0505')
  })

  it('should format the year given a year', () => {
    expect(coptic.formatYear(1724)).toEqual('1724')
    expect(coptic.formatYear(33)).toEqual('0033')
    expect(coptic.formatYear(-505)).toEqual('0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(coptic.monthsInYear(coptic.date(1724, 1, 2))).toEqual(13)
    expect(coptic.monthsInYear(coptic.date(33, 1, 2))).toEqual(13)
    expect(coptic.monthsInYear(coptic.date(-505, 1, 2))).toEqual(13)
  })

  it('should return the number of months in the year given a year', () => {
    expect(coptic.monthsInYear(1724)).toEqual(13)
    expect(coptic.monthsInYear(33)).toEqual(13)
    expect(coptic.monthsInYear(-505)).toEqual(13)
  })

  it('should return the month of the year for a date', () => {
    expect(coptic.monthOfYear(coptic.date(1724, 1, 2))).toEqual(1)
    expect(coptic.monthOfYear(coptic.date(1724, 7, 5))).toEqual(7)
    expect(coptic.monthOfYear(coptic.date(1724, 12, 30))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(coptic.monthOfYear(1724, 1)).toEqual(1)
    expect(coptic.monthOfYear(1724, 7)).toEqual(7)
    expect(coptic.monthOfYear(1724, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(coptic.fromMonthOfYear(1724, 1)).toEqual(1)
    expect(coptic.fromMonthOfYear(1724, 7)).toEqual(7)
    expect(coptic.fromMonthOfYear(1724, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(coptic.weekOfYear(coptic.date(1724, 1, 2))).toEqual(52)
    expect(coptic.weekOfYear(coptic.date(1724, 7, 5))).toEqual(26)
    expect(coptic.weekOfYear(coptic.date(1724, 12, 30))).toEqual(51)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(coptic.weekOfYear(1724, 1, 2)).toEqual(52)
    expect(coptic.weekOfYear(1724, 7, 5)).toEqual(26)
    expect(coptic.weekOfYear(1724, 12, 30)).toEqual(51)
  })

  it('should return the days in the year for a date', () => {
    expect(coptic.daysInYear(coptic.date(1724, 1, 2))).toEqual(365)
    expect(coptic.daysInYear(coptic.date(1725, 7, 5))).toEqual(365)
    expect(coptic.daysInYear(coptic.date(1727, 12, 30))).toEqual(366)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(coptic.daysInYear(1724)).toEqual(365)
    expect(coptic.daysInYear(1725)).toEqual(365)
    expect(coptic.daysInYear(1727)).toEqual(366)
  })

  it('should return the day of the year for a date', () => {
    expect(coptic.dayOfYear(coptic.date(1724, 1, 2))).toEqual(2)
    expect(coptic.dayOfYear(coptic.date(1724, 7, 5))).toEqual(185)
    expect(coptic.dayOfYear(coptic.date(1724, 13, 5))).toEqual(365)
    expect(coptic.dayOfYear(coptic.date(1727, 13, 6))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(coptic.dayOfYear(1724, 1, 2)).toEqual(2)
    expect(coptic.dayOfYear(1724, 7, 5)).toEqual(185)
    expect(coptic.dayOfYear(1724, 13, 5)).toEqual(365)
    expect(coptic.dayOfYear(1727, 13, 6)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(coptic.daysInMonth(coptic.date(1724, 1, 2))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1724, 2, 5))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1724, 4, 9))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1724, 13, 5))).toEqual(5)
    expect(coptic.daysInMonth(coptic.date(1727, 1, 2))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1727, 2, 5))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1727, 4, 9))).toEqual(30)
    expect(coptic.daysInMonth(coptic.date(1727, 13, 5))).toEqual(6)
  })

  it('should return the days in the month given a year and month', () => {
    expect(coptic.daysInMonth(1724, 1)).toEqual(30)
    expect(coptic.daysInMonth(1724, 2)).toEqual(30)
    expect(coptic.daysInMonth(1724, 4)).toEqual(30)
    expect(coptic.daysInMonth(1724, 13)).toEqual(5)
    expect(coptic.daysInMonth(1727, 1)).toEqual(30)
    expect(coptic.daysInMonth(1727, 2)).toEqual(30)
    expect(coptic.daysInMonth(1727, 4)).toEqual(30)
    expect(coptic.daysInMonth(1727, 13)).toEqual(6)
  })

  it('should return the number of days in a standard week', () => {
    expect(coptic.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(coptic.dayOfWeek(coptic.date(1726, 2, 5))).toEqual(4)
    expect(coptic.dayOfWeek(coptic.date(1727, 8, 16))).toEqual(0)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(coptic.dayOfWeek(1726, 2, 5)).toEqual(4)
    expect(coptic.dayOfWeek(1727, 8, 16)).toEqual(0)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(coptic.weekDay(coptic.date(1726, 2, 5))).toEqual(true)
    expect(coptic.weekDay(coptic.date(1727, 8, 16))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(coptic.weekDay(1726, 2, 5)).toEqual(true)
    expect(coptic.weekDay(1727, 8, 16)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(coptic.extraInfo(coptic.date(1724, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(coptic.extraInfo(1724, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = coptic.date(1724, 1, 2)
    d = coptic.add(d, 1, 'y')
    checkDate(d, 1725, 1, 2)
    d = coptic.add(d, 2, 'm')
    checkDate(d, 1725, 3, 2)
    d = coptic.add(d, 3, 'd')
    checkDate(d, 1725, 3, 5)
    d = coptic.add(d, -1, 'y')
    d = coptic.add(d, -2, 'm')
    d = coptic.add(d, -3, 'd')
    checkDate(d, 1724, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = coptic.date(1724, 1, 2)
    d = coptic.sub(d, 1, 'y')
    checkDate(d, 1723, 1, 2)
    d = coptic.sub(d, 2, 'm')
    checkDate(d, 1722, 12, 2)
    d = coptic.sub(d, 3, 'd')
    checkDate(d, 1722, 11, 29)
    d = coptic.sub(d, -1, 'y') // 1723/11/29
    d = coptic.sub(d, -2, 'm') // 1723/13/05
    d = coptic.sub(d, -3, 'd')
    checkDate(d, 1724, 1, 3)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = coptic.date(-1, 12, 30)
    d = coptic.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = coptic.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = coptic.add(d, 2, 'm')
    checkDate(d, 1, 1, 30)
    d = coptic.sub(d, 2, 'm')
    checkDate(d, -1, 12, 30)
    d = coptic.add(d, 15, 'd')
    checkDate(d, 1, 1, 10)
    d = coptic.sub(d, 15, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(coptic.date(1726, 2, 5).toJD()).toEqual(2455119.5)
    expect(coptic.date(1727, 8, 16).toJD()).toEqual(2455675.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(coptic.toJD(1726, 2, 5)).toEqual(2455119.5)
    expect(coptic.toJD(1727, 8, 16)).toEqual(2455675.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(coptic.fromJD(2455119.5), 1726, 2, 5)
    checkDate(coptic.fromJD(2455675.5), 1727, 8, 16)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(coptic.date(1726, 2, 5).toJSDate()).toEqual(new Date(2009, 10 - 1, 15))
    expect(coptic.date(1727, 8, 16).toJSDate()).toEqual(new Date(2011, 4 - 1, 24))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(coptic.toJSDate(1726, 2, 5)).toEqual(new Date(2009, 10 - 1, 15))
    expect(coptic.toJSDate(1727, 8, 16)).toEqual(new Date(2011, 4 - 1, 24))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(coptic.fromJSDate(new Date(2009, 10 - 1, 15)), 1726, 2, 5)
    checkDate(coptic.fromJSDate(new Date(2011, 4 - 1, 24)), 1727, 8, 16)
  })
})
