"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscworldCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Discworld epoch: 1 January 0001 CE (Gregorian)
    super('Discworld', 1721425.5, DiscworldCalendar.localisations, language, [16, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32], 13);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return false;
  } // Retrieve the number of days in a year.


  daysInYear(yearOrDate) {
    yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return 400;
  } // Retrieve the number of days in a month.


  daysInMonth(yearOrDate, month) {
    var [, m] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidMonth, yearOrDate, month, this.minDay, {
      notDay: true
    });
    return this.daysPerMonth[m - 1];
  } // Retrieve the number of days in a week.


  daysInWeek() {
    return 8;
  } // Retrieve the day of the week for a date.


  dayOfWeek(yearOrDate, month, day) {
    var [,, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return (d + 1) % 8;
  } // Determine whether this date is a week day.


  weekDay(yearOrDate, month, day) {
    var dow = yearOrDate instanceof _Calendars.CDate ? this.dayOfWeek(yearOrDate) : this.dayOfWeek(yearOrDate, month, day);
    return dow >= 2 && dow <= 6;
  } // Retrieve additional information about a date - contents depends on calendar.


  extraInfo(yearOrDate, month, day) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);
    return {
      century: centuries[Math.floor((y - 1) / 100) + 1] || ''
    };
  } // Retrieve the Julian day number equivalent for this date, i.e. days since January 1, 4713 BCE Greenwich noon.


  toJD(yearOrDate, month, day) {
    var [y, m, d] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidDate, yearOrDate, month, day);

    if (y < 0) {
      y++;
    }

    return d + (m > 1 ? 16 : 0) + (m > 2 ? (m - 2) * 32 : 0) + (y - 1) * 400 + this.jdEpoch - 1;
  } // Create a new date from a Julian day number.


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

_defineProperty(DiscworldCalendar, "localisations", {
  '': defaultLocalisation
});

_Calendars.default.register('discworld', DiscworldCalendar);
//# sourceMappingURL=Discworld.js.map