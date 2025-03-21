"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CalendarError = exports.CalendarBase = exports.CDate = void 0;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* http://keith-wood.name/worldCalendars.html
   Implementations of various world calendars.
   Written by Keith Wood (kbwood.au{at}gmail.com) April 2022.
   Available under the MIT (http://keith-wood.name/licence.html) license.
   Please attribute the author if you use it. */

// Pad a numeric value with leading zeroes.
function pad(value, length) {
  var strValue = "".concat(value);
  return "".concat('000000'.substring(0, length - strValue.length)).concat(strValue);
}
class CalendarError extends Error {}

// Generic date, based on a particular calendar.
exports.CalendarError = CalendarError;
class CDate {
  // Create a new date in the given calendar.

  constructor(calendar, yearOrDate, month, day) {
    _defineProperty(this, "cal", void 0);
    // eslint-disable-line no-use-before-define
    _defineProperty(this, "yr", void 0);
    _defineProperty(this, "mn", void 0);
    _defineProperty(this, "dy", void 0);
    this.cal = calendar;
    if (yearOrDate instanceof CDate) {
      if (this.cal.name !== yearOrDate.calendar().name) {
        throw new CalendarError(Calendars.local.differentCalendars.replace(/\{0\}/, this.cal.local.name).replace(/\{1\}/, yearOrDate.calendar().local.name));
      }
      this.yr = yearOrDate.yr;
      this.mn = yearOrDate.mn;
      this.dy = yearOrDate.dy;
    } else {
      if (!this.cal.isValid(yearOrDate, month, day)) {
        throw new CalendarError(Calendars.local.invalidDate.replace(/\{0\}/, this.cal.local.name));
      }
      this.yr = yearOrDate;
      this.mn = month;
      this.dy = day;
    }
  }

  // Create a new date in the current calendar.

  date(year, month, day) {
    if (typeof year === 'undefined') {
      return this.cal.date(this);
    }
    return this.cal.date(year, month, day);
  }

  // Retrieve the calendar backing this date.
  calendar() {
    return this.cal;
  }

  // Retrieve or set the year for this date.

  year(value) {
    return typeof value === 'undefined' ? this.yr : this.set(value, 'y');
  }

  // Retrieve or set the month for this date.

  month(value) {
    return typeof value === 'undefined' ? this.mn : this.set(value, 'm');
  }

  // Retrieve or set the day for this date.

  day(value) {
    return typeof value === 'undefined' ? this.dy : this.set(value, 'd');
  }

  // Retrieve the epoch designator for this date, e.g. BCE or CE.
  epoch() {
    return this.cal.epoch(this);
  }

  // Format the year, if not a simple sequential number.
  formatYear() {
    return this.cal.formatYear(this);
  }

  // Determine whether this date is in a leap year.
  leapYear() {
    return this.cal.leapYear(this);
  }

  // Retrieve the month of the year for this date, i.e. the month's position within a numbered year.
  monthOfYear() {
    return this.cal.monthOfYear(this);
  }

  // Retrieve the week of the year for this date.
  weekOfYear() {
    return this.cal.weekOfYear(this);
  }

  // Retrieve the number of days in the year for this date.
  daysInYear() {
    return this.cal.daysInYear(this);
  }

  // Retrieve the day of the year for this date.
  dayOfYear() {
    return this.cal.dayOfYear(this);
  }

  // Retrieve the number of days in the month for this date.
  daysInMonth() {
    return this.cal.daysInMonth(this);
  }

  // Retrieve the day of the week for this date.
  dayOfWeek() {
    return this.cal.dayOfWeek(this);
  }

  // Determine whether this date is a week day.
  weekDay() {
    return this.cal.weekDay(this);
  }

  // Retrieve additional information about this date - contents depends on calendar.
  extraInfo() {
    return this.cal.extraInfo(this);
  }

  // Add period(s) to a date.
  add(offset, period) {
    return this.cal.add(this, offset, period);
  }

  // Subtract period(s) from a date.
  sub(offset, period) {
    return this.cal.sub(this, offset, period);
  }

  // Set a portion of the date.
  set(value, period) {
    return this.cal.set(this, value, period);
  }

  // Compare this date to another date.
  compareTo(date) {
    if (this.cal.name !== date.cal.name) {
      throw new CalendarError(Calendars.local.differentCalendars.replace(/\{0\}/, this.cal.local.name).replace(/\{1\}/, date.cal.local.name));
    }
    var c = this.yr !== date.yr ? this.yr - date.yr : this.mn !== date.mn ? this.monthOfYear() - date.monthOfYear() : this.dy - date.dy;
    return c < 0 ? -1 : c > 0 ? +1 : 0;
  }

  // Format this date.
  format(pattern) {
    return this.cal.format(this, pattern);
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  toJD() {
    return this.cal.toJD(this);
  }

  // Create a new date from a Julian day number.
  fromJD(jd) {
    return this.cal.fromJD(jd);
  }

  // Convert this date to a standard (Gregorian) JavaScript Date
  toJSDate() {
    return this.cal.toJSDate(this);
  }

  // Create a new date from a standard (Gregorian) JavaScript Date.
  fromJSDate(jsd) {
    return this.cal.fromJSDate(jsd);
  }

  // Convert to a string for display.
  toString() {
    return "".concat(this.yr < 0 ? '-' : '').concat(pad(Math.abs(this.yr), 4), "-").concat(pad(this.mn, 2), "-").concat(pad(this.dy, 2), " (").concat(this.cal.name, ")");
  }
}
exports.CDate = CDate;
// Basic functionality for all calendars. Other calendars should extend this.
class CalendarBase {
  constructor(name, jdEpoch, localisations, language, daysPerMonth) {
    var monthsPerYear = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 12;
    var hasYearZero = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var minMonth = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
    var firstMonth = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
    var minDay = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
    // The calendar name.
    _defineProperty(this, "name", void 0);
    // Julian day number of start of calendar epoch.
    _defineProperty(this, "jdEpoch", void 0);
    // Days per month in a common year.
    _defineProperty(this, "daysPerMonth", void 0);
    // true if has a year zero, false if not.
    _defineProperty(this, "hasYearZero", void 0);
    // The number of months in the year.
    _defineProperty(this, "monthsPerYear", void 0);
    // The first month in the year.
    _defineProperty(this, "firstMonth", void 0);
    // The minimum month number.
    _defineProperty(this, "minMonth", void 0);
    // The minimum day number.
    _defineProperty(this, "minDay", void 0);
    // The current localisation in use.
    _defineProperty(this, "local", void 0);
    this.name = name;
    this.jdEpoch = jdEpoch;
    this.daysPerMonth = daysPerMonth;
    this.monthsPerYear = monthsPerYear;
    this.hasYearZero = hasYearZero;
    this.minMonth = minMonth;
    this.firstMonth = firstMonth;
    this.minDay = minDay;
    var local = localisations[language];
    if (!local) {
      console.warn("WARNING: Gregorian localisation ".concat(language, " not found, using default"));
    }
    this.local = local || localisations[''];
  }

  // Create a new date within this calendar - today if no parameters given.

  date(yearOrDate, month, day) {
    if (typeof yearOrDate === 'undefined') {
      return this.fromJSDate(new Date(Date.now()));
    }
    if (yearOrDate instanceof CDate) {
      this.validate('', yearOrDate);
      return new CDate(this, yearOrDate);
    }
    this.validate(Calendars.local.invalidDate, yearOrDate, month, day);
    return new CDate(this, yearOrDate, month, day);
  }

  // Determine whether this date is in a leap year.

  // Retrieve the epoch designator for this date.
  epoch(yearOrDate) {
    var [y] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return y < 0 ? this.local.epochs[0] : this.local.epochs[1];
  }

  // Format the year, if not a simple sequential number.
  formatYear(yearOrDate) {
    var [y] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return pad(Math.abs(y), 4);
  }

  // Retrieve the number of months in a year.
  monthsInYear(yearOrDate) {
    yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay, {
      notDay: true,
      notMonth: true
    });
    return this.monthsPerYear;
  }

  // Calculate the month's ordinal position within the year - for those calendars that don't start at month 1!

  monthOfYear(yearOrDate, month) {
    var [y, m] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidMonth, yearOrDate, month, this.minDay);
    var miy = this.monthsInYear(y);
    return (m + miy - this.firstMonth) % miy + this.minMonth;
  }

  // Calculate actual month from ordinal position, starting from minMonth.
  fromMonthOfYear(year, ord) {
    var m = (ord + this.firstMonth - 2 * this.minMonth) % this.monthsInYear(year) + this.minMonth;
    this.validate(Calendars.local.invalidMonth, year, m, this.minDay);
    return m;
  }

  // Retrieve the week of the year for this date.

  weekOfYear(yearOrDate, month, day) {
    // Find "Sunday" of this week starting on "Sunday"
    var checkDate = yearOrDate instanceof CDate ? this.date(yearOrDate) : this.date(yearOrDate, month, day);
    checkDate = checkDate.add(-checkDate.dayOfWeek(), 'd');
    return Math.floor((checkDate.dayOfYear() - 1) / this.daysInWeek()) + 1;
  }

  // Retrieve the number of days in a year.
  daysInYear(yearOrDate) {
    var [y] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return this.leapYear(y) ? 366 : 365;
  }

  // Retrieve the day of the year for a date.

  dayOfYear(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidDate, yearOrDate, month, day);
    var date = this.date(y, m, d);
    return date.toJD() - this.date(y, this.fromMonthOfYear(y, this.minMonth), this.minDay).toJD() + 1;
  }

  // Retrieve the number of days in the month for this date.

  // Retrieve the number of days in a week.
  daysInWeek() {
    return 7;
  }

  // Retrieve the day of the week for a date.

  dayOfWeek(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidDate, yearOrDate, month, day);
    var date = this.date(y, m, d);
    return (Math.floor(date.toJD()) + 2) % this.daysInWeek();
  }

  // Determine whether this date is a week day.

  // Retrieve additional information about a date - contents depends on calendar.

  extraInfo(yearOrDate, month, day) {
    if (yearOrDate instanceof CDate) {
      this.validate(Calendars.local.invalidDate, yearOrDate);
    } else {
      this.validate(Calendars.local.invalidDate, yearOrDate, month, day);
    }
    return {};
  }

  // Add period(s) to a date. Cater for no year zero.
  add(date, offset, period) {
    this.validate('', date);
    return this.addInternal(date, offset, period);
  }

  // Subtract period(s) from a date. Cater for no year zero.
  sub(date, offset, period) {
    this.validate('', date);
    return this.addInternal(date, -offset, period);
  }

  // Set a portion of the date.
  set(date, value, period) {
    this.validate('', date);
    var y = period === 'y' ? value : date.year();
    var m = period === 'm' ? value : date.month();
    var d = period === 'd' ? value : date.day();
    if (period === 'y' || period === 'm') {
      d = Math.min(d, this.daysInMonth(y, m));
    }
    return date.date(y, m, d);
  }

  // Format a date - see ParseFormat module.

  // @ts-ignore: parameters aren't used - implemented elsewhere
  format(yearOrDate, monthOrPattern, day, pattern) {
    throw new CalendarError('Not implemented yet - load the ParseFormat module');
  }

  // Parse a date - see ParseFormat module.
  // @ts-ignore: parameters aren't used - implemented elsewhere
  parse(value) {
    var pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    throw new CalendarError('Not implemented yet - load the ParseFormat module');
  }

  // Determine whether a date is valid for this calendar.
  isValid(year, month, day) {
    var {
      notDay,
      notMonth
    } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return (this.hasYearZero || year !== 0) && (notMonth || month >= this.minMonth && month - this.minMonth < this.monthsInYear(year)) && (notDay || day >= this.minDay && day - this.minDay < this.daysInMonth(year, month));
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.

  // Create a new date from a Julian day number.

  // Convert the date to a standard (Gregorian) JavaScript Date.

  toJSDate(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof CDate ? this.validate('', yearOrDate) : this.validate(Calendars.local.invalidDate, yearOrDate, month, day);
    return this.gregorianToJSDate(this.gregorianFromJD(this.date(y, m, d).toJD()));
  }

  // Convert the date from a standard (Gregorian) JavaScript Date.
  fromJSDate(jsd) {
    return this.fromJD(this.gregorianToJD(this.gregorianFromJSDate(jsd)));
  }

  // Add period(s) to a date.
  addInternal(date, offset, period) {
    var correctYear = yr => {
      if (yr === 0 && !this.hasYearZero) {
        yr += Math.sign(offset);
      }
      return yr;
    };
    if (period === 'd' || period === 'w') {
      var _jd = date.toJD() + offset * (period === 'w' ? this.daysInWeek() : 1);
      return date.calendar().fromJD(_jd);
    }
    var y = correctYear(date.year() + (period === 'y' ? offset : 0));
    var m = date.monthOfYear() + (period === 'm' ? offset : 0);
    var d = date.day();
    if (period === 'y') {
      if (date.month() !== this.fromMonthOfYear(y, m)) {
        // Hebrew
        m = this.date(y, date.month(), this.minDay).monthOfYear();
      }
      m = Math.min(m, this.monthsInYear(y));
      d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
    } else if (period === 'm') {
      while (m < this.minMonth) {
        y = correctYear(y - 1);
        m += this.monthsInYear(y);
      }
      var yearMonths = this.monthsInYear(y);
      while (m > yearMonths - 1 + this.minMonth) {
        y = correctYear(y + 1);
        m -= yearMonths;
        yearMonths = this.monthsInYear(y);
      }
      d = Math.min(d, this.daysInMonth(y, this.fromMonthOfYear(y, m)));
    }
    return date.date(y, this.fromMonthOfYear(y, m), d);
  }

  // Create a new date from a Julian day number.
  gregorianFromJD(jd) {
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    var z = Math.floor(jd + 0.5);
    var a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    var b = a + 1524;
    var c = Math.floor((b - 122.1) / 365.25);
    var d = Math.floor(365.25 * c);
    var e = Math.floor((b - d) / 30.6001);
    var day = b - d - Math.floor(e * 30.6001);
    var month = e - (e > 13.5 ? 13 : 1);
    var year = c - (month > 2.5 ? 4716 : 4715);
    if (year <= 0) {
      year--;
    } // No year zero
    return [year, month, day];
  }

  // Create a new date from a standard (Gregorian) JavaScript Date.
  gregorianFromJSDate(jsd) {
    return [jsd.getFullYear(), jsd.getMonth() + 1, jsd.getDate()];
  }

  // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.
  gregorianToJD(_ref) {
    var [year, month, day] = _ref;
    if (year < 0) {
      year++;
    } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (month < 3) {
      month += 12;
      year--;
    }
    var a = Math.floor(year / 100);
    var b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
  }

  // Convert this date to a standard (Gregorian) JavaScript Date.
  gregorianToJSDate(_ref2) {
    var [year, month, day] = _ref2;
    var jsd = new Date(year, month - 1, day);
    jsd.setFullYear(year); // < 100 adds 1900 in constructor
    jsd.setHours(0);
    jsd.setMinutes(0);
    jsd.setSeconds(0);
    jsd.setMilliseconds(0);
    // Hours may be non-zero on daylight saving cut-over:
    // > 12 when midnight changeover, but then cannot generate
    // midnight datetime, so jump to 1AM, otherwise reset.
    jsd.setHours(jsd.getHours() > 12 ? jsd.getHours() + 2 : 0);
    return jsd;
  }

  // Check that a candidate date is from the same calendar and is valid.

  validate(error, yearOrDate, month, day, validOptions) {
    if (yearOrDate instanceof CDate) {
      if (this.name !== yearOrDate.calendar().name) {
        throw new CalendarError(Calendars.local.differentCalendars.replace(/\{0\}/, this.local.name).replace(/\{1\}/, yearOrDate.calendar().local.name));
      }
      return [yearOrDate.year(), yearOrDate.month(), yearOrDate.day()];
    } else {
      if (!this.isValid(yearOrDate, month, day, validOptions)) {
        throw new CalendarError(error.replace(/\{0\}/, this.local.name));
      }
      return [yearOrDate, month, day];
    }
  }
}
exports.CalendarBase = CalendarBase;
class Calendars {
  // Obtain a calendar implementation and localisation.
  static instance() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'gregorian';
    var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var calName = name.toLowerCase();
    var cal = this.localCals["".concat(calName, "-").concat(language)];
    if (!cal && this.calendars[calName]) {
      cal = new this.calendars[calName](language);
      this.localCals["".concat(calName, "-").concat(language)] = cal;
    }
    if (!cal) {
      throw new CalendarError(Calendars.local.invalidCalendar.replace(/\{0\}/, name));
    }
    return cal;
  }

  // Create a new date - for today if no other parameters given.

  static date(yearOrDate, month, day, calendar, language) {
    if (yearOrDate instanceof CDate) {
      return yearOrDate.calendar().date(yearOrDate);
    }
    var cal = calendar instanceof CalendarBase ? calendar : this.instance(calendar, language);
    return typeof yearOrDate === 'undefined' ? cal.date() : cal.date(yearOrDate, month, day);
  }

  // Register a new calendar implementation.
  static register(name, implementingClass) {
    var calName = name.toLowerCase();
    if (this.calendars[calName]) {
      throw Calendars.local.alreadyRegistered.replace(/\{0\}/, name);
    }
    this.calendars[calName] = implementingClass;
  }

  // A simple digit substitution function for localising numbers via the Calendar localiseDigits option.
  static localiseDigits(digits) {
    return value => value.replace(/[0-9]/g, match => digits[Number(match)]);
  }

  // A simple digit substitution function for restoring numbers via the Calendar localiseDigits option.
  static normaliseDigits(digits) {
    var re = new RegExp("[".concat(digits.join(''), "]"), 'g');
    return value => value.replace(re, match => "".concat(digits.indexOf(match)));
  }

  // Digit substitution function for localising Chinese style numbers via the Calendar normaliseDigits option.
  static localiseChineseDigits(digits, powers) {
    return value => {
      var localNumber = '';
      var power = 0;
      for (var i = value.length - 1; i >= 0; i -= 1) {
        var units = parseInt(value[i], 10);
        localNumber = "".concat(units === 0 ? '' : "".concat(digits[units]).concat(powers[power])).concat(localNumber);
        power++;
      }
      if (localNumber.indexOf(digits[1] + powers[1]) === 0) {
        localNumber = localNumber.substr(1);
      }
      return localNumber || digits[0];
    };
  }

  // Digit substitution function for restoring Chinese style numbers via the Calendar normaliseDigits option.
  static normaliseChineseDigits(digits, powers) {
    var charsRe = new RegExp("[".concat(powers.join('')).concat(digits.join(''), "]+"), 'g');
    return value => value.replace(charsRe, match => {
      var normNumber = 0;
      var digit = -1;
      var power = 0;
      var index = 0;
      var updateNumber = () => {
        if (digit !== -1) {
          normNumber += digit * (power === -1 ? 1 : Math.pow(10, power));
        } else if (power === 1) {
          // Tens value not needed if value 10-19
          normNumber += 10;
          power = 0;
        }
      };
      while (index < match.length) {
        power = powers.indexOf(match[index]);
        updateNumber();
        digit = digits.indexOf(match[index]);
        index++;
      }
      updateNumber();
      return "".concat(normNumber);
    });
  }
}
_defineProperty(Calendars, "local", {
  alreadyRegistered: 'Calendar already registered: {0}',
  differentCalendars: 'Cannot mix {0} and {1} dates',
  invalidCalendar: 'Calendar {0} not found',
  invalidDate: 'Invalid {0} date',
  invalidMonth: 'Invalid {0} month',
  invalidYear: 'Invalid {0} year'
});
_defineProperty(Calendars, "calendars", {});
_defineProperty(Calendars, "localCals", {});
var _default = exports.default = Calendars;
//# sourceMappingURL=Calendars.js.map