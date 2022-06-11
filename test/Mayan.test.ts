import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { MayanCalendar } from '../src/Mayan'

describe('Mayan calendar', () => {
  const mayan = Calendars.instance('mayan') as MayanCalendar
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

  it('should create a Mayan calendar', () => {
    expect(mayan).toBeInstanceOf(MayanCalendar)
  })

  it('should create a new date', () => {
    const date1 = mayan.date(5195, 7, 15)
    const date2 = mayan.date(date1)
    const date3 = mayan.date()

    checkDate(date1, 5195, 7, 15, mayan)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, mayan.forYear('13.0.9'), 2, 19, mayan)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { mayan.date(5195, 17, 55) }).toThrow(new CalendarError('Invalid Mayan date'))
    expect(() => { mayan.date(5195, 19, 2) }).toThrow(new CalendarError('Invalid Mayan date'))
    expect(() => { mayan.date(5195, 2, 21) }).toThrow(new CalendarError('Invalid Mayan date'))
  })

  it('should indicate leap years for a date', () => {
    expect(mayan.date(5195, 7, 1).leapYear()).toEqual(false)
    expect(mayan.date(5196, 7, 1).leapYear()).toEqual(false)
    expect(mayan.date(5197, 7, 1).leapYear()).toEqual(false)
    expect(mayan.date(5198, 7, 1).leapYear()).toEqual(false)
    expect(mayan.date(5199, 7, 1).leapYear()).toEqual(false)
  })

  it('should indicate leap years given a year', () => {
    expect(mayan.leapYear(5195)).toEqual(false)
    expect(mayan.leapYear(5196)).toEqual(false)
    expect(mayan.leapYear(5197)).toEqual(false)
    expect(mayan.leapYear(5198)).toEqual(false)
    expect(mayan.leapYear(5199)).toEqual(false)
  })

  it('should return the epoch for a date', () => {
    expect(mayan.epoch(mayan.date(5195, 1, 2))).toEqual('')
    expect(mayan.epoch(mayan.date(33, 1, 2))).toEqual('')
    expect(mayan.epoch(mayan.date(-505, 1, 2))).toEqual('')
  })

  it('should return the epoch given a year', () => {
    expect(mayan.epoch(5195)).toEqual('')
    expect(mayan.epoch(33)).toEqual('')
    expect(mayan.epoch(-505)).toEqual('')
  })

  it('should format the year for a date', () => {
    expect(mayan.formatYear(mayan.date(5195, 1, 2))).toEqual('12.19.15')
    expect(mayan.formatYear(mayan.date(5198, 1, 2))).toEqual('12.19.18')
    expect(mayan.formatYear(mayan.date(4188, 1, 2))).toEqual('10.9.8')
    expect(mayan.formatYear(mayan.date(64, 1, 2))).toEqual('0.3.4')
    expect(mayan.formatYear(mayan.date(0, 1, 2))).toEqual('0.0.0')
  })

  it('should format the year given a year', () => {
    expect(mayan.formatYear(5195)).toEqual('12.19.15')
    expect(mayan.formatYear(5198)).toEqual('12.19.18')
    expect(mayan.formatYear(4188)).toEqual('10.9.8')
    expect(mayan.formatYear(64)).toEqual('0.3.4')
    expect(mayan.formatYear(0)).toEqual('0.0.0')
  })

  it('should convert a formatted year back to a number', () => {
    expect(mayan.forYear('12.19.15')).toEqual(5195)
    expect(mayan.forYear('12.19.18')).toEqual(5198)
    expect(mayan.forYear('10.9.8')).toEqual(4188)
    expect(mayan.forYear('0.3.4')).toEqual(64)
    expect(mayan.forYear('0.0.0')).toEqual(0)
  })

  it('should return the number of months in the year for a date', () => {
    expect(mayan.monthsInYear(mayan.date(5195, 1, 2))).toEqual(18)
    expect(mayan.monthsInYear(mayan.date(33, 1, 2))).toEqual(18)
    expect(mayan.monthsInYear(mayan.date(-505, 1, 2))).toEqual(18)
  })

  it('should return the number of months in the year given a year', () => {
    expect(mayan.monthsInYear(5195)).toEqual(18)
    expect(mayan.monthsInYear(33)).toEqual(18)
    expect(mayan.monthsInYear(-505)).toEqual(18)
  })

  it('should return the month of the year for a date', () => {
    expect(mayan.monthOfYear(mayan.date(5195, 1, 2))).toEqual(1)
    expect(mayan.monthOfYear(mayan.date(5195, 7, 5))).toEqual(7)
    expect(mayan.monthOfYear(mayan.date(5195, 12, 13))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(mayan.monthOfYear(5195, 1)).toEqual(1)
    expect(mayan.monthOfYear(5195, 7)).toEqual(7)
    expect(mayan.monthOfYear(5195, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(mayan.fromMonthOfYear(5195, 1)).toEqual(1)
    expect(mayan.fromMonthOfYear(5195, 7)).toEqual(7)
    expect(mayan.fromMonthOfYear(5195, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(mayan.weekOfYear(mayan.date(5195, 1, 2))).toEqual(0)
    expect(mayan.weekOfYear(mayan.date(5195, 7, 5))).toEqual(0)
    expect(mayan.weekOfYear(mayan.date(5195, 12, 13))).toEqual(0)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(mayan.weekOfYear(5195, 1, 2)).toEqual(0)
    expect(mayan.weekOfYear(5195, 7, 5)).toEqual(0)
    expect(mayan.weekOfYear(5195, 12, 13)).toEqual(0)
  })

  it('should return the days in the year for a date', () => {
    expect(mayan.daysInYear(mayan.date(5195, 1, 2))).toEqual(360)
    expect(mayan.daysInYear(mayan.date(5196, 7, 5))).toEqual(360)
    expect(mayan.daysInYear(mayan.date(5197, 12, 13))).toEqual(360)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(mayan.daysInYear(5195)).toEqual(360)
    expect(mayan.daysInYear(5196)).toEqual(360)
    expect(mayan.daysInYear(5197)).toEqual(360)
  })

  it('should return the day of the year for a date', () => {
    expect(mayan.dayOfYear(mayan.date(5195, 1, 2))).toEqual(23)
    expect(mayan.dayOfYear(mayan.date(5195, 7, 5))).toEqual(146)
    expect(mayan.dayOfYear(mayan.date(5195, 12, 13))).toEqual(254)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(mayan.dayOfYear(5195, 1, 2)).toEqual(23)
    expect(mayan.dayOfYear(5195, 7, 5)).toEqual(146)
    expect(mayan.dayOfYear(5195, 12, 13)).toEqual(254)
  })

  it('should return the days in the month for a date', () => {
    expect(mayan.daysInMonth(mayan.date(5195, 1, 2))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5195, 2, 5))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5195, 4, 9))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5195, 12, 13))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5196, 1, 2))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5196, 2, 5))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5196, 4, 9))).toEqual(20)
    expect(mayan.daysInMonth(mayan.date(5196, 12, 13))).toEqual(20)
  })

  it('should return the days in the month given a year and month', () => {
    expect(mayan.daysInMonth(5195, 1)).toEqual(20)
    expect(mayan.daysInMonth(5195, 2)).toEqual(20)
    expect(mayan.daysInMonth(5195, 4)).toEqual(20)
    expect(mayan.daysInMonth(5195, 12)).toEqual(20)
    expect(mayan.daysInMonth(5196, 1)).toEqual(20)
    expect(mayan.daysInMonth(5196, 2)).toEqual(20)
    expect(mayan.daysInMonth(5196, 4)).toEqual(20)
    expect(mayan.daysInMonth(5196, 12)).toEqual(20)
  })

  it('should return the number of days in a standard week', () => {
    expect(mayan.daysInWeek()).toEqual(5)
  })

  it('should return the day of the week for a date', () => {
    expect(mayan.dayOfWeek(mayan.date(5195, 1, 2))).toEqual(2)
    expect(mayan.dayOfWeek(mayan.date(5195, 7, 5))).toEqual(5)
    expect(mayan.dayOfWeek(mayan.date(5195, 12, 13))).toEqual(13)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(mayan.dayOfWeek(5195, 1, 2)).toEqual(2)
    expect(mayan.dayOfWeek(5195, 7, 5)).toEqual(5)
    expect(mayan.dayOfWeek(5195, 12, 13)).toEqual(13)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(mayan.weekDay(mayan.date(5195, 1, 2))).toEqual(true)
    expect(mayan.weekDay(mayan.date(5195, 7, 5))).toEqual(true)
    expect(mayan.weekDay(mayan.date(5195, 12, 13))).toEqual(true)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(mayan.weekDay(5195, 1, 2)).toEqual(true)
    expect(mayan.weekDay(5195, 7, 5)).toEqual(true)
    expect(mayan.weekDay(5195, 12, 13)).toEqual(true)
  })

  it('should return extra information for a date', () => {
    expect(mayan.extraInfo(mayan.date(5195, 1, 5))).toEqual({
      haabDay: 13,
      haabMonth: 16,
      haabMonthName: 'Pax',
      tzolkinDay: 5,
      tzolkinDayName: 'Chicchan',
      tzolkinTrecena: 10
    })
    expect(mayan.extraInfo(mayan.date(5198, 17, 19))).toEqual({
      haabDay: 7,
      haabMonth: 14,
      haabMonthName: 'Kankin',
      tzolkinDay: 19,
      tzolkinDayName: 'Cauac',
      tzolkinTrecena: 7
    })
  })

  it('should return extra information given a year, month and day', () => {
    expect(mayan.extraInfo(5195, 1, 5)).toEqual({
      haabDay: 13,
      haabMonth: 16,
      haabMonthName: 'Pax',
      tzolkinDay: 5,
      tzolkinDayName: 'Chicchan',
      tzolkinTrecena: 10
    })
    expect(mayan.extraInfo(5198, 17, 19)).toEqual({
      haabDay: 7,
      haabMonth: 14,
      haabMonthName: 'Kankin',
      tzolkinDay: 19,
      tzolkinDayName: 'Cauac',
      tzolkinTrecena: 7
    })
  })

  it('should add to a date', () => {
    let d = mayan.date(5195, 1, 2)
    d = mayan.add(d, 1, 'y')
    checkDate(d, 5196, 1, 2)
    d = mayan.add(d, 2, 'm')
    checkDate(d, 5196, 3, 2)
    d = mayan.add(d, 3, 'd')
    checkDate(d, 5196, 3, 5)
    d = mayan.add(d, -1, 'y')
    d = mayan.add(d, -2, 'm')
    d = mayan.add(d, -3, 'd')
    checkDate(d, 5195, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = mayan.date(5196, 1, 2)
    d = mayan.sub(d, 1, 'y')
    checkDate(d, 5195, 1, 2)
    d = mayan.sub(d, 2, 'm')
    checkDate(d, 5194, 17, 2)
    d = mayan.sub(d, 3, 'd')
    checkDate(d, 5194, 16, 19)
    d = mayan.sub(d, -1, 'y')
    d = mayan.sub(d, -2, 'm')
    d = mayan.sub(d, -3, 'd')
    checkDate(d, 5196, 1, 2)
  })

  it('should convert a date to a Julian day number', () => {
    expect(mayan.date(5195, 1, 5).toJD()).toEqual(2454507.5)
    expect(mayan.date(5198, 17, 19).toJD()).toEqual(2455921.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(mayan.toJD(5195, 1, 5)).toEqual(2454507.5)
    expect(mayan.toJD(5198, 17, 19)).toEqual(2455921.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(mayan.fromJD(2454507.5), 5195, 1, 5)
    checkDate(mayan.fromJD(2455921.5), 5198, 17, 19)
  })

  it('should convert a date to a JavaScript date', () => {
    expect(mayan.date(5195, 1, 5).toJSDate()).toEqual(new Date(2008, 2 - 1, 11))
    expect(mayan.date(5198, 17, 19).toJSDate()).toEqual(new Date(2011, 12 - 1, 26))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    expect(mayan.toJSDate(5195, 1, 5)).toEqual(new Date(2008, 2 - 1, 11))
    expect(mayan.toJSDate(5198, 17, 19)).toEqual(new Date(2011, 12 - 1, 26))
  })

  it('should convert from a JavaScript date', () => {
    checkDate(mayan.fromJSDate(new Date(2008, 2 - 1, 11)), 5195, 1, 5)
    checkDate(mayan.fromJSDate(new Date(2011, 12 - 1, 26)), 5198, 17, 19)
  })
})
