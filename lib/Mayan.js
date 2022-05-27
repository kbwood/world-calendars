"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MayanCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultLocalisation = {
  name: 'Mayan',
  epochs: ['', ''],
  monthNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  monthNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
  dayNames: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  dayNamesShort: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  dayNamesMin: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
  digits: undefined,
  dateFormat: 'YYYY.m.d',
  firstDay: 0,
  isRTL: false
};
var haabMonths = ['Pop', 'Uo', 'Zip', 'Zotz', 'Tzec', 'Xul', 'Yaxkin', 'Mol', 'Chen', 'Yax', 'Zac', 'Ceh', 'Mac', 'Kankin', 'Muan', 'Pax', 'Kayab', 'Cumku', 'Uayeb'];
var tzolkinMonths = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Etznab', 'Cauac', 'Ahau']; // Modulus function which works for non-integers.

var mod = (a, b) => a - b * Math.floor(a / b); // Modulus function which returns numerator if modulus is zero.


var amod = (a, b) => mod(a - 1, b) + 1;

class MayanCalendar extends _Calendars.BaseCalendar {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    super('Mayan', 584282.5, MayanCalendar.localisations[language] || MayanCalendar.localisations[''], [], 18, true, 0, 0, 0);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return false;
  } // Format the year, if not a simple sequential number.


  formatYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    var baktun = Math.floor(y / 400);
    y = y % 400;
    y += y < 0 ? 400 : 0;
    var katun = Math.floor(y / 20);
    return baktun + '.' + katun + '.' + y % 20;
  } // Convert from the formatted year back to a single number.


  forYear(years) {
    var parts = years.split('.');

    if (parts.length < 3) {
      throw new _Calendars.CalendarError('Invalid Mayan year');
    }

    var year = 0;

    for (var i = 0; i < parts.length; i++) {
      var y = parseInt(parts[i], 10);

      if (Math.abs(y) > 19 || i > 0 && y < 0) {
        throw new _Calendars.CalendarError('Invalid Mayan year');
      }

      year = year * 20 + y;
    }

    return year;
  } // Determine the week of the year for a date.


  weekOfYear(yearOrDate, month, day) {
    yearOrDate instanceof _Calendars.CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    return 0;
  } // Retrieve the number of days in a year.


  daysInYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return 360;
  } // Retrieve the number of days in a month.


  daysInMonth(yearOrDate, month) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return 20;
  } // Retrieve the number of days in a week.


  daysInWeek() {
    return 5; // Just for formatting
  } // Retrieve the day of the week for a date.


  dayOfWeek(yearOrDate, month, day) {
    // @ts-ignore: first two return values aren't used
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate // eslint-disable-line no-unused-vars
    ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return d;
  } // Determine whether this date is a week day.


  weekDay(yearOrDate, month, day) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, day, {
      notDay: true
    });
    return true;
  } // Retrieve additional information about a date - contents depends on calendar.


  extraInfo(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    var jd = this.toJD(y, m, d);
    var haab = this.toHaab(jd);
    var tzolkin = this.toTzolkin(jd);
    return {
      haabMonthName: haabMonths[haab[0] - 1],
      haabMonth: haab[0],
      haabDay: haab[1],
      tzolkinDayName: tzolkinMonths[tzolkin[0] - 1],
      tzolkinDay: tzolkin[0],
      tzolkinTrecena: tzolkin[1]
    };
  } // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.


  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return d + m * 20 + y * 360 + this.jdEpoch;
  } // Create a new date from a Julian day number.


  fromJD(jd) {
    jd = Math.floor(jd) + 0.5 - this.jdEpoch;
    var year = Math.floor(jd / 360);
    jd = jd % 360;
    jd += jd < 0 ? 360 : 0;
    var month = Math.floor(jd / 20);
    var day = jd % 20;
    return this.date(year, month, day);
  } // Retrieve Haab date (month and day) from a Julian date.


  toHaab(jd) {
    var day = mod(jd - this.jdEpoch + 8 + (18 - 1) * 20, 365);
    return [Math.floor(day / 20) + 1, mod(day, 20)];
  } // Retrieve Tzolkin date (day and trecena) from a Julian date.


  toTzolkin(jd) {
    return [amod(jd - this.jdEpoch + 20, 20), amod(jd - this.jdEpoch + 4, 13)];
  }

}

exports.MayanCalendar = MayanCalendar;

_defineProperty(MayanCalendar, "localisations", {
  '': defaultLocalisation
});

_Calendars.default.register('mayan', MayanCalendar);
//# sourceMappingURL=Mayan.js.map