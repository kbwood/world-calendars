"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JulianCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultLocalisation = {
  name: 'Julian',
  epochs: ['BC', 'AD'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'mm/dd/yyyy',
  firstDay: 0,
  isRTL: false
};

class JulianCalendar extends _Calendars.BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Julian epoch: 1 January 0001 AD = 30 December 0001 BCE (Gregorian).
    super('Julian', 1721423.5, JulianCalendar.localisations[language] || JulianCalendar.localisations[''], [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);

    if (y < 0) {
      y++;
    }

    ; // No year zero

    return y % 4 === 0;
  } // Determine the week of the year for a date - ISO 8601.


  weekOfYear(yearOrDate, month, day) {
    // Find Thursday of this week starting on Monday
    var checkDate = yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(4 - (checkDate.dayOfWeek() || 7), 'd');
    return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
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

    if (y < 0) {
      y++;
    } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991


    if (m < 3) {
      m += 12;
      y--;
    }

    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d - 1524.5;
  } // Create a new date from a Julian day number.


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

_defineProperty(JulianCalendar, "localisations", {
  '': defaultLocalisation
});

_Calendars.default.register('julian', JulianCalendar);
//# sourceMappingURL=Julian.js.map