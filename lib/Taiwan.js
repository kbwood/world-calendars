"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaiwanCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

require("./Gregorian");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultLocalisation = {
  name: 'Taiwan',
  epochs: ['BROC', 'ROC'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: false
};

class TaiwanCalendar extends _Calendars.CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Taiwan epoch: 1 January 1912 CE (Gregorian)
    super('Taiwan', 2419402.5, TaiwanCalendar.localisations[language] || TaiwanCalendar.localisations[''], [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return TaiwanCalendar.gregorian.leapYear(this.taiwanToGregorianYear(y));
  } // Determine the week of the year for a date - ISO 8601.


  weekOfYear(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, month, day);
    return TaiwanCalendar.gregorian.weekOfYear(this.taiwanToGregorianYear(y), m, d);
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
    return TaiwanCalendar.gregorian.toJD(this.taiwanToGregorianYear(y), m, d);
  } // Create a new date from a Julian day number.


  fromJD(jd) {
    var date = TaiwanCalendar.gregorian.fromJD(jd);
    return this.date(this.gregorianToTaiwanYear(date.year()), date.month(), date.day());
  } // Convert Taiwan to Gregorian year.


  taiwanToGregorianYear(year) {
    return year + TaiwanCalendar.yearsOffset + (year >= -TaiwanCalendar.yearsOffset && year <= -1 ? 1 : 0);
  } // Convert Gregorian to Taiwan year.


  gregorianToTaiwanYear(year) {
    return year - TaiwanCalendar.yearsOffset - (year >= 1 && year <= TaiwanCalendar.yearsOffset ? 1 : 0);
  }

}

exports.TaiwanCalendar = TaiwanCalendar;

_defineProperty(TaiwanCalendar, "localisations", {
  '': defaultLocalisation
});

_defineProperty(TaiwanCalendar, "gregorian", _Calendars.default.instance('gregorian'));

_defineProperty(TaiwanCalendar, "yearsOffset", 1911);

_Calendars.default.register('taiwan', TaiwanCalendar);
//# sourceMappingURL=Taiwan.js.map