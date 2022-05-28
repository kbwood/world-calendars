import Calendars, { BaseCalendar, CalendarError, CDate } from '../src/Calendars'
import { UmmAlQuraCalendar } from '../src/UmmAlQura'

describe('UmmAlQura calendar', () => {
  const ummalqura = Calendars.instance('ummalqura')
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

  it('should create a UmmAlQura calendar', () => {
    expect(ummalqura).toBeInstanceOf(UmmAlQuraCalendar)
  })

  it('should create a new date', () => {
    const date1 = ummalqura.date(1425, 7, 25)
    const date2 = ummalqura.date(date1)
    const date3 = ummalqura.date()

    checkDate(date1, 1425, 7, 25, ummalqura)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 1443, 5, 29, ummalqura)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { ummalqura.date(1425, 17, 55) }).toThrow(new CalendarError('Invalid Umm al-Qura date'))
    expect(() => { ummalqura.date(1425, 2, 30) }).toThrow(new CalendarError('Invalid Umm al-Qura date'))
    expect(() => { ummalqura.date(1275, 2, 12) }).toThrow(new CalendarError('Invalid Umm al-Qura year'))
    expect(() => { ummalqura.date(1501, 2, 12) }).toThrow(new CalendarError('Invalid Umm al-Qura year'))
  })

  it('should indicate leap years for a date', () => {
    expect(ummalqura.date(1425, 7, 1).leapYear()).toEqual(true)
    expect(ummalqura.date(1426, 7, 1).leapYear()).toEqual(true)
    expect(ummalqura.date(1427, 7, 1).leapYear()).toEqual(false)
    expect(ummalqura.date(1428, 7, 1).leapYear()).toEqual(true)
    expect(ummalqura.date(1429, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(ummalqura.leapYear(1425)).toEqual(true)
    expect(ummalqura.leapYear(1426)).toEqual(true)
    expect(ummalqura.leapYear(1427)).toEqual(false)
    expect(ummalqura.leapYear(1428)).toEqual(true)
    expect(ummalqura.leapYear(1429)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(ummalqura.epoch(ummalqura.date(1425, 1, 2))).toEqual('AH')
    expect(ummalqura.epoch(ummalqura.date(1300, 1, 2))).toEqual('AH')
  })

  it('should return the epoch given a year', () => {
    expect(ummalqura.epoch(1425)).toEqual('AH')
    expect(ummalqura.epoch(1300)).toEqual('AH')
  })

  it('should format the year for a date', () => {
    expect(ummalqura.formatYear(ummalqura.date(1425, 1, 2))).toEqual('1425')
    expect(ummalqura.formatYear(ummalqura.date(1300, 1, 2))).toEqual('1300')
  })

  it('should format the year given a year', () => {
    expect(ummalqura.formatYear(1425)).toEqual('1425')
    expect(ummalqura.formatYear(1300)).toEqual('1300')
  })

  it('should return the number of months in the year for a date', () => {
    expect(ummalqura.monthsInYear(ummalqura.date(1425, 1, 2))).toEqual(12)
    expect(ummalqura.monthsInYear(ummalqura.date(1300, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(ummalqura.monthsInYear(1425)).toEqual(12)
    expect(ummalqura.monthsInYear(1300)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(ummalqura.monthOfYear(ummalqura.date(1425, 1, 2))).toEqual(1)
    expect(ummalqura.monthOfYear(ummalqura.date(1425, 7, 5))).toEqual(7)
    expect(ummalqura.monthOfYear(ummalqura.date(1425, 12, 29))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(ummalqura.monthOfYear(1425, 1)).toEqual(1)
    expect(ummalqura.monthOfYear(1425, 7)).toEqual(7)
    expect(ummalqura.monthOfYear(1425, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(ummalqura.fromMonthOfYear(1425, 1)).toEqual(1)
    expect(ummalqura.fromMonthOfYear(1425, 7)).toEqual(7)
    expect(ummalqura.fromMonthOfYear(1425, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(ummalqura.weekOfYear(ummalqura.date(1425, 1, 2))).toEqual(1)
    expect(ummalqura.weekOfYear(ummalqura.date(1425, 7, 5))).toEqual(26)
    expect(ummalqura.weekOfYear(ummalqura.date(1425, 12, 29))).toEqual(51)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(ummalqura.weekOfYear(1425, 1, 2)).toEqual(1)
    expect(ummalqura.weekOfYear(1425, 7, 5)).toEqual(26)
    expect(ummalqura.weekOfYear(1425, 12, 29)).toEqual(51)
  })

  it('should return the days in the year for a date', () => {
    expect(ummalqura.daysInYear(ummalqura.date(1425, 1, 2))).toEqual(355)
    expect(ummalqura.daysInYear(ummalqura.date(1426, 4, 5))).toEqual(355)
    expect(ummalqura.daysInYear(ummalqura.date(1427, 7, 13))).toEqual(354)
    expect(ummalqura.daysInYear(ummalqura.date(1428, 10, 21))).toEqual(355)
    expect(ummalqura.daysInYear(ummalqura.date(1429, 12, 29))).toEqual(354)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(ummalqura.daysInYear(1425)).toEqual(355)
    expect(ummalqura.daysInYear(1426)).toEqual(355)
    expect(ummalqura.daysInYear(1427)).toEqual(354)
    expect(ummalqura.daysInYear(1428)).toEqual(355)
    expect(ummalqura.daysInYear(1429)).toEqual(354)
  })

  it('should return the day of the year for a date', () => {
    expect(ummalqura.dayOfYear(ummalqura.date(1425, 1, 2))).toEqual(2)
    expect(ummalqura.dayOfYear(ummalqura.date(1425, 7, 5))).toEqual(183)
    expect(ummalqura.dayOfYear(ummalqura.date(1425, 12, 29))).toEqual(355)
    expect(ummalqura.dayOfYear(ummalqura.date(1427, 12, 29))).toEqual(354)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(ummalqura.dayOfYear(1425, 1, 2)).toEqual(2)
    expect(ummalqura.dayOfYear(1425, 7, 5)).toEqual(183)
    expect(ummalqura.dayOfYear(1425, 12, 29)).toEqual(355)
    expect(ummalqura.dayOfYear(1427, 12, 29)).toEqual(354)
  })

  it('should return the days in the month for a date', () => {
    expect(ummalqura.daysInMonth(ummalqura.date(1425, 1, 2))).toEqual(30)
    expect(ummalqura.daysInMonth(ummalqura.date(1425, 2, 5))).toEqual(29)
    expect(ummalqura.daysInMonth(ummalqura.date(1425, 4, 9))).toEqual(30)
    expect(ummalqura.daysInMonth(ummalqura.date(1425, 12, 29))).toEqual(29)
    expect(ummalqura.daysInMonth(ummalqura.date(1426, 1, 2))).toEqual(29)
    expect(ummalqura.daysInMonth(ummalqura.date(1426, 2, 5))).toEqual(30)
    expect(ummalqura.daysInMonth(ummalqura.date(1426, 4, 9))).toEqual(30)
    expect(ummalqura.daysInMonth(ummalqura.date(1426, 12, 30))).toEqual(30)
  })

  it('should return the days in the month given a year and month', () => {
    expect(ummalqura.daysInMonth(1425, 1)).toEqual(30)
    expect(ummalqura.daysInMonth(1425, 2)).toEqual(29)
    expect(ummalqura.daysInMonth(1425, 4)).toEqual(30)
    expect(ummalqura.daysInMonth(1425, 12)).toEqual(29)
    expect(ummalqura.daysInMonth(1426, 1)).toEqual(29)
    expect(ummalqura.daysInMonth(1426, 2)).toEqual(30)
    expect(ummalqura.daysInMonth(1426, 4)).toEqual(30)
    expect(ummalqura.daysInMonth(1426, 12)).toEqual(30)
  })

  it('should return the number of days in a standard week', () => {
    expect(ummalqura.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(ummalqura.dayOfWeek(ummalqura.date(1426, 10, 19))).toEqual(1)
    expect(ummalqura.dayOfWeek(ummalqura.date(1430, 1, 5))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(ummalqura.dayOfWeek(1426, 10, 19)).toEqual(1)
    expect(ummalqura.dayOfWeek(1430, 1, 5)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(ummalqura.weekDay(ummalqura.date(1426, 10, 19))).toEqual(true)
    expect(ummalqura.weekDay(ummalqura.date(1430, 1, 5))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(ummalqura.weekDay(1426, 10, 19)).toEqual(true)
    expect(ummalqura.weekDay(1430, 1, 5)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(ummalqura.extraInfo(ummalqura.date(1425, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(ummalqura.extraInfo(1425, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = ummalqura.date(1425, 1, 2)
    d = ummalqura.add(d, 1, 'y')
    checkDate(d, 1426, 1, 2)
    d = ummalqura.add(d, 2, 'm')
    checkDate(d, 1426, 3, 2)
    d = ummalqura.add(d, 3, 'd')
    checkDate(d, 1426, 3, 5)
    d = ummalqura.add(d, -1, 'y')
    d = ummalqura.add(d, -2, 'm')
    d = ummalqura.add(d, -3, 'd')
    checkDate(d, 1425, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = ummalqura.date(1425, 1, 2)
    d = ummalqura.sub(d, 1, 'y')
    checkDate(d, 1424, 1, 2)
    d = ummalqura.sub(d, 2, 'm')
    checkDate(d, 1423, 11, 2)
    d = ummalqura.sub(d, 3, 'd')
    checkDate(d, 1423, 10, 29)
    d = ummalqura.sub(d, -1, 'y') // 1424/10/29
    d = ummalqura.sub(d, -2, 'm') // 1424/12/29
    d = ummalqura.sub(d, -3, 'd')
    checkDate(d, 1425, 1, 3)
  })

  it('should convert a date to a Julian day number', () => {
    expect(ummalqura.date(1426, 10, 19).toJD()).toEqual(2453695.5)
    expect(ummalqura.date(1430, 1, 5).toJD()).toEqual(2454833.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(ummalqura.toJD(1426, 10, 19)).toEqual(2453695.5)
    expect(ummalqura.toJD(1430, 1, 5)).toEqual(2454833.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(ummalqura.fromJD(2453695.5), 1426, 10, 19)
    checkDate(ummalqura.fromJD(2454833.5), 1430, 1, 5)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(ummalqura.date(1426, 10, 19).toJSDate()).toEqual(new Date(2005, 11 - 1, 21))
    expect(ummalqura.date(1430, 1, 5).toJSDate()).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(ummalqura.toJSDate(1426, 10, 19)).toEqual(new Date(2005, 11 - 1, 21))
    expect(ummalqura.toJSDate(1430, 1, 5)).toEqual(new Date(2009, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(ummalqura.fromJSDate(new Date(2005, 11 - 1, 21)), 1426, 10, 19)
    checkDate(ummalqura.fromJSDate(new Date(2009, 1 - 1, 2)), 1430, 1, 5)
  })
})
