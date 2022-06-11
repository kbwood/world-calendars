"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IslamicCalendar = void 0;

var _Calendars = _interopRequireWildcard(require("./Calendars"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultLocalisation = {
  name: 'Islamic',
  epochs: ['BH', 'AH'],
  monthNames: ['Muharram', 'Safar', 'Rabi\' al-awwal', 'Rabi\' al-thani', 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', 'Sha\'aban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
  monthNamesShort: ['Muh', 'Saf', 'Rab1', 'Rab2', 'Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw', 'DhuQ', 'DhuH'],
  dayNames: ['Yawm al-ahad', 'Yawm al-ithnayn', 'Yawm ath-thulaathaa\'', 'Yawm al-arbi\'aa\'', 'Yawm al-khamīs', 'Yawm al-jum\'a', 'Yawm as-sabt'],
  dayNamesShort: ['Aha', 'Ith', 'Thu', 'Arb', 'Kha', 'Jum', 'Sab'],
  dayNamesMin: ['Ah', 'It', 'Th', 'Ar', 'Kh', 'Ju', 'Sa'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: false
};

class IslamicCalendar extends _Calendars.CalendarBase {
  // Localisations for the plugin.
  // Entries are objects indexed by the language code ('' being the default US/English). */
  constructor() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    // Julian date of start of Islamic epoch: 16 July 622 CE (Gregorian).
    super('Islamic', 1948439.5, IslamicCalendar.localisations[language] || IslamicCalendar.localisations[''], [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29]);
  } // Determine whether this date is in a leap year.


  leapYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);

    if (y < 0) {
      y++;
    }

    ; // No year zero

    return (y * 11 + 14) % 30 < 11;
  } // Retrieve the number of days in a year.


  daysInYear(yearOrDate) {
    var [y] = yearOrDate instanceof _Calendars.CDate ? this.validate('', yearOrDate) : this.validate(_Calendars.default.local.invalidYear, yearOrDate, this.minMonth, this.minDay);
    return this.leapYear(y) ? 355 : 354;
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

    if (y <= 0) {
      y++;
    } // No year zero


    return d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + this.jdEpoch - 1;
  } // Create a new date from a Julian day number.


  fromJD(jd) {
    jd = Math.floor(jd) + 0.5;
    var year = Math.floor((30 * (jd - this.jdEpoch) + 10646) / 10631);
    year = year <= 0 ? year - 1 : year;
    var month = Math.min(12, Math.ceil((jd - 29 - this.toJD(year, 1, 1)) / 29.5) + 1);
    var day = jd - this.toJD(year, month, 1) + 1;
    return this.date(year, month, day);
  }

}

exports.IslamicCalendar = IslamicCalendar;

_defineProperty(IslamicCalendar, "localisations", {
  '': defaultLocalisation
});

_Calendars.default.register('islamic', IslamicCalendar);
//# sourceMappingURL=Islamic.js.map