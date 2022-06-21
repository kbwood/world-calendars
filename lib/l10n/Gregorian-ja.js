"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Gregorian = require("../Gregorian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Japanese localisation for Gregorian/Julian calendars.
   Written by Kentaro SATO (kentaro@ranvis.com). */
var chineseDigits = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var chinesePowers = ['', '十', '百', '千'];
_Gregorian.GregorianCalendar.localisations.ja = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 0,
  isRTL: false,
  localiseDigits: _Calendars.default.localiseChineseDigits(chineseDigits, chinesePowers),
  normaliseDigits: _Calendars.default.normaliseChineseDigits(chineseDigits, chinesePowers)
};
//# sourceMappingURL=Gregorian-ja.js.map