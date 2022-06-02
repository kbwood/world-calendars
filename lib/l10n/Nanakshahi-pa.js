"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Nanakshahi = require("../Nanakshahi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Punjabi localisation for Nanakshahi calendar.
   Written by Sarbjit Singh January 2016. */
_Nanakshahi.NanakshahiCalendar.localisations.pa = {
  name: 'Nanakshahi',
  epochs: ['BN', 'AN'],
  monthNames: ['ਚੇਤ', 'ਵੈਸਾਖ', 'ਜੇਠ', 'ਹਾੜ', 'ਸਾਵਣ', 'ਭਾਦੋਂ', 'ਅੱਸੂ', 'ਕੱਤਕ', 'ਮੱਘਰ', 'ਪੋਹ', 'ਮਾਘ', 'ਫੱਗਣ'],
  monthNamesShort: ['ਚੇ', 'ਵੈ', 'ਜੇ', 'ਹਾ', 'ਸਾ', 'ਭਾ', 'ਅੱ', 'ਕੱ', 'ਮੱ', 'ਪੋ', 'ਮਾ', 'ਫੱ'],
  dayNames: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨਿੱਚਰਵਾਰ'],
  dayNamesShort: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨਿੱਚਰ'],
  dayNamesMin: ['ਐ', 'ਸੋ', 'ਮੰ', 'ਬੁੱ', 'ਵੀ', 'ਸ਼ੁੱ', 'ਸ਼'],
  digits: _Calendars.default.substituteDigits(['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯']),
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false
};
//# sourceMappingURL=Nanakshahi-pa.js.map