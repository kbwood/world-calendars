import Calendars, { CalendarBase, CalendarError, CDate } from '../src/Calendars'
import { GregorianCalendar } from '../src/Gregorian'
import type { CalendarLocalisation } from '../src/Calendars'

describe('Calendars manager', () => {
  it('should create a default calendar', () => {
    expect(Calendars.instance()).toBeInstanceOf(GregorianCalendar)
  })

  it('should not create an unknown calendar', () => {
    expect(() => { Calendars.instance('unknown') }).toThrow(new CalendarError('Calendar unknown not found'))
  })

  it('should create a new date', () => {
    const date1 = Calendars.date(2022, 1, 2)
    const date2 = Calendars.date(date1)

    expect(date1.calendar()).toBeInstanceOf(GregorianCalendar)
    expect(date1.year()).toEqual(2022)
    expect(date1.month()).toEqual(1)
    expect(date1.day()).toEqual(2)
    expect(date2).toEqual(date1)
    expect(date2).not.toBe(date1)
  })

  it('should register a new calendar and return it', () => {
    const defaultRegionalOptions: CalendarLocalisation = {
      name: 'New Cal',
      epochs: ['Before', 'After'],
      monthNames: ['Month1', 'Month2'],
      monthNamesShort: ['M1', 'M2'],
      dayNames: ['Day1', 'Day2'],
      dayNamesShort: ['Dy1', 'Dy2'],
      dayNamesMin: ['D1', 'D2'],
      digits: undefined,
      dateFormat: 'mm/dd/yyyy',
      firstDay: 0,
      isRTL: false
    }
    class NewCal extends CalendarBase {
      constructor () { super('new-cal', 1720000.5, defaultRegionalOptions, [30]) }
      daysInMonth (): number { return 30 }
      fromJD (): CDate { return new CDate(this, 1, 1, 1) }
      leapYear (): boolean { return false }
      toJD (): number { return 0 }
      weekDay (): boolean { return true }
      weekOfYear (): number { return 1 }
    };
    Calendars.register('new-cal', NewCal)
    const newCal = Calendars.instance('new-cal')

    expect(newCal).toBeInstanceOf(NewCal)
    expect(newCal.local).toEqual(defaultRegionalOptions)
    expect(Calendars.instance().local).not.toEqual(defaultRegionalOptions)

    expect(() => { Calendars.register('new-cal', NewCal) }).toThrow(new CalendarError('Calendar already registered: new-cal'))
  })

  describe('substituteDigits', () => {
    it('should convert a number', () => {
      const alphaSub = Calendars.substituteDigits('ADEFHINPRT'.split(''))
      const gujaratiSub = Calendars.substituteDigits(['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'])

      expect(alphaSub('7094356128')).toEqual('PATHFINDER')
      expect(gujaratiSub('7094356128')).toEqual('૭૦૯૪૩૫૬૧૨૮')
    })
  })

  describe('substituteChineseDigits', () => {
    it('should convert a number', () => {
      const chinaSub = Calendars.substituteChineseDigits(
        ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'], ['', '十', '百', '千'])

      expect(chinaSub('0')).toEqual('〇')
      expect(chinaSub('5')).toEqual('五')
      expect(chinaSub('17')).toEqual('十七')
      expect(chinaSub('28')).toEqual('二十八')
      expect(chinaSub('1234')).toEqual('一千二百三十四')
      expect(chinaSub('2006')).toEqual('二千六')
    })
  })
})
