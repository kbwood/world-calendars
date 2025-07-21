"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JulianCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Julian calendar.
   Based on code from http://www.fourmilab.ch/documents/calendar/.
   See also http://en.wikipedia.org/wiki/Julian_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Julian',
  epochs: ['BC', 'AD'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  dateFormat: 'mm/dd/yyyy',
  firstDay: 0,
  isRTL: false
};
class JulianCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Julian epoch: 1 January 0001 AD = 30 December 0001 BCE (Gregorian).
    super('Julian', 1721423.5, JulianCalendar.localisations, language, [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    if (y < 0) {
      y++;
    }
    ; // No year zero
    return y % 4 === 0;
  }

  // Determine the week of the year for a date - ISO 8601.

  weekOfYear(yearOrDate, month, day) {
    // Find Thursday of this week starting on Monday
    var checkDate = yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
  }

  // Retrieve the number of days in a month.

  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1] + (m === 2 && this.leapYear(y) ? 1 : 0);
  }

  // Determine whether this date is a week day.

  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return (dow || 7) < 6;
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    if (y < 0) {
      y++;
    } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (m < 3) {
      m += 12;
      y--;
    }
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 1524.5;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    var a = Math.floor(jd + 0.5);
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(30.6001 * e);
    var month = e - Math.floor(e < 14 ? 1 : 13);
    var year = c - Math.floor(month > 2 ? 4716 : 4715);
    if (year <= 0) {
      year--;
    } // No year zero
    return this.date(year, month, day);
  }
}
exports.JulianCalendar = JulianCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(JulianCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('julian', JulianCalendar);
//# sourceMappingURL=Julian.js.map