"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));
var _Nanakshahi = require("../Nanakshahi");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* http://keith-wood.name/worldCalendars.html
   Punjabi localisation for Nanakshahi calendar.
   Written by Sarbjit Singh January 2016. */

var punjabiDigits = ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'];
_Nanakshahi.NanakshahiCalendar.localisations.pa = {
  name: 'Nanakshahi',
  epochs: ['BN', 'AN'],
  monthNames: ['ਚੇਤ', 'ਵੈਸਾਖ', 'ਜੇਠ', 'ਹਾੜ', 'ਸਾਵਣ', 'ਭਾਦੋਂ', 'ਅੱਸੂ', 'ਕੱਤਕ', 'ਮੱਘਰ', 'ਪੋਹ', 'ਮਾਘ', 'ਫੱਗਣ'],
  monthNamesShort: ['ਚੇ', 'ਵੈ', 'ਜੇ', 'ਹਾ', 'ਸਾ', 'ਭਾ', 'ਅੱ', 'ਕੱ', 'ਮੱ', 'ਪੋ', 'ਮਾ', 'ਫੱ'],
  dayNames: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨਿੱਚਰਵਾਰ'],
  dayNamesShort: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨਿੱਚਰ'],
  dayNamesMin: ['ਐ', 'ਸੋ', 'ਮੰ', 'ਬੁੱ', 'ਵੀ', 'ਸ਼ੁੱ', 'ਸ਼'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false,
  localiseDigits: _Calendars.default.localiseDigits(punjabiDigits),
  normaliseDigits: _Calendars.default.normaliseDigits(punjabiDigits)
};
//# sourceMappingURL=Nanakshahi-pa.js.map