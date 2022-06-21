import Calendars, { CalendarError } from '../src/Calendars'
import '../src/ParseFormat'
import '../src/Gregorian'
import '../src/l10n/Gregorian-fr'
import '../src/l10n/Gregorian-gu'
import '../src/l10n/Gregorian-zh-CN'
import '../src/Hebrew'
import '../src/Mayan'

describe('ParseFormat', () => {
  const gregorian = Calendars.instance('gregorian')
  const gregorianChinese = Calendars.instance('gregorian', 'zh-CN')
  const gregorianFrench = Calendars.instance('gregorian', 'fr')
  const gregorianGujarati = Calendars.instance('gregorian', 'gu')
  const hebrew = Calendars.instance('hebrew')
  const mayan = Calendars.instance('mayan')

  describe('format from CDate', () => {
    it('should format a date using a default format', () => {
      expect(gregorian.date(2022, 1, 16).format()).toEqual('01/16/2022')
      expect(gregorianChinese.date(2022, 1, 16).format()).toEqual('二千二十二-一-十六')
      expect(gregorianFrench.date(2022, 1, 16).format()).toEqual('16/01/2022')
      expect(gregorianGujarati.date(2022, 1, 16).format()).toEqual('૧૬-જાન્યુ-૨૦૨૨')
      expect(hebrew.date(5769, 7, 25).format()).toEqual('25/07/5769')
      expect(mayan.date(5195, 9, 13).format()).toEqual('12.19.15.9.13')
    })

    it('should format a date using a provided long format', () => {
      const pattern = 'DD, MM d, yyyy'
      expect(gregorian.date(2022, 1, 16).format(pattern)).toEqual('Sunday, January 16, 2022')
      expect(gregorianChinese.date(2022, 1, 16).format(pattern)).toEqual('星期日, 一月 十六, 二千二十二')
      expect(gregorianFrench.date(2022, 1, 16).format(pattern)).toEqual('Dimanche, Janvier 16, 2022')
      expect(gregorianGujarati.date(2022, 1, 16).format(pattern)).toEqual('રવિવાર, જાન્યુઆરી ૧૬, ૨૦૨૨')
      expect(hebrew.date(5769, 7, 25).format(pattern)).toEqual('Yom Shishi, Tishrei 25, 5769')
    })

    it('should format a date using a provided short format', () => {
      const pattern = 'D, M d, yyyy'
      expect(gregorian.date(2022, 1, 16).format(pattern)).toEqual('Sun, Jan 16, 2022')
      expect(gregorianChinese.date(2022, 1, 16).format(pattern)).toEqual('周日, 一 十六, 二千二十二')
      expect(gregorianFrench.date(2022, 1, 16).format(pattern)).toEqual('Dim, Jan 16, 2022')
      expect(gregorianGujarati.date(2022, 1, 16).format(pattern)).toEqual('રવિ, જાન્યુ ૧૬, ૨૦૨૨')
      expect(hebrew.date(5769, 7, 25).format(pattern)).toEqual('Shi, Tis 25, 5769')
    })

    it('should format a date using a provided format with day of year and week of year', () => {
      let pattern = "''yy-o ('w'w)"
      expect(gregorian.date(2022, 1, 16).format(pattern)).toEqual("'22-16 (w2)")
      expect(gregorianChinese.date(2022, 1, 16).format(pattern)).toEqual("'二十二-十六 (w二)")
      expect(gregorianFrench.date(2022, 1, 16).format(pattern)).toEqual("'22-16 (w2)")
      expect(gregorianGujarati.date(2022, 1, 16).format(pattern)).toEqual("'૨૨-૧૬ (w૨)")
      expect(hebrew.date(5769, 7, 25).format(pattern)).toEqual("'69-25 (w3)")
      pattern = "yyyy-oo ('w'ww)"
      expect(gregorian.date(2022, 1, 16).format(pattern)).toEqual('2022-016 (w02)')
      expect(gregorianChinese.date(2022, 1, 16).format(pattern)).toEqual('二千二十二-十六 (w二)')
      expect(gregorianFrench.date(2022, 1, 16).format(pattern)).toEqual('2022-016 (w02)')
      expect(gregorianGujarati.date(2022, 1, 16).format(pattern)).toEqual('૨૦૨૨-૦૧૬ (w૦૨)')
      expect(hebrew.date(5769, 7, 25).format(pattern)).toEqual('5769-025 (w03)')
    })

    it('should format a date using a provided format with extra text', () => {
      const pattern = "'Day' d 'of' MM, YYYY e'"
      expect(gregorian.date(2022, 1, 16).format(pattern)).toEqual('Day 16 of January, 2022 CE')
      expect(gregorian.date(-2022, 1, 16).format(pattern)).toEqual('Day 16 of January, 2022 BCE')
      expect(gregorianFrench.date(2022, 1, 16).format(pattern)).toEqual('Day 16 of Janvier, 2022 CE')
      expect(hebrew.date(5769, 7, 25).format(pattern)).toEqual('Day 25 of Tishrei, 5769 AM')
      expect(hebrew.date(-5769, 7, 25).format(pattern)).toEqual('Day 25 of Tishrei, 5769 BAM')
    })
  })

  describe('format from year/month/day', () => {
    it('should format a date using a default format', () => {
      expect(gregorian.format(2022, 1, 16)).toEqual('01/16/2022')
      expect(gregorianChinese.format(2022, 1, 16)).toEqual('二千二十二-一-十六')
      expect(gregorianFrench.format(2022, 1, 16)).toEqual('16/01/2022')
      expect(gregorianGujarati.format(2022, 1, 16)).toEqual('૧૬-જાન્યુ-૨૦૨૨')
      expect(hebrew.format(5769, 7, 25)).toEqual('25/07/5769')
      expect(mayan.format(5195, 9, 13)).toEqual('12.19.15.9.13')
    })

    it('should format a date using a provided long format', () => {
      const pattern = 'DD, MM d, yyyy'
      expect(gregorian.format(2022, 1, 16, pattern)).toEqual('Sunday, January 16, 2022')
      expect(gregorianChinese.format(2022, 1, 16, pattern)).toEqual('星期日, 一月 十六, 二千二十二')
      expect(gregorianFrench.format(2022, 1, 16, pattern)).toEqual('Dimanche, Janvier 16, 2022')
      expect(gregorianGujarati.format(2022, 1, 16, pattern)).toEqual('રવિવાર, જાન્યુઆરી ૧૬, ૨૦૨૨')
      expect(hebrew.format(5769, 7, 25, pattern)).toEqual('Yom Shishi, Tishrei 25, 5769')
    })

    it('should format a date using a provided short format', () => {
      const pattern = 'D, M d, yyyy'
      expect(gregorian.format(2022, 1, 16, pattern)).toEqual('Sun, Jan 16, 2022')
      expect(gregorianChinese.format(2022, 1, 16, pattern)).toEqual('周日, 一 十六, 二千二十二')
      expect(gregorianFrench.format(2022, 1, 16, pattern)).toEqual('Dim, Jan 16, 2022')
      expect(gregorianGujarati.format(2022, 1, 16, pattern)).toEqual('રવિ, જાન્યુ ૧૬, ૨૦૨૨')
      expect(hebrew.format(5769, 7, 25, pattern)).toEqual('Shi, Tis 25, 5769')
    })

    it('should format a date using a provided format with day of year and week of year', () => {
      let pattern = "''yy-o ('w'w)"
      expect(gregorian.format(2022, 1, 16, pattern)).toEqual("'22-16 (w2)")
      expect(gregorianChinese.format(2022, 1, 16, pattern)).toEqual("'二十二-十六 (w二)")
      expect(gregorianFrench.format(2022, 1, 16, pattern)).toEqual("'22-16 (w2)")
      expect(gregorianGujarati.format(2022, 1, 16, pattern)).toEqual("'૨૨-૧૬ (w૨)")
      expect(hebrew.format(5769, 7, 25, pattern)).toEqual("'69-25 (w3)")
      pattern = "yyyy-oo ('w'ww)"
      expect(gregorian.format(2022, 1, 16, pattern)).toEqual('2022-016 (w02)')
      expect(gregorianChinese.format(2022, 1, 16, pattern)).toEqual('二千二十二-十六 (w二)')
      expect(gregorianFrench.format(2022, 1, 16, pattern)).toEqual('2022-016 (w02)')
      expect(gregorianGujarati.format(2022, 1, 16, pattern)).toEqual('૨૦૨૨-૦૧૬ (w૦૨)')
      expect(hebrew.format(5769, 7, 25, pattern)).toEqual('5769-025 (w03)')
    })

    it('should format a date using a provided format with extra text', () => {
      const pattern = "'Day' d 'of' MM, YYYY e'"
      expect(gregorian.format(2022, 1, 16, pattern)).toEqual('Day 16 of January, 2022 CE')
      expect(gregorian.format(-2022, 1, 16, pattern)).toEqual('Day 16 of January, 2022 BCE')
      expect(gregorianFrench.format(2022, 1, 16, pattern)).toEqual('Day 16 of Janvier, 2022 CE')
      expect(hebrew.format(5769, 7, 25, pattern)).toEqual('Day 25 of Tishrei, 5769 AM')
      expect(hebrew.format(-5769, 7, 25, pattern)).toEqual('Day 25 of Tishrei, 5769 BAM')
    })
  })

  describe('parse', () => {
    it('should parse a date using a default format', () => {
      expect(gregorian.parse('01/16/2022')).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorian.parse('01/16/-2022')).toEqual(gregorian.date(-2022, 1, 16))
      expect(gregorianChinese.parse('二千二十二-一-十六')).toEqual(gregorianChinese.date(2022, 1, 16))
      expect(gregorianFrench.parse('16/01/2022')).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(gregorianGujarati.parse('૧૬-જાન્યુ-૨૦૨૨')).toEqual(gregorianGujarati.date(2022, 1, 16))
      expect(hebrew.parse('25/07/5769')).toEqual(hebrew.date(5769, 7, 25))
      // expect(mayan, '12.19.15.9.13')).toEqual(mayan.date(5195, 9, 13))
    })

    it('should parse a date using a provided long format', () => {
      const pattern = 'DD, MM d, yyyy'
      expect(gregorian.parse('Sunday, January 16, 2022', pattern)).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorianChinese.parse('星期日, 一月 十六, 二千二十二', pattern)).toEqual(gregorianChinese.date(2022, 1, 16))
      expect(gregorianFrench.parse('Dimanche, Janvier 16, 2022', pattern)).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(gregorianGujarati.parse('રવિવાર, જાન્યુઆરી ૧૬, ૨૦૨૨', pattern)).toEqual(gregorianGujarati.date(2022, 1, 16))
      expect(hebrew.parse('Yom Shishi, Tishrei 25, 5769', pattern)).toEqual(hebrew.date(5769, 7, 25))
    })

    it('should parse a date using a provided short format', () => {
      const pattern = 'D, M d, yyyy'
      expect(gregorian.parse('Sun, Jan 16, 2022', pattern)).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorianChinese.parse('周日, 一 十六, 二千二十二', pattern)).toEqual(gregorianChinese.date(2022, 1, 16))
      expect(gregorianFrench.parse('Dim, Jan 16, 2022', pattern)).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(gregorianGujarati.parse('રવિ, જાન્યુ ૧૬, ૨૦૨૨', pattern)).toEqual(gregorianGujarati.date(2022, 1, 16))
      expect(hebrew.parse('Shi, Tis 25, 5769', pattern)).toEqual(hebrew.date(5769, 7, 25))
    })

    it('should parse a date using a provided format with day of year and week of year', () => {
      let pattern = "''yy-o ('w'w)"
      expect(gregorian.parse("'22-16 (w2)", pattern)).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorianChinese.parse("'二十二-十六 (w二)", pattern)).toEqual(gregorianChinese.date(2022, 1, 16))
      expect(gregorianFrench.parse("'22-16 (w2)", pattern)).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(gregorianGujarati.parse("'૨૨-૧૬ (w૨)", pattern)).toEqual(gregorianGujarati.date(2022, 1, 16))
      expect(hebrew.parse("'69-25 (w3)", pattern)).toEqual(hebrew.date(5769, 7, 25))
      pattern = "yyyy-oo ('w'ww)"
      expect(gregorian.parse('2022-016 (w02)', pattern)).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorianChinese.parse('二千二十二-十六 (w二)', pattern)).toEqual(gregorianChinese.date(2022, 1, 16))
      expect(gregorianFrench.parse('2022-016 (w02)', pattern)).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(gregorianGujarati.parse('૨૦૨૨-૦૧૬ (w૦૨)', pattern)).toEqual(gregorianGujarati.date(2022, 1, 16))
      expect(hebrew.parse('5769-025 (w03)', pattern)).toEqual(hebrew.date(5769, 7, 25))
    })

    it('should parse a date using a provided format with extra text', () => {
      const pattern = "'Day' d 'of' MM, YYYY e"
      expect(gregorian.parse('Day 16 of January, 2022 CE', pattern)).toEqual(gregorian.date(2022, 1, 16))
      expect(gregorian.parse('Day 16 of January, 2022 BCE', pattern)).toEqual(gregorian.date(-2022, 1, 16))
      expect(gregorianFrench.parse('Day 16 of Janvier, 2022 CE', pattern)).toEqual(gregorianFrench.date(2022, 1, 16))
      expect(hebrew.parse('Day 25 of Tishrei, 5769 AM', pattern)).toEqual(hebrew.date(5769, 7, 25))
      expect(hebrew.parse('Day 25 of Tishrei, 5769 BAM', pattern)).toEqual(hebrew.date(-5769, 7, 25))
    })

    it('should report an error when missing a number', () => {
      expect(() => { gregorian.parse('day/16/2022') }).toThrow(new CalendarError('Missing number at position 0'))
      expect(() => { gregorianChinese.parse('二千二十二-month-十六') }).toThrow(new CalendarError('Missing number at position 6'))
      expect(() => { gregorianFrench.parse('16/01/year') }).toThrow(new CalendarError('Missing number at position 6'))
      expect(() => { gregorianGujarati.parse('૧૬-જાન્યુ-year') }).toThrow(new CalendarError('Missing number at position 10'))
    })

    it('should report an error when unexpected text', () => {
      expect(() => { gregorian.parse('01X16/2022') }).toThrow(new CalendarError('Unexpected literal at position 2'))
      expect(() => { gregorianChinese.parse('二千二十二-一@十六') }).toThrow(new CalendarError('Unexpected literal at position 7'))
      expect(() => { gregorianFrench.parse('16/01/2022 more text') }).toThrow(new CalendarError('Additional text found at end'))
      expect(() => { gregorianGujarati.parse('૧૬-જાન્યુ-૨૦૨૨ more text') }).toThrow(new CalendarError('Additional text found at end'))
    })

    it('should report an error using a provided long format', () => {
      const pattern = 'DD, MM d, yyyy'
      expect(() => { gregorian.parse('Someday, January 16, 2022', pattern) }).toThrow(new CalendarError('Unknown name at position 0'))
      expect(() => { gregorianChinese.parse('星期日, somemonth 十六, 二千二十二', pattern) }).toThrow(new CalendarError('Unknown name at position 5'))
      expect(() => { gregorianFrench.parse('Dimanche, Somemonth 16, 2022', pattern) }).toThrow(new CalendarError('Unknown name at position 10'))
      expect(() => { gregorianGujarati.parse('Someday, જાન્યુઆરી ૧૬, ૨૦૨૨', pattern) }).toThrow(new CalendarError('Unknown name at position 0'))
    })

    it('should report an error using a provided short format', () => {
      const pattern = 'D, M d, yyyy'
      expect(() => { gregorian.parse('Xyz, Jan 16, 2022', pattern) }).toThrow(new CalendarError('Unknown name at position 0'))
      expect(() => { gregorianChinese.parse('周日, Xyz 十六, 二千二十二', pattern) }).toThrow(new CalendarError('Unknown name at position 4'))
      expect(() => { gregorianFrench.parse('Dim, Xyz 16, 2022', pattern) }).toThrow(new CalendarError('Unknown name at position 5'))
      expect(() => { gregorianGujarati.parse('Xyz, જાન્યુ ૧૬, ૨૦૨૨', pattern) }).toThrow(new CalendarError('Unknown name at position 0'))
    })
  })
})
