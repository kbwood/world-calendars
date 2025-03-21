"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));
var _Gregorian = require("../Gregorian");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* http://keith-wood.name/worldCalendars.html
   Urdu localisation for Gregorian/Julian calendars.
   Mansoor Munib -- mansoormunib@gmail.com <http://www.mansoor.co.nr/mansoor.html>
   Thanks to Habib Ahmed, ObaidUllah Anwar. */

var urduDigits = ['٠', '١', '٢', '٣', '۴', '۵', '۶', '۷', '٨', '٩'];
_Gregorian.GregorianCalendar.localisations.ur = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  dayNamesShort: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  dayNamesMin: ['اتوار', 'پير', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: true,
  localiseDigits: _Calendars.default.localiseDigits(urduDigits),
  normaliseDigits: _Calendars.default.normaliseDigits(urduDigits)
};
//# sourceMappingURL=Gregorian-ur.js.map