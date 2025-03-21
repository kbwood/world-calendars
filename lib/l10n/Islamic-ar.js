"use strict";

var _Calendars = _interopRequireDefault(require("../Calendars"));
var _Islamic = require("../Islamic");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* http://keith-wood.name/worldCalendars.html
   Arabic localisation for Islamic calendar.
   Written by Fahad Alqahtani April 2016. */

var arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
_Islamic.IslamicCalendar.localisations.ar = {
  name: 'Islamic',
  epochs: ['BAM', 'AM'],
  monthNames: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأول_جمادى الآخر_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
  monthNamesShort: 'محرم_صفر_ربيع1_ربيع2_جمادى1_جمادى2_رجب_شعبان_رمضان_شوال_القعدة_الحجة'.split('_'),
  dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  dayNamesMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: true,
  localiseDigits: _Calendars.default.localiseDigits(arabicDigits),
  normaliseDigits: _Calendars.default.normaliseDigits(arabicDigits)
};
//# sourceMappingURL=Islamic-ar.js.map