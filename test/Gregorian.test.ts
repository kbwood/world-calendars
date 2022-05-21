import calendars, { BaseCalendar, CDate } from '../src/Calendars'
import { GregorianCalendar } from '../src/Gregorian'
import '../src/l10n/Gregorian-fr'

describe('Gregorian calendar', () => {
  const gregorian = calendars.instance('gregorian')
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

  it('should create a Gregorian calendar', () => {
    expect(gregorian).toBeInstanceOf(GregorianCalendar)
  })

  it('should create a new date', () => {
    const date1 = gregorian.date(2021, 7, 25)
    const date2 = gregorian.date(date1)
    const date3 = gregorian.date()

    checkDate(date1, 2021, 7, 25, gregorian)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
    checkDate(date3, 2022, 1, 2, gregorian)
  })

  it('should not create a new date when invalid', () => {
    expect(() => { gregorian.date(2021, 17, 55) }).toThrow(/Invalid/)
    expect(() => { gregorian.date(2021, 2, 29) }).toThrow(/Invalid/)
    expect(() => { gregorian.date(0, 2, 12) }).toThrow(/Invalid/)
  })

  it('should indicate leap years for a date', () => {
    expect(gregorian.leapYear(gregorian.date(1900, 7, 1))).toEqual(false)
    expect(gregorian.leapYear(gregorian.date(2000, 7, 1))).toEqual(true)
    expect(gregorian.leapYear(gregorian.date(2020, 7, 1))).toEqual(true)
    expect(gregorian.leapYear(gregorian.date(2021, 7, 1))).toEqual(false)
    expect(gregorian.leapYear(gregorian.date(2022, 7, 1))).toEqual(false)
    expect(gregorian.leapYear(gregorian.date(2023, 7, 1))).toEqual(false)
    expect(gregorian.leapYear(gregorian.date(2024, 7, 1))).toEqual(true)
  })

  it('should indicate leap years given a year', () => {
    expect(gregorian.leapYear(1900)).toEqual(false)
    expect(gregorian.leapYear(2000)).toEqual(true)
    expect(gregorian.leapYear(2020)).toEqual(true)
    expect(gregorian.leapYear(2021)).toEqual(false)
    expect(gregorian.leapYear(2022)).toEqual(false)
    expect(gregorian.leapYear(2023)).toEqual(false)
    expect(gregorian.leapYear(2024)).toEqual(true)
  })

  it('should return the epoch for a date', () => {
    expect(gregorian.epoch(gregorian.date(2022, 1, 2))).toEqual('CE')
    expect(gregorian.epoch(gregorian.date(33, 1, 2))).toEqual('CE')
    expect(gregorian.epoch(gregorian.date(-505, 1, 2))).toEqual('BCE')
  })

  it('should return the epoch given a year', () => {
    expect(gregorian.epoch(2022)).toEqual('CE')
    expect(gregorian.epoch(33)).toEqual('CE')
    expect(gregorian.epoch(-505)).toEqual('BCE')
  })

  it('should format the year for a date', () => {
    expect(gregorian.formatYear(gregorian.date(2022, 1, 2))).toEqual('2022')
    expect(gregorian.formatYear(gregorian.date(33, 1, 2))).toEqual('0033')
    expect(gregorian.formatYear(gregorian.date(-505, 1, 2))).toEqual('-0505')
  })

  it('should format the year given a year', () => {
    expect(gregorian.formatYear(2022)).toEqual('2022')
    expect(gregorian.formatYear(33)).toEqual('0033')
    expect(gregorian.formatYear(-505)).toEqual('-0505')
  })

  it('should return the number of months in the year for a date', () => {
    expect(gregorian.monthsInYear(gregorian.date(2022, 1, 2))).toEqual(12)
    expect(gregorian.monthsInYear(gregorian.date(33, 1, 2))).toEqual(12)
    expect(gregorian.monthsInYear(gregorian.date(-505, 1, 2))).toEqual(12)
  })

  it('should return the number of months in the year given a year', () => {
    expect(gregorian.monthsInYear(2022)).toEqual(12)
    expect(gregorian.monthsInYear(33)).toEqual(12)
    expect(gregorian.monthsInYear(-505)).toEqual(12)
  })

  it('should return the month of the year for a date', () => {
    expect(gregorian.monthOfYear(gregorian.date(2022, 1, 2))).toEqual(1)
    expect(gregorian.monthOfYear(gregorian.date(2022, 7, 5))).toEqual(7)
    expect(gregorian.monthOfYear(gregorian.date(2022, 12, 31))).toEqual(12)
  })

  it('should return the month of the year given a year and month', () => {
    expect(gregorian.monthOfYear(2022, 1)).toEqual(1)
    expect(gregorian.monthOfYear(2022, 7)).toEqual(7)
    expect(gregorian.monthOfYear(2022, 12)).toEqual(12)
  })

  it('should return the month from the month of the year', () => {
    expect(gregorian.fromMonthOfYear(2022, 1)).toEqual(1)
    expect(gregorian.fromMonthOfYear(2022, 7)).toEqual(7)
    expect(gregorian.fromMonthOfYear(2022, 12)).toEqual(12)
  })

  it('should return the week of the year for a date', () => {
    expect(gregorian.weekOfYear(gregorian.date(2022, 1, 2))).toEqual(52)
    expect(gregorian.weekOfYear(gregorian.date(2022, 7, 5))).toEqual(27)
    expect(gregorian.weekOfYear(gregorian.date(2022, 12, 31))).toEqual(52)
  })

  it('should return the week of the year given a year, month and day', () => {
    expect(gregorian.weekOfYear(2022, 1, 2)).toEqual(52)
    expect(gregorian.weekOfYear(2022, 7, 5)).toEqual(27)
    expect(gregorian.weekOfYear(2022, 12, 31)).toEqual(52)
  })

  it('should return the days in the year for a date', () => {
    expect(gregorian.daysInYear(gregorian.date(2020, 1, 2))).toEqual(366)
    expect(gregorian.daysInYear(gregorian.date(2021, 7, 5))).toEqual(365)
    expect(gregorian.daysInYear(gregorian.date(2022, 12, 31))).toEqual(365)
  })

  it('should return the days in the year given a year, month and day', () => {
    expect(gregorian.daysInYear(2020)).toEqual(366)
    expect(gregorian.daysInYear(2021)).toEqual(365)
    expect(gregorian.daysInYear(2022)).toEqual(365)
  })

  it('should return the day of the year for a date', () => {
    expect(gregorian.dayOfYear(gregorian.date(2022, 1, 2))).toEqual(2)
    expect(gregorian.dayOfYear(gregorian.date(2022, 7, 5))).toEqual(186)
    expect(gregorian.dayOfYear(gregorian.date(2022, 12, 31))).toEqual(365)
    expect(gregorian.dayOfYear(gregorian.date(2020, 12, 31))).toEqual(366)
  })

  it('should return the day of the year given a year, month and day', () => {
    expect(gregorian.dayOfYear(2022, 1, 2)).toEqual(2)
    expect(gregorian.dayOfYear(2022, 7, 5)).toEqual(186)
    expect(gregorian.dayOfYear(2022, 12, 31)).toEqual(365)
    expect(gregorian.dayOfYear(2020, 12, 31)).toEqual(366)
  })

  it('should return the days in the month for a date', () => {
    expect(gregorian.daysInMonth(gregorian.date(2020, 1, 2))).toEqual(31)
    expect(gregorian.daysInMonth(gregorian.date(2020, 2, 5))).toEqual(29)
    expect(gregorian.daysInMonth(gregorian.date(2020, 4, 9))).toEqual(30)
    expect(gregorian.daysInMonth(gregorian.date(2020, 12, 31))).toEqual(31)
    expect(gregorian.daysInMonth(gregorian.date(2022, 1, 2))).toEqual(31)
    expect(gregorian.daysInMonth(gregorian.date(2022, 2, 5))).toEqual(28)
    expect(gregorian.daysInMonth(gregorian.date(2022, 4, 9))).toEqual(30)
    expect(gregorian.daysInMonth(gregorian.date(2022, 12, 31))).toEqual(31)
  })

  it('should return the days in the month given a year and month', () => {
    expect(gregorian.daysInMonth(2020, 1)).toEqual(31)
    expect(gregorian.daysInMonth(2020, 2)).toEqual(29)
    expect(gregorian.daysInMonth(2020, 4)).toEqual(30)
    expect(gregorian.daysInMonth(2020, 12)).toEqual(31)
    expect(gregorian.daysInMonth(2022, 1)).toEqual(31)
    expect(gregorian.daysInMonth(2022, 2)).toEqual(28)
    expect(gregorian.daysInMonth(2022, 4)).toEqual(30)
    expect(gregorian.daysInMonth(2022, 12)).toEqual(31)
  })

  it('should return the number of days in a standard week', () => {
    expect(gregorian.daysInWeek()).toEqual(7)
  })

  it('should return the day of the week for a date', () => {
    expect(gregorian.dayOfWeek(gregorian.date(2022, 1, 2))).toEqual(0)
    expect(gregorian.dayOfWeek(gregorian.date(2022, 7, 5))).toEqual(2)
    expect(gregorian.dayOfWeek(gregorian.date(2022, 12, 31))).toEqual(6)
  })

  it('should return the day of the week given a year, month and day', () => {
    expect(gregorian.dayOfWeek(2022, 1, 2)).toEqual(0)
    expect(gregorian.dayOfWeek(2022, 7, 5)).toEqual(2)
    expect(gregorian.dayOfWeek(2022, 12, 31)).toEqual(6)
  })

  it('should indicate if the day is a week day for a date', () => {
    expect(gregorian.weekDay(gregorian.date(2022, 1, 2))).toEqual(false)
    expect(gregorian.weekDay(gregorian.date(2022, 7, 5))).toEqual(true)
    expect(gregorian.weekDay(gregorian.date(2022, 12, 31))).toEqual(false)
  })

  it('should indicate if the day is a week day given a year, month and day', () => {
    expect(gregorian.weekDay(2022, 1, 2)).toEqual(false)
    expect(gregorian.weekDay(2022, 7, 5)).toEqual(true)
    expect(gregorian.weekDay(2022, 12, 31)).toEqual(false)
  })

  it('should return extra information for a date', () => {
    expect(gregorian.extraInfo(gregorian.date(2022, 1, 2))).toEqual({})
  })

  it('should return extra information given a year, month and day', () => {
    expect(gregorian.extraInfo(2022, 1, 2)).toEqual({})
  })

  it('should add to a date', () => {
    let d = gregorian.date(2022, 1, 2)
    d = gregorian.add(d, 1, 'y')
    checkDate(d, 2023, 1, 2)
    d = gregorian.add(d, 2, 'm')
    checkDate(d, 2023, 3, 2)
    d = gregorian.add(d, 3, 'w')
    checkDate(d, 2023, 3, 23)
    d = gregorian.add(d, 4, 'd')
    checkDate(d, 2023, 3, 27)
    d = gregorian.add(d, -1, 'y')
    d = gregorian.add(d, -2, 'm')
    d = gregorian.add(d, -3, 'w')
    d = gregorian.add(d, -4, 'd')
    checkDate(d, 2022, 1, 2)
  })

  it('should subtract from a date', () => {
    let d = gregorian.date(2022, 1, 2)
    d = gregorian.sub(d, 1, 'y')
    checkDate(d, 2021, 1, 2)
    d = gregorian.sub(d, 2, 'm')
    checkDate(d, 2020, 11, 2)
    d = gregorian.sub(d, 3, 'd')
    checkDate(d, 2020, 10, 30)
    d = gregorian.sub(d, -1, 'y')
    d = gregorian.sub(d, -2, 'm')
    d = gregorian.sub(d, -3, 'd')
    checkDate(d, 2022, 1, 2)
  })

  it('should add to/subtract from a date between epochs', () => {
    let d = gregorian.date(-1, 12, 30)
    d = gregorian.add(d, 1, 'y')
    checkDate(d, 1, 12, 30)
    d = gregorian.sub(d, 1, 'y')
    checkDate(d, -1, 12, 30)
    d = gregorian.add(d, 2, 'm')
    checkDate(d, 1, 2, 28)
    d = gregorian.sub(d, 2, 'm')
    checkDate(d, -1, 12, 28)
    d = gregorian.add(d, 5, 'd')
    checkDate(d, 1, 1, 2)
    d = gregorian.sub(d, 3, 'd')
    checkDate(d, -1, 12, 30)
  })

  it('should convert a date to a Julian day number', () => {
    expect(gregorian.date(56, 11, 23).toJD()).toEqual(1741840.5)
    expect(gregorian.date(1999, 8, 12).toJD()).toEqual(2451402.5)
    expect(gregorian.date(2022, 1, 2).toJD()).toEqual(2459581.5)
  })

  it('should convert year/month/day to a Julian day number', () => {
    expect(gregorian.toJD(56, 11, 23)).toEqual(1741840.5)
    expect(gregorian.toJD(1999, 8, 12)).toEqual(2451402.5)
    expect(gregorian.toJD(2022, 1, 2)).toEqual(2459581.5)
  })

  it('should convert from a Julian day number', () => {
    checkDate(gregorian.fromJD(1741840.5), 56, 11, 23)
    checkDate(gregorian.fromJD(2451402.5), 1999, 8, 12)
    checkDate(gregorian.fromJD(2459581.5), 2022, 1, 2)
  })

  it('should convert a date to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 23)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(gregorian.date(56, 11, 23).toJSDate()).toEqual(earlyDate)
    expect(gregorian.date(1999, 8, 12).toJSDate()).toEqual(new Date(1999, 8 - 1, 12))
    expect(gregorian.date(2022, 1, 2).toJSDate()).toEqual(new Date(2022, 1 - 1, 2))
  })

  it('should convert year/month/day to a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 23)
    earlyDate.setFullYear(56) // < 100 adds 1900
    expect(gregorian.toJSDate(56, 11, 23)).toEqual(earlyDate)
    expect(gregorian.toJSDate(1999, 8, 12)).toEqual(new Date(1999, 8 - 1, 12))
    expect(gregorian.toJSDate(2022, 1, 2)).toEqual(new Date(2022, 1 - 1, 2))
  })

  it('should convert from a JavaScript date', () => {
    const earlyDate = new Date(56, 11 - 1, 23)
    earlyDate.setFullYear(56) // < 100 adds 1900
    checkDate(gregorian.fromJSDate(earlyDate), 56, 11, 23)
    checkDate(gregorian.fromJSDate(new Date(1999, 8 - 1, 12)), 1999, 8, 12)
    checkDate(gregorian.fromJSDate(new Date(2022, 1 - 1, 2)), 2022, 1, 2)
  })

  describe('Localisations', () => {
    const gregorianDefault = {
      name: 'Gregorian',
      epochs: ['BCE', 'CE'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      digits: undefined,
      dateFormat: 'mm/dd/yyyy',
      firstDay: 0,
      isRTL: false
    }

    it('should return English localisations by default', () => {
      expect(gregorian.local).toEqual(gregorianDefault)
    })

    it('should return French localisations when requested', () => {
      expect(calendars.instance('gregorian', 'fr').local).toEqual({
        name: 'Gregorian',
        epochs: ['BCE', 'CE'],
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
          'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        digits: undefined,
        dateFormat: 'dd/mm/yyyy',
        firstDay: 1,
        isRTL: false
      })
    })

    it('should return English localisations for an unknown language', () => {
      expect(calendars.instance('gregorian', 'xx').local).toEqual(gregorianDefault)
    })
  })
})
