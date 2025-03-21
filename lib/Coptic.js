"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopticCalendar = void 0;
var _Calendars = _interopRequireWildcard(require("./Calendars"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* http://keith-wood.name/worldCalendars.html
   Implementation of the Coptic calendar.
   See http://en.wikipedia.org/wiki/Coptic_calendar.
   See also Calendrical Calculations: The Millennium Edition
   (http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml).
   Written by Keith Wood (kbwood.au{at}gmail.com) May 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */
var defaultLocalisation = {
  name: 'Coptic',
  epochs: ['BAM', 'AM'],
  monthNames: ['Thout', 'Paopi', 'Hathor', 'Koiak', 'Tobi', 'Meshir', 'Paremhat', 'Paremoude', 'Pashons', 'Paoni', 'Epip', 'Mesori', 'Pi Kogi Enavot'],
  monthNamesShort: ['Tho', 'Pao', 'Hath', 'Koi', 'Tob', 'Mesh', 'Pat', 'Pad', 'Pash', 'Pao', 'Epi', 'Meso', 'PiK'],
  dayNames: ['Tkyriaka', 'Pesnau', 'Pshoment', 'Peftoou', 'Ptiou', 'Psoou', 'Psabbaton'],
  dayNamesShort: ['Tky', 'Pes', 'Psh', 'Pef', 'Pti', 'Pso', 'Psa'],
  dayNamesMin: ['Tk', 'Pes', 'Psh', 'Pef', 'Pt', 'Pso', 'Psa'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
};
class CopticCalendar extends _Calendars.CalendarBase {
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Coptic epoch: 29 August 284 CE (Gregorian).
    super('Coptic', 1825029.5, CopticCalendar.localisations, language, [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5], 13);
  }

  // Determine whether this date is in a leap year.

  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    if (y < 0) {
      y++;
    }
    ; // No year zero
    return y % 4 === 3 || y % 4 === -1;
  }

  // Retrieve the number of days in a month.

  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1] + (m === 13 && this.leapYear(y) ? 1 : 0);
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
    return d + (m - 1) * 30 + (y - 1) * 365 + Math.floor(y / 4) + this.jdEpoch - 1;
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    var c = Math.floor(jd) + 0.5 - this.jdEpoch;
    var year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
    if (year <= 0) {
      year--;
    } // No year zero
    c = Math.floor(jd) + 0.5 - this.date(year, 1, 1).toJD();
    var month = Math.floor(c / 30) + 1;
    var day = c - (month - 1) * 30 + 1;
    return this.date(year, month, day);
  }
}
exports.CopticCalendar = CopticCalendar;
// Localisations for the plugin.
// Entries are objects indexed by the language code ('' being the default US/English). */
_defineProperty(CopticCalendar, "localisations", {
  '': defaultLocalisation
});
_Calendars.default.register('coptic', CopticCalendar);
//# sourceMappingURL=Coptic.js.map