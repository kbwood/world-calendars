"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThaiCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
require("./Gregorian");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Thai calendar.
   See http://en.wikipedia.org/wiki/Thai_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Thai',
  epochs: ['BBE', 'BE'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
};
class ThaiCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Thai epoch: 1 January 543 BCE (Gregorian)
    super('Thai', 1523098.5, ThaiCalendar.localisations, language, [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return ThaiCalendar.gregorian.leapYear(this.thaiToGregorianYear(y));
  }

  // Determine the week of the year for a date - ISO 8601.

  weekOfYear(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, month, day);
    return ThaiCalendar.gregorian.weekOfYear(this.thaiToGregorianYear(y), m, d);
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
    return ThaiCalendar.gregorian.toJD(this.thaiToGregorianYear(y), m, d);
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    var date = ThaiCalendar.gregorian.fromJD(jd);
    return this.date(this.gregorianToThaiYear(date.year()), date.month(), date.day());
  }

  // Convert Thai to Gregorian year.
  thaiToGregorianYear(year) {
    return year - ThaiCalendar.yearsOffset - (year >= 1 && year <= ThaiCalendar.yearsOffset ? 1 : 0);
  }

  // Convert Gregorian to Thai year.
  gregorianToThaiYear(year) {
    return year + ThaiCalendar.yearsOffset + (year >= -ThaiCalendar.yearsOffset && year <= -1 ? 1 : 0);
  }
}
exports.ThaiCalendar = ThaiCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(ThaiCalendar, "localisations", {
  '': defaultLocalisation
});
_defineProperty(ThaiCalendar, "gregorian", _Calendars.default.instance('gregorian'));
_defineProperty(ThaiCalendar, "yearsOffset", 543);
_Calendars.default.register('thai', ThaiCalendar);
//# sourceMappingURL=Thai.js.map