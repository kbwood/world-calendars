"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Julian = require("../Julian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Urdu localisation for Gregorian/Julian calendars.
   Mansoor Munib -- mansoormunib@gmail.com <http://www.mansoor.co.nr/mansoor.html>
   Thanks to Habib Ahmed, ObaidUllah Anwar. */
_Julian.JulianCalendar.localisations.ur = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  dayNamesShort: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  dayNamesMin: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  digits: _Calendars.default.substituteDigits(['٠', '١', '٢', '٣', '۴', '۵', '۶', '۷', '٨', '٩']),
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: true
};
//# sourceMappingURL=Julian-ur.js.map