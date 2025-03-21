"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IranianCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Iranian or Solar Hijri calendar.
   Based on code from https://www.jqueryscript.net/demo/Iranian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/
   and information from https://www.time.ir/.
   See also http://en.wikipedia.org/wiki/Solar_Hijri_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) March 2025.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var div = (a, b) => ~~(a / b);
var mod = (a, b) => a - ~~(a / b) * b;
var special = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
var last = special.length - 1;
var defaultLocalisation = {
  name: 'Iranian',
  epochs: ['BSH', 'SH'],
  monthNames: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'],
  monthNamesShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Dey', 'Bah', 'Esf'],
  dayNames: ['Yekshanbeh', 'Doshanbeh', 'Seshanbeh', 'Chahārshanbeh', 'Panjshanbeh', 'Jom\'eh', 'Shanbeh'],
  dayNamesShort: ['Yek', 'Do', 'Se', 'Cha', 'Panj', 'Jom', 'Sha'],
  dayNamesMin: ['Ye', 'Do', 'Se', 'Ch', 'Pa', 'Jo', 'Sh'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
};
class IranianCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Iranian epoch: 19 March 622 CE (Gregorian).
    super('Iranian', 1948320.5, IranianCalendar.localisations, language, [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return this.yearInfo(y).leap === 0;
  }

  // Determine the week of the year for a date - ISO 8601.

  weekOfYear(yearOrDate, month, day) {
    // Find Saturday of this week starting on Saturday
    var checkDate = yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(-((checkDate.dayOfWeek() + 1) % 7), 'd');
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
    return dow !== 5;
  }

  // Determine whether a date is valid for this calendar.
  isValid(year, month, day) {
    var validOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var valid = super.isValid(year, month, day, validOptions);
    return valid && year >= special[0] && year < special[last];
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    var info = this.yearInfo(y);
    return this.g2d(info.gy, 3, info.march) + 31 * (m - 1) - div(m, 7) * (m - 7) + d - 1;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    var day, month;
    var gy = this.d2gy(jd);
    var year = gy - 621;
    if (year <= 0) {
      year--;
    } // No year zero
    var info = this.yearInfo(year);
    var diff = jd - this.g2d(gy, 3, info.march);
    if (diff >= 0) {
      if (diff <= 185) {
        month = div(diff, 31) + 1;
        day = mod(diff, 31) + 1;
        return this.date(year, month, day);
      }
      diff -= 186;
    } else {
      year--;
      if (year === 0) {
        year--;
      } // No year zero
      diff += 179;
      if (info.leap === 1) {
        diff++;
      }
    }
    month = div(diff, 30) + 7;
    day = mod(diff, 30) + 1;
    return this.date(year, month, day);
  }

  // Convert from Julian date to Gregorian year.
  d2gy(jd) {
    var i = 4 * (jd + 0.5) + 139361631 + 4 * div(3 * div(4 * (jd + 0.5) + 183187720, 146097), 4) - 3908;
    var j = 5 * div(mod(i, 1461), 4) + 308;
    var gm = mod(div(j, 153), 12) + 1;
    return div(i, 1461) - 100100 + div(8 - gm, 6);
  }

  // Convert from Gregorian details to Julian date.
  g2d(year, month, day) {
    var i = div(1461 * (year + div(month - 8, 6) + 100100), 4) + div(153 * mod(month + 9, 12) + 2, 5) + day - 34840408;
    return i - div(3 * div(year + 100100 + div(month - 8, 6), 100), 4) + 752 - 0.5;
  }

  // Check that a candidate date is from the same calendar and is valid.

  validate(error, yearOrDate, month, day, validOptions) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? super.validate(error, yearOrDate) : super.validate(error, yearOrDate, month, day, validOptions);
    if (y < special[0] || y >= special[last]) {
      throw new _Calendars.CalendarError(error.replace(/\{0\}/, this.local.name));
    }
    return [y, m, d];
  }

  // Provide information about a given year.
  yearInfo(year) {
    var specDiff = 0;
    if (year < 0) {
      year++;
    } // No year zero
    var gy = year + 621;
    var m = -14;
    var prevSpec = special[0];
    for (var i = 1; i <= last && (specDiff = special[i] - prevSpec, special[i] <= year); i++) {
      m += 8 * div(specDiff, 33) + div(mod(specDiff, 33), 4);
      prevSpec = special[i];
    }
    var offset = year - prevSpec;
    m += 8 * div(offset, 33) + div(mod(offset, 33) + 3, 4);
    if (mod(specDiff, 33) === 4 && specDiff - offset === 4) {
      m++;
    }
    var r = div(gy, 4) - div(3 * (div(gy, 100) + 1), 4) - 150;
    var march = 20 + m - r;
    if (specDiff - offset < 6) {
      offset = offset - specDiff + 33 * div(specDiff + 4, 33);
    }
    var leap = mod(mod(offset + 1, 33) - 1, 4);
    leap = leap === -1 ? 4 : leap;
    return {
      gy,
      leap,
      march
    };
  }
}
exports.IranianCalendar = IranianCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(IranianCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('iranian', IranianCalendar);
//# sourceMappingURL=Iranian.js.map