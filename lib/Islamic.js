"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IslamicCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Islamic or '16 civil' calendar.
   Based on code from http://www.iranchamber.com/calendar/converter/iranian_calendar_converter.php.
   See also http://en.wikipedia.org/wiki/Islamic_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Islamic',
  epochs: ['BH', 'AH'],
  monthNames: ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
  monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
  dayNames: ['Yawm al-ahad', 'Yawm al-ithnayn', 'Yawm ath-thulaathaa\'', 'Yawm al-arbi\'aa\'', 'Yawm al-khamīs', 'Yawm al-jum\'a', 'Yawm as-sabt'],
  dayNamesShort: ['Aha', 'Ith', 'Thu', 'Arb', 'Kha', 'Jum', 'Sab'],
  dayNamesMin: ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
};
class IslamicCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Islamic epoch: 16 July 622 CE (Gregorian).
    super('Islamic', 1948439.5, IslamicCalendar.localisations, language, [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    if (y < 0) {
      y++;
    }
    ; // No year zero
    return (y * 11 + 14) % 30 < 11;
  }

  // Retrieve the number of days in a year.
  daysInYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return this.leapYear(y) ? 355 : 354;
  }

  // Retrieve the number of days in a month.

  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1] + (m === 12 && this.leapYear(y) ? 1 : 0);
  }

  // Determine whether this date is a week day.

  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return dow !== 5;
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    if (y <= 0) {
      y++;
    } // No year zero
    return d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + this.jdEpoch - 1;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    jd = Math.floor(jd) + 0.5;
    var year = Math.floor((30 * (jd - this.jdEpoch) + 10646) / 10631);
    year = year <= 0 ? year - 1 : year;
    var month = Math.min(12, Math.ceil((jd - 29 - this.toJD(year, 1, 1)) / 29.5) + 1);
    var day = jd - this.toJD(year, month, 1) + 1;
    return this.date(year, month, day);
  }
}
exports.IslamicCalendar = IslamicCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(IslamicCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('islamic', IslamicCalendar);
//# sourceMappingURL=Islamic.js.map