"use strict";

var _Julian = require("../Julian");

/* http://keith-wood.name/worldCalendars.html
   Estonian localisation for Gregorian/Julian calendars.
   Written by Mart Sõmermaa (mrts.pydev at gmail com). */
_Julian.JulianCalendar.localisations.et = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
  monthNamesShort: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni', 'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
  dayNames: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
  dayNamesShort: ['Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
  dayNamesMin: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Julian-et.js.map