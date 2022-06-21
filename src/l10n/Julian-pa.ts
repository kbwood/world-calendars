/* http://keith-wood.name/worldCalendars.html
   Punjabi localisation for Gregorian/Julian calendars.
   Sarbjit Singh (sanbroz@gmail.com). */

import Calendars from '../Calendars'
import { JulianCalendar } from '../Julian'

const punjabiDigits = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯']

JulianCalendar.localisations.pa = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['ਜਨਵਰੀ', 'ਫ਼ਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ',
    'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ'],
  monthNamesShort: ['ਜਨ', 'ਫ਼ਰ', 'ਮਾਰ', 'ਅਪ੍ਰੈ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾ', 'ਅਗ', 'ਸਤੰ', 'ਅਕ', 'ਨਵੰ', 'ਦਸੰ'],
  dayNames: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨਿੱਚਰਵਾਰ'],
  dayNamesShort: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨਿੱਚਰ'],
  dayNamesMin: ['ਐ', 'ਸੋ', 'ਮੰ', 'ਬੁੱ', 'ਵੀ', 'ਸ਼ੁੱ', 'ਸ਼'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 1,
  isRTL: false,
  localiseDigits: Calendars.localiseDigits(punjabiDigits),
  normaliseDigits: Calendars.normaliseDigits(punjabiDigits)
}
