"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThaiCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

require("./Gregorian");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultLocalisation = {
  name: 'Thai',
  epochs: ['BBE', 'BE'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
};

class ThaiCalendar extends _Calendars.CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Thai epoch: 1 January 543 BCE (Gregorian)
    super('Thai', 1523098.5, ThaiCalendar.localisations[language] || ThaiCalendar.localisations[''], [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return ThaiCalendar.gregorian.leapYear(this.thaiToGregorianYear(y));
  } // Determine the week of the year for a date - ISO 8601.


  weekOfYear(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, month, day);
    return ThaiCalendar.gregorian.weekOfYear(this.thaiToGregorianYear(y), m, d);
  } // Retrieve the number of days in a month.


  daysInMonth(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1] + (m === 2 && this.leapYear(y) ? 1 : 0);
  } // Determine whether this date is a week day.


  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return (dow || 7) < 6;
  } // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.


  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return ThaiCalendar.gregorian.toJD(this.thaiToGregorianYear(y), m, d);
  } // Create a new date from a Julian day number.


  fromJD(jd) {
    var date = ThaiCalendar.gregorian.fromJD(jd);
    return this.date(this.gregorianToThaiYear(date.year()), date.month(), date.day());
  } // Convert Thai to Gregorian year.


  thaiToGregorianYear(year) {
    return year - ThaiCalendar.yearsOffset - (year >= 1 && year <= ThaiCalendar.yearsOffset ? 1 : 0);
  } // Convert Gregorian to Thai year.


  gregorianToThaiYear(year) {
    return year + ThaiCalendar.yearsOffset + (year >= -ThaiCalendar.yearsOffset && year <= -1 ? 1 : 0);
  }

}

exports.ThaiCalendar = ThaiCalendar;

_defineProperty(ThaiCalendar, "localisations", {
  '': defaultLocalisation
});

_defineProperty(ThaiCalendar, "gregorian", _Calendars.default.instance('gregorian'));

_defineProperty(ThaiCalendar, "yearsOffset", 543);

_Calendars.default.register('thai', ThaiCalendar);
//# sourceMappingURL=Thai.js.map