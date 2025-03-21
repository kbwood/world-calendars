"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HebrewCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Hebrew civil calendar.
   Based on code from http://www.fourmilab.ch/documents/calendar/.
   See also http://en.wikipedia.org/wiki/Hebrew_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Hebrew',
  epochs: ['BAM', 'AM'],
  monthNames: ['Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul', 'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Adar II'],
  monthNamesShort: ['Nis', 'Iya', 'Siv', 'Tam', 'Av', 'Elu', 'Tis', 'Che', 'Kis', 'Tev', 'She', 'Ada', 'Ad2'],
  dayNames: ['Yom Rishon', 'Yom Sheni', 'Yom Shlishi', 'Yom Revi\'i', 'Yom Chamishi', 'Yom Shishi', 'Yom Shabbat'],
  dayNamesShort: ['Ris', 'She', 'Shl', 'Rev', 'Cha', 'Shi', 'Sha'],
  dayNamesMin: ['Ri', 'She', 'Shl', 'Re', 'Ch', 'Shi', 'Sha'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
};

// Modulus function which works for non-integers.
var mod = (a, b) => a - b * Math.floor(a / b);
class HebrewCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Hebrew epoch: 7 October 3761 BCE (Gregorian).
    super('Hebrew', 347995.5, HebrewCalendar.localisations, language, [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 29], 12, false, 1, 7, 1);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    if (y < 0) {
      y++;
    } // No year zero
    return this.isLeapYear(y);
  }

  // Retrieve the number of months in a year.
  monthsInYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay, {
      notDay: true,
      notMonth: true
    });
    if (y < 0) {
      y++;
    } // No year zero
    return this.isLeapYear(y) ? 13 : 12;
  }

  // Retrieve the number of days in a year.
  daysInYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return this.toJD(y === -1 ? +1 : y + 1, 7, 1) - this.toJD(y, 7, 1);
  }

  // Retrieve the number of days in a month.

  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    if (m === 12 && this.leapYear(y)) {
      // Adar I
      return 30;
    }
    if (m === 8 && mod(this.daysInYear(y), 10) === 5) {
      // Cheshvan in shlemah year
      return 30;
    }
    if (m === 9 && mod(this.daysInYear(y), 10) === 3) {
      // Kislev in chaserah year
      return 29;
    }
    return this.daysPerMonth[m - 1];
  }

  // Determine whether this date is a week day.

  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return dow !== 6;
  }

  // Retrieve additional information about a date - contents depends on calendar.

  extraInfo(yearOrDate, month, _) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return {
      yearType: "".concat(this.leapYear(y) ? 'embolismic' : 'common', " ").concat(['deficient', 'regular', 'complete'][this.daysInYear(y) % 10 - 3])
    };
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    var adjYear = y <= 0 ? y + 1 : y;
    var jd = this.jdEpoch + this.delay1(adjYear) + this.delay2(adjYear) + d + 1;
    if (m < 7) {
      for (var mn = 7; mn <= this.monthsInYear(y); mn++) {
        jd += this.daysInMonth(y, mn);
      }
      for (var _mn = 1; _mn < m; _mn++) {
        jd += this.daysInMonth(y, _mn);
      }
    } else {
      for (var _mn2 = 7; _mn2 < m; _mn2++) {
        jd += this.daysInMonth(y, _mn2);
      }
    }
    return jd;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    jd = Math.floor(jd) + 0.5;
    var year = Math.floor((jd - this.jdEpoch) * 98496.0 / 35975351.0) - 1;
    while (jd >= this.toJD(year === -1 ? +1 : year + 1, 7, 1)) {
      year++;
    }
    var month = jd < this.toJD(year, 1, 1) ? 7 : 1;
    while (jd > this.toJD(year, month, this.daysInMonth(year, month))) {
      month++;
    }
    var day = jd - this.toJD(year, month, 1) + 1;
    return this.date(year, month, day);
  }

  // Test for delay of start of new year and to avoid Sunday, Wednesday, or Friday as start of the new year.
  delay1(year) {
    var months = Math.floor((235 * year - 234) / 19);
    var parts = 12084 + 13753 * months;
    var day = months * 29 + Math.floor(parts / 25920);
    if (mod(3 * (day + 1), 7) < 3) {
      day++;
    }
    return day;
  }

  // Check for delay in start of new year due to length of adjacent years.
  delay2(year) {
    var last = this.delay1(year - 1);
    var present = this.delay1(year);
    var next = this.delay1(year + 1);
    return next - present === 356 ? 2 : present - last === 382 ? 1 : 0;
  }

  // Determine whether this year is a leap year.
  isLeapYear(year) {
    return mod(year * 7 + 1, 19) < 7;
  }
}
exports.HebrewCalendar = HebrewCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(HebrewCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('hebrew', HebrewCalendar);
//# sourceMappingURL=Hebrew.js.map