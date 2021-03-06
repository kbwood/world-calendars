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
      dateFormat: 'mm/dd/yyyy',
      firstDay: 0,
      isRTL: false
    }
    class NewCal extends CalendarBase {
      constructor () { super('new-cal', 1720000.5, { '': defaultRegionalOptions }, '', [30]) }
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

  describe('localiseDigits', () => {
    it('should convert a number to local digits', () => {
      const alphaSub = Calendars.localiseDigits('ADEFHINPRT'.split(''))
      const gujaratiSub = Calendars.localiseDigits(['???', '???', '???', '???', '???', '???', '???', '???', '???', '???'])

      expect(alphaSub('7094356128')).toEqual('PATHFINDER')
      expect(gujaratiSub('7094356128')).toEqual('??????????????????????????????')
    })
  })

  describe('normaliseDigits', () => {
    it('should convert local digits to a number', () => {
      const alphaNorm = Calendars.normaliseDigits('ADEFHINPRT'.split(''))
      const gujaratiNorm = Calendars.normaliseDigits(['???', '???', '???', '???', '???', '???', '???', '???', '???', '???'])

      expect(alphaNorm('PATHFINDER with extra text')).toEqual('7094356128 with extra text')
      expect(gujaratiNorm('extra text with ??????????????????????????????')).toEqual('extra text with 7094356128')
    })
  })

  describe('localiseChineseDigits', () => {
    it('should convert a number to local digits', () => {
      const chinaSub = Calendars.localiseChineseDigits(
        ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???'], ['', '???', '???', '???'])

      expect(chinaSub('0')).toEqual('???')
      expect(chinaSub('5')).toEqual('???')
      expect(chinaSub('10')).toEqual('???')
      expect(chinaSub('17')).toEqual('??????')
      expect(chinaSub('28')).toEqual('?????????')
      expect(chinaSub('1234')).toEqual('?????????????????????')
      expect(chinaSub('2006')).toEqual('?????????')
    })
  })

  describe('normaliseChineseDigits', () => {
    it('should convert a number to local digits', () => {
      const chinaNorm = Calendars.normaliseChineseDigits(
        ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???'], ['', '???', '???', '???'])

      expect(chinaNorm('???')).toEqual('0')
      expect(chinaNorm('???')).toEqual('5')
      expect(chinaNorm('???')).toEqual('10')
      expect(chinaNorm('??????')).toEqual('17')
      expect(chinaNorm('?????????')).toEqual('28')
      expect(chinaNorm('?????????????????????')).toEqual('1234')
      expect(chinaNorm('?????????')).toEqual('2006')
      expect(chinaNorm('convert ????????????????????? and ?????????')).toEqual('convert 1234 and 2006')
    })
  })
})
