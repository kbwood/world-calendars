import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { JulianCalendar } from '../src/Julian'

describe('Julian calendar', () => {
  const julian = Calendars.instance('julian')
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

  it('should create a Julian calendar', () => {
    expect(julian).toBeInstanceOf(JulianCalendar)
  })

  it('should create a new date', () => {
    const date1 = julian.date(2021, 7, 25)
    const date2 = julian.date(date1)
    const date3 = julian.date()

    checkDate(date1, 2021, 7, 25, julian)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 2021, 12, 20, julian)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { julian.date(2021, 17, 55) }).toThrow(new CalendarError('Invalid Julian date'))
    expect(() => { julian.date(2021, 2, 29) }).toThrow(new CalendarError('Invalid Julian date'))
    expect(() => { julian.date(0, 2, 12) }).toThrow(new CalendarError('Invalid Julian date'))
  })

  it('should indicate leap years for a date', () => {
    expect(julian.date(1900, 7, 1).leapYear()).toEqual(true)
    expect(julian.date(2000, 7, 1).leapYear()).toEqual(true)
    expect(julian.date(2020, 7, 1).leapYear()).toEqual(true)
    expect(julian.date(2021, 7, 1).leapYear()).toEqual(false)
    expect(julian.date(2022, 7, 1).leapYear()).toEqual(false)
    expect(julian.date(2023, 7, 1).leapYear()).toEqual(false)
    expect(julian.date(2024, 7, 1).leapYear()).toEqual(true)
  })

  it('should indicate leap years given a year', () => {
    expect(julian.leapYear(1900)).toEqual(true)
    expect(julian.leapYear(2000)).toEqual(true)
    expect(julian.leapYear(2020)).toEqual(true)
    expect(julian.leapYear(2021)).toEqual(false)
    expect(julian.leapYear(2022)).toEqual(false)
    expect(julian.leapYear(2023)).toEqual(false)
    expect(julian.leapYear(2024)).toEqual(true)
  })

  it('should return the epoch for a date', () => {
    expect(julian.epoch(julian.date(2022, 1, 2))).toEqual('AD')
    expect(julian.epoch(julian.date(33, 1, 2))).toEqual('AD')
    expect(julian.epoch(julian.date(-505, 1, 2))).toEqual('BC')
  })

  it('should return the epoch given a year', () => {
    expect(julian.epoch(2022)).toEqual('AD')
    expect(julian.epoch(33)).toEqual('AD')
    expect(julian.epoch(-505)).toEqual('BC')
  })

  it('should format the year for a date', () => {
    expect(julian.formatYear(julian.date(2022, 1, 2))).toEqual('2022')
    expect(julian.formatYear(julian.date(33, 1, 2))).toEqual('0033')
    expect(julian.formatYear(julian.date(-505, 1, 2))).toEqual('0505')
  })

  it('should format the year given a year', () => {
    expect(julian.formatYear(2022)).toEqual('2022')
    expect(julian.formatYear(33)).toEqual('0033')
    expect(julian.formatYear(-505)).toEqual('0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(julian.monthsInYear(julian.date(2022, 1, 2))).toEqual(12)
    expect(julian.monthsInYear(julian.date(33, 1, 2))).toEqual(12)
    expect(julian.monthsInYear(julian.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(julian.monthsInYear(2022)).toEqual(12)
    expect(julian.monthsInYear(33)).toEqual(12)
    expect(julian.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(julian.monthOfYear(julian.date(2022, 1, 2))).toEqual(1)
    expect(julian.monthOfYear(julian.date(2022, 7, 5))).toEqual(7)
    expect(julian.monthOfYear(julian.date(2022, 12, 31))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(julian.monthOfYear(2022, 1)).toEqual(1)
    expect(julian.monthOfYear(2022, 7)).toEqual(7)
    expect(julian.monthOfYear(2022, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(julian.fromMonthOfYear(2022, 1)).toEqual(1)
    expect(julian.fromMonthOfYear(2022, 7)).toEqual(7)
    expect(julian.fromMonthOfYear(2022, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(julian.weekOfYear(julian.date(2022, 1, 2))).toEqual(53)
    expect(julian.weekOfYear(julian.date(2022, 7, 5))).toEqual(27)
    expect(julian.weekOfYear(julian.date(2022, 12, 31))).toEqual(52)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(julian.weekOfYear(2022, 1, 2)).toEqual(53)
    expect(julian.weekOfYear(2022, 7, 5)).toEqual(27)
    expect(julian.weekOfYear(2022, 12, 31)).toEqual(52)
  })

  it('should return the days in the year for a date', () => {
    expect(julian.daysInYear(julian.date(2020, 1, 2))).toEqual(366)
    expect(julian.daysInYear(julian.date(2021, 7, 5))).toEqual(365)
    expect(julian.daysInYear(julian.date(2022, 12, 31))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(julian.daysInYear(2020)).toEqual(366)
    expect(julian.daysInYear(2021)).toEqual(365)
    expect(julian.daysInYear(2022)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(julian.dayOfYear(julian.date(2022, 1, 2))).toEqual(2)
    expect(julian.dayOfYear(julian.date(2022, 7, 5))).toEqual(186)
    expect(julian.dayOfYear(julian.date(2022, 12, 31))).toEqual(365)
    expect(julian.dayOfYear(julian.date(2020, 12, 31))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(julian.dayOfYear(2022, 1, 2)).toEqual(2)
    expect(julian.dayOfYear(2022, 7, 5)).toEqual(186)
    expect(julian.dayOfYear(2022, 12, 31)).toEqual(365)
    expect(julian.dayOfYear(2020, 12, 31)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(julian.daysInMonth(julian.date(2020, 1, 2))).toEqual(31)
    expect(julian.daysInMonth(julian.date(2020, 2, 5))).toEqual(29)
    expect(julian.daysInMonth(julian.date(2020, 4, 9))).toEqual(30)
    expect(julian.daysInMonth(julian.date(2020, 12, 31))).toEqual(31)
    expect(julian.daysInMonth(julian.date(2022, 1, 2))).toEqual(31)
    expect(julian.daysInMonth(julian.date(2022, 2, 5))).toEqual(28)
    expect(julian.daysInMonth(julian.date(2022, 4, 9))).toEqual(30)
    expect(julian.daysInMonth(julian.date(2022, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(julian.daysInMonth(2020, 1)).toEqual(31)
    expect(julian.daysInMonth(2020, 2)).toEqual(29)
    expect(julian.daysInMonth(2020, 4)).toEqual(30)
    expect(julian.daysInMonth(2020, 12)).toEqual(31)
    expect(julian.daysInMonth(2022, 1)).toEqual(31)
    expect(julian.daysInMonth(2022, 2)).toEqual(28)
    expect(julian.daysInMonth(2022, 4)).toEqual(30)
    expect(julian.daysInMonth(2022, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(julian.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(julian.dayOfWeek(julian.date(2022, 1, 2))).toEqual(6)
    expect(julian.dayOfWeek(julian.date(2022, 7, 5))).toEqual(1)
    expect(julian.dayOfWeek(julian.date(2022, 12, 31))).toEqual(5)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(julian.dayOfWeek(2022, 1, 2)).toEqual(6)
    expect(julian.dayOfWeek(2022, 7, 5)).toEqual(1)
    expect(julian.dayOfWeek(2022, 12, 31)).toEqual(5)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(julian.weekDay(julian.date(2022, 1, 2))).toEqual(false)
    expect(julian.weekDay(julian.date(2022, 7, 5))).toEqual(true)
    expect(julian.weekDay(julian.date(2022, 12, 31))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(julian.weekDay(2022, 1, 2)).toEqual(false)
    expect(julian.weekDay(2022, 7, 5)).toEqual(true)
    expect(julian.weekDay(2022, 12, 31)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(julian.extraInfo(julian.date(2022, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(julian.extraInfo(2022, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = julian.date(2022, 1, 2)
    d = julian.add(d, 1, 'y')
    checkDate(d, 2023, 1, 2)
    d = julian.add(d, 2, 'm')
    checkDate(d, 2023, 3, 2)
    d = julian.add(d, 3, 'd')
    checkDate(d, 2023, 3, 5)
    d = julian.add(d, -1, 'y')
    d = julian.add(d, -2, 'm')
    d = julian.add(d, -3, 'd')
    checkDate(d, 2022, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = julian.date(2022, 1, 2)
    d = julian.sub(d, 1, 'y')
    checkDate(d, 2021, 1, 2)
    d = julian.sub(d, 2, 'm')
    checkDate(d, 2020, 11, 2)
    d = julian.sub(d, 3, 'd')
    checkDate(d, 2020, 10, 30)
    d = julian.sub(d, -1, 'y')
    d = julian.sub(d, -2, 'm')
    d = julian.sub(d, -3, 'd')
    checkDate(d, 2022, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = julian.date(-1, 12, 30)
    d = julian.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = julian.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = julian.add(d, 2, 'm')
    checkDate(d, 1, 2, 28)
    d = julian.sub(d, 2, 'm')
    checkDate(d, -1, 12, 28)
    d = julian.add(d, 5, 'd')
    checkDate(d, 1, 1, 2)
    d = julian.sub(d, 3, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(julian.date(56, 11, 23).toJD()).toEqual(1741838.5)
    expect(julian.date(1999, 8, 12).toJD()).toEqual(2451415.5)
    expect(julian.date(2022, 1, 2).toJD()).toEqual(2459594.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(julian.toJD(56, 11, 23)).toEqual(1741838.5)
    expect(julian.toJD(1999, 8, 12)).toEqual(2451415.5)
    expect(julian.toJD(2022, 1, 2)).toEqual(2459594.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(julian.fromJD(1741838.5), 56, 11, 23)
    checkDate(julian.fromJD(2451415.5), 1999, 8, 12)
    checkDate(julian.fromJD(2459594.5), 2022, 1, 2)
  })

  it('should convert a date to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(julian.date(56, 11, 23).toJSDate()).toEqual(earlyDate)
    expect(julian.date(1999, 8, 12).toJSDate()).toEqual(new Date(1999, 8 - 1, 25))
    expect(julian.date(2022, 1, 2).toJSDate()).toEqual(new Date(2022, 1 - 1, 15))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(julian.toJSDate(56, 11, 23)).toEqual(earlyDate)
    expect(julian.toJSDate(1999, 8, 12)).toEqual(new Date(1999, 8 - 1, 25))
    expect(julian.toJSDate(2022, 1, 2)).toEqual(new Date(2022, 1 - 1, 15))
  })

  it('should convert from a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 21)
    earlyDate.setFullYear(56) // < 100 adds 1900
    checkDate(julian.fromJSDate(earlyDate), 56, 11, 23)
    checkDate(julian.fromJSDate(new Date(1999, 8 - 1, 25)), 1999, 8, 12)
    checkDate(julian.fromJSDate(new Date(2022, 1 - 1, 15)), 2022, 1, 2)
  })
})
