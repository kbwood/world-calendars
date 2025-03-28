"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));
var _Julian = require("../Julian");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* http://keith-wood.name/worldCalendars.html
   Gujarati (ગુજરાતી) localisation for Gregorian/Julian calendars.
   Naymesh Mistry (naymesh@yahoo.com). */

var gujaratiDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'];
_Julian.JulianCalendar.localisations.gu = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટેમ્બર', 'ઑક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'],
  monthNamesShort: ['જાન્યુ', 'ફેબ્રુ', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટે', 'ઑક્ટો', 'નવે', 'ડિસે'],
  dayNames: ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
  dayNamesShort: ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
  dayNamesMin: ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  dateFormat: 'dd-M-yyyy',
  firstDay: 1,
  isRTL: false,
  localiseDigits: _Calendars.default.localiseDigits(gujaratiDigits),
  normaliseDigits: _Calendars.default.normaliseDigits(gujaratiDigits)
};
//# sourceMappingURL=Julian-gu.js.map