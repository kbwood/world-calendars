"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));

var _Gregorian = require("../Gregorian");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* http://keith-wood.name/worldCalendars.html
   Traditional Chinese localisation for Gregorian/Julian calendars.
   Written by Ressol (ressol@gmail.com). */
_Gregorian.GregorianCalendar.localisations['zh-TW'] = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
  digits: _Calendars.default.substituteChineseDigits(['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'], ['', '十', '百', '千']),
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-zh-TW.js.map