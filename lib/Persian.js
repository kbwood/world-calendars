"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersianCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Modulus function which works for non-integers.
var mod = (a, b) => a - b * Math.floor(a / b);

var defaultLocalisation = {
  name: 'Persian',
  epochs: ['BP', 'AP'],
  monthNames: ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Day', 'Bahman', 'Esfand'],
  monthNamesShort: ['Far', 'Ord', 'Kho', 'Tir', 'Mor', 'Sha', 'Meh', 'Aba', 'Aza', 'Day', 'Bah', 'Esf'],
  dayNames: ['Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e', 'Shanbe'],
  dayNamesShort: ['Yek', 'Do', 'Se', 'Chæ', 'Panj', 'Jom', 'Sha'],
  dayNamesMin: ['Ye', 'Do', 'Se', 'Ch', 'Pa', 'Jo', 'Sh'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
};

class PersianCalendar extends _Calendars.CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Persian epoch: 19 March 622 CE (Gregorian).
    super('Persian', 1948320.5, PersianCalendar.localisations, language, [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return ((y - (y > 0 ? 474 : 473)) % 2820 + 474 + 38) * 682 % 2816 < 682;
  } // Determine the week of the year for a date - ISO 8601.


  weekOfYear(yearOrDate, month, day) {
    // Find Saturday of this week starting on Saturday
    var checkDate = yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(-((checkDate.dayOfWeek() + 1) % 7), 'd');
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
  } // Retrieve the number of days in a month.


  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1] + (m === 12 && this.leapYear(y) ? 1 : 0);
  } // Determine whether this date is a week day.


  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return dow !== 5;
  } // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.


  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    var epBase = y - (y >= 0 ? 474 : 473);
    var epYear = 474 + mod(epBase, 2820);
    return d + (m <= 7 ? (m - 1) * 31 : (m - 1) * 30 + 6) + Math.floor((epYear * 682 - 110) / 2816) + (epYear - 1) * 365 + Math.floor(epBase / 2820) * 1029983 + this.jdEpoch - 1;
  } // Create a new date from a Julian day number.


  fromJD(jd) {
    jd = Math.floor(jd) + 0.5;
    var dEpoch = jd - this.toJD(475, 1, 1);
    var cycle = Math.floor(dEpoch / 1029983);
    var cYear = mod(dEpoch, 1029983);
    var yCycle = 2820;

    if (cYear !== 1029982) {
      var aux1 = Math.floor(cYear / 366);
      var aux2 = mod(cYear, 366);
      yCycle = Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
    }

    var year = yCycle + 2820 * cycle + 474;
    year = year <= 0 ? year - 1 : year;
    var yDay = jd - this.toJD(year, 1, 1) + 1;
    var month = yDay <= 186 ? Math.ceil(yDay / 31) : Math.ceil((yDay - 6) / 30);
    var day = jd - this.toJD(year, month, 1) + 1;
    return this.date(year, month, day);
  }

}

exports.PersianCalendar = PersianCalendar;

_defineProperty(PersianCalendar, "localisations", {
  '': defaultLocalisation
});

_Calendars.default.register('persian', PersianCalendar);

_Calendars.default.register('jalali', PersianCalendar);
//# sourceMappingURL=Persian.js.map