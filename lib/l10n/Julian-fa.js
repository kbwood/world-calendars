"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Julian = require("../Julian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Farsi/Persian localisation for Gregorian/Julian calendars.
   Javad Mowlanezhad -- jmowla@gmail.com */
var farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
_Julian.JulianCalendar.localisations.fa = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  dayNamesMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: true,
  localiseDigits: _Calendars.default.localiseDigits(farsiDigits),
  normaliseDigits: _Calendars.default.normaliseDigits(farsiDigits)
};
//# sourceMappingURL=Julian-fa.js.map