"use strict";

var _Gregorian = require("../Gregorian");
/* http://keith-wood.name/worldCalendars.html
   Icelandic localisation for Gregorian/Julian calendars.
   Written by Haukur H. Thorsson (haukur@eskill.is). */

_Gregorian.GregorianCalendar.localisations.is = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'],
  dayNames: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'],
  dayNamesShort: ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'],
  dayNamesMin: ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
};
//# sourceMappingURL=Gregorian-is.js.map