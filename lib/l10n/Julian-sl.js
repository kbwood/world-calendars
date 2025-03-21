"use strict";

var _Julian = require("../Julian");
/* http://keith-wood.name/worldCalendars.html
   Slovenian localisation for Gregorian/Julian calendars.
   Written by Jaka Jancar (jaka@kubje.org). */
/* c = &#x10D;, s = &#x161; z = &#x17E; C = &#x10C; S = &#x160; Z = &#x17D; */

_Julian.JulianCalendar.localisations.sl = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', '&#x10C;etrtek', 'Petek', 'Sobota'],
  dayNamesShort: ['Ned', 'Pon', 'Tor', 'Sre', '&#x10C;et', 'Pet', 'Sob'],
  dayNamesMin: ['Ne', 'Po', 'To', 'Sr', '&#x10C;e', 'Pe', 'So'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Julian-sl.js.map