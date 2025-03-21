"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NanakshahiCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
require("./Gregorian");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Nanakshahi calendar.
   See also https://en.wikipedia.org/wiki/Nanakshahi_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Nanakshahi',
  epochs: ['BN', 'AN'],
  monthNames: ['Chet', 'Vaisakh', 'Jeth', 'Harh', 'Sawan', 'Bhadon', 'Assu', 'Katak', 'Maghar', 'Poh', 'Magh', 'Phagun'],
  monthNamesShort: ['Che', 'Vai', 'Jet', 'Har', 'Saw', 'Bha', 'Ass', 'Kat', 'Mgr', 'Poh', 'Mgh', 'Pha'],
  dayNames: ['Somvaar', 'Mangalvar', 'Budhvaar', 'Veervaar', 'Shukarvaar', 'Sanicharvaar', 'Etvaar'],
  dayNamesShort: ['Som', 'Mangal', 'Budh', 'Veer', 'Shukar', 'Sanichar', 'Et'],
  dayNamesMin: ['So', 'Ma', 'Bu', 'Ve', 'Sh', 'Sa', 'Et'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false
};
class NanakshahiCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Nanakshahi epoch: 14 March 1469 CE (Gregorian).
    super('Nanakshahi', 2257673.5, NanakshahiCalendar.localisations, language, [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30]);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return NanakshahiCalendar.gregorian.leapYear(y + (y < 1 ? 1 : 0) + 1469);
  }

  // Determine the week of the year for a date - ISO 8601.

  weekOfYear(yearOrDate, month, day) {
    // Find Thursday of this week starting on Monday
    var checkDate = yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(1 - (checkDate.dayOfWeek() || 7), 'd');
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
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
    return (dow || 7) < 6;
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    if (y < 0) {
      y++;
    } // No year zero
    var doy = d;
    for (var mn = 1; mn < m; mn++) {
      doy += this.daysPerMonth[mn - 1];
    }
    return doy + NanakshahiCalendar.gregorian.toJD(y + 1468, 3, 13);
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    jd = Math.floor(jd + 0.5);
    var year = Math.floor((jd - (this.jdEpoch - 1)) / 366);
    if (year <= 0) {
      year--;
    }
    while (jd >= this.toJD(year + (year === -1 ? 2 : 1), 1, 1)) {
      year++;
      if (year === 0) {
        year++;
      }
    }
    var day = jd - Math.floor(this.toJD(year, 1, 1));
    var month = 1;
    while (day > this.daysInMonth(year, month)) {
      day -= this.daysInMonth(year, month);
      month++;
    }
    return this.date(year, month, day);
  }
}
exports.NanakshahiCalendar = NanakshahiCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(NanakshahiCalendar, "localisations", {
  '': defaultLocalisation
});
_defineProperty(NanakshahiCalendar, "gregorian", _Calendars.default.instance('gregorian'));
_Calendars.default.register('nanakshahi', NanakshahiCalendar);
//# sourceMappingURL=Nanakshahi.js.map