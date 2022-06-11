import calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import '../src/Gregorian'

describe('CDate', () => {
  const cal = calendars.instance() // Gregorian
  const d1 = new CDate(cal, 2020, 7, 2)
  const d2 = new CDate(cal, 2021, 9, 4)

  const checkDate = (date: CDate, year: number, month: number, day: number, cal?: CalendarBase) => {
    expect(date.year()).toEqual(year)
    expect(date.month()).toEqual(month)
    expect(date.day()).toEqual(day)
    if (cal) {
      expect(date.calendar()).toBe(cal)
    }
  }

  it('should construct a new date', () => {
    const d3 = new CDate(cal, 2022, 3, 4)
    checkDate(d3, 2022, 3, 4)
    const d4 = new CDate(cal, d3)
    checkDate(d4, 2022, 3, 4)
    expect(d4).not.toBe(d3)
  })

  it('should not construct an invalid date', () => {
    expect(() => { new CDate(cal, 2022, 33, 44) }).toThrow(new CalendarError('Invalid Gregorian date')) // eslint-disable-line no-new
    expect(() => { new CDate(cal, 2022, 2, 29) }).toThrow(new CalendarError('Invalid Gregorian date')) // eslint-disable-line no-new
  })

  it('should create a new date', () => {
    const d3 = d1.date(2022, 3, 4)
    checkDate(d3, 2022, 3, 4, cal)
    expect(d3).not.toBe(d1)
    const d4 = d1.date()
    checkDate(d4, 2020, 7, 2, cal)
    expect(d4).not.toBe(d1)
  })

  it('should not create an invalid date', () => {
    expect(() => { d1.date(2022, 33, 44) }).toThrow(new CalendarError('Invalid Gregorian date'))
    expect(() => { d1.date(2022, 2, 29) }).toThrow(new CalendarError('Invalid Gregorian date'))
  })

  it('should return its calendar', () => {
    expect(d1.calendar()).toBe(cal)
  })

  it('should provide details for a date', () => {
    checkDate(d1, 2020, 7, 2)
    checkDate(d2, 2021, 9, 4)
  })

  it('should provide the epoch for a date', () => {
    expect(d1.epoch()).toEqual('CE')
    expect(d2.epoch()).toEqual('CE')
  })

  it('should format the year for a date', () => {
    expect(d1.formatYear()).toEqual('2020')
    expect(d2.formatYear()).toEqual('2021')
  })

  it('should identify a date in a leap year', () => {
    expect(d1.leapYear()).toEqual(true)
    expect(d2.leapYear()).toEqual(false)
  })

  it('should provide the month of the year for a date', () => {
    expect(d1.monthOfYear()).toEqual(7)
    expect(d2.monthOfYear()).toEqual(9)
  })

  it('should provide the week of the year for a date', () => {
    expect(d1.weekOfYear()).toEqual(27)
    expect(d2.weekOfYear()).toEqual(35)
  })

  it('should identify the day of the year for a date', () => {
    expect(d1.dayOfYear()).toEqual(184)
    expect(d2.dayOfYear()).toEqual(247)
  })

  it('should identify the day of the week for a date', () => {
    expect(d1.dayOfWeek()).toEqual(4)
    expect(d2.dayOfWeek()).toEqual(6)
  })

  it('should identify whether a date is a week day', () => {
    expect(d1.weekDay()).toEqual(true)
    expect(d2.weekDay()).toEqual(false)
  })

  it('should provide extra information about a date', () => {
    expect(d1.extraInfo()).toEqual({})
    expect(d2.extraInfo()).toEqual({})
  })

  it('should provide days in the year', () => {
    expect(d1.daysInYear()).toEqual(366)
    expect(d2.daysInYear()).toEqual(365)
  })

  it('should provide days in the month', () => {
    expect(d1.daysInMonth()).toEqual(31)
    expect(d2.daysInMonth()).toEqual(30)
  })

  it('should add to a date', () => {
    let d3 = new CDate(cal, 2022, 1, 2)
    d3 = d3.add(1, 'y')
    checkDate(d3, 2023, 1, 2)
    d3 = d3.add(2, 'm')
    checkDate(d3, 2023, 3, 2)
    d3 = d3.add(3, 'd')
    checkDate(d3, 2023, 3, 5)
    const d4 = d3.add(-1, 'y').add(-2, 'm').add(-3, 'd')
    checkDate(d3, 2023, 3, 5)
    checkDate(d4, 2022, 1, 2)
  })

  it('should subtract from a date', () => {
    let d3 = new CDate(cal, 2022, 1, 2)
    d3 = d3.sub(1, 'y')
    checkDate(d3, 2021, 1, 2)
    d3 = d3.sub(2, 'm')
    checkDate(d3, 2020, 11, 2)
    d3 = d3.sub(3, 'd')
    checkDate(d3, 2020, 10, 30)
    const d4 = d3.sub(-1, 'y').sub(-2, 'm').sub(-3, 'd')
    checkDate(d3, 2020, 10, 30)
    checkDate(d4, 2022, 1, 2)
  })

  it('should set individual date parts', () => {
    let d3 = new CDate(cal, 2022, 7, 1)
    d3 = d3.year(2021)
    checkDate(d3, 2021, 7, 1)
    d3 = d3.month(3)
    checkDate(d3, 2021, 3, 1)
    d3 = d3.day(20)
    checkDate(d3, 2021, 3, 20)
    const d4 = d3.year(2020).month(5).day(11)
    checkDate(d3, 2021, 3, 20)
    checkDate(d4, 2020, 5, 11)
  })

  it('should set named date parts', () => {
    const d3 = new CDate(cal, 2022, 7, 1)
    let d4 = d3.set(2018, 'y').set(11, 'm')
    checkDate(d3, 2022, 7, 1)
    checkDate(d4, 2018, 11, 1)
    d4 = d4.set(2, 'm').set(23, 'd')
    checkDate(d4, 2018, 2, 23)
  })

  it('should compare two dates', () => {
    const d3 = new CDate(cal, 2020, 8, 2)
    const d4 = new CDate(cal, 2020, 7, 5)

    expect(d1.compareTo(d2)).toEqual(-1)
    expect(d2.compareTo(d1)).toEqual(+1)
    expect(d1.compareTo(d1)).toEqual(0)
    expect(d1.compareTo(d3)).toEqual(-1)
    expect(d3.compareTo(d1)).toEqual(+1)
    expect(d1.compareTo(d4)).toEqual(-1)
    expect(d4.compareTo(d1)).toEqual(+1)
  })

  it('should convert a date to a Julian day number', () => {
    expect(d1.toJD()).toEqual(cal.toJD(d1))
    expect(d2.toJD()).toEqual(cal.toJD(d2))
  })

  it('should convert a Julian day number to a date', () => {
    const d3 = d1.fromJD(2459581.5)

    expect(d3).toEqual(cal.fromJD(2459581.5))
    expect(d3).not.toBe(d1)
  })

  it('should convert a date to a JavaScript Date', () => {
    expect(d1.toJSDate()).toEqual(new Date(2020, 7 - 1, 2))
    expect(d2.toJSDate()).toEqual(new Date(2021, 9 - 1, 4))
  })

  it('should convert a JavaScript Date to a date', () => {
    const d3 = d1.fromJSDate(new Date(2022, 1 - 1, 2))
    checkDate(d3, 2022, 1, 2)
    expect(d3).not.toBe(d1)
  })

  it('should format a date for debugging', () => {
    expect(d1.toString()).toEqual('2020-07-02 (Gregorian)')
    expect(d2.toString()).toEqual('2021-09-04 (Gregorian)')
  })
})
