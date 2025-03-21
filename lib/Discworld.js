"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscworldCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Discworld calendar - Unseen University version.
   See also http://wiki.lspace.org/mediawiki/Discworld_calendar
   and http://discworld.wikia.com/wiki/Discworld_calendar.
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
// Names of the centuries
var centuries = [];
centuries[20] = 'Fruitbat';
centuries[21] = 'Anchovy';
var defaultLocalisation = {
  name: 'Discworld',
  epochs: ['BUC', 'UC'],
  monthNames: ['Ick', 'Offle', 'February', 'March', 'April', 'May', 'June', 'Grune', 'August', 'Spune', 'Sektober', 'Ember', 'December'],
  monthNamesShort: ['Ick', 'Off', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Gru', 'Aug', 'Spu', 'Sek', 'Emb', 'Dec'],
  dayNames: ['Sunday', 'Octeday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Oct', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Oc', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 2,
  isRTL: false
};
class DiscworldCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Discworld epoch: 1 January 0001 CE (Gregorian)
    super('Discworld', 1721425.5, DiscworldCalendar.localisations, language, [16, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32], 13);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return false;
  }

  // Retrieve the number of days in a year.
  daysInYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return 400;
  }

  // Retrieve the number of days in a month.

  daysInMonth(yearOrDate, month) {
    var [, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1];
  }

  // Retrieve the number of days in a week.
  daysInWeek() {
    return 8;
  }

  // Retrieve the day of the week for a date.

  dayOfWeek(yearOrDate, month, day) {
    var [,, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return (d + 1) % 8;
  }

  // Determine whether this date is a week day.

  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return dow >= 2 && dow <= 6;
  }

  // Retrieve additional information about a date - contents depends on calendar.

  extraInfo(yearOrDate, month, day) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return {
      century: centuries[Math.floor((y - 1) / 100) + 1] || ''
    };
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    if (y < 0) {
      y++;
    }
    return d + (m > 1 ? 16 : 0) + (m > 2 ? (m - 2) * 32 : 0) + (y - 1) * 400 + this.jdEpoch - 1;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    jd = Math.floor(jd + 0.5) - Math.floor(this.jdEpoch) - 1;
    var year = Math.floor(jd / 400) + 1;
    jd -= (year - 1) * 400;
    jd += jd > 15 ? 16 : 0;
    var month = Math.floor(jd / 32) + 1;
    var day = jd - (month - 1) * 32 + 1;
    return this.date(year <= 0 ? year - 1 : year, month, day);
  }
}
exports.DiscworldCalendar = DiscworldCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(DiscworldCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('discworld', DiscworldCalendar);
//# sourceMappingURL=Discworld.js.map