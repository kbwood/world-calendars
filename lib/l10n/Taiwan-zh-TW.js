"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));
var _Taiwan = require("../Taiwan");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* http://keith-wood.name/worldCalendars.html
   Traditional Chinese localisation for Taiwanese calendars.
   Written by Ressol (ressol@gmail.com). */

var chineseDigits = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var chinesePowers = ['', '十', '百', '千'];
_Taiwan.TaiwanCalendar.localisations['zh-TW'] = {
  name: 'Taiwan',
  epochs: ['BROC', 'ROC'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: false,
  localiseDigits: _Calendars.default.localiseChineseDigits(chineseDigits, chinesePowers),
  normaliseDigits: _Calendars.default.normaliseChineseDigits(chineseDigits, chinesePowers)
};
//# sourceMappingURL=Taiwan-zh-TW.js.map