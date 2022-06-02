"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Julian = require("../Julian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Farsi/Persian localisation for Gregorian/Julian calendars.
   Javad Mowlanezhad -- jmowla@gmail.com */
_Julian.JulianCalendar.localisations.fa = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  dayNamesMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  digits: _Calendars.default.substituteDigits(['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']),
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: true
};
//# sourceMappingURL=Julian-fa.js.map