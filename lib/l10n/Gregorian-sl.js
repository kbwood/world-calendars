"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Slovenian localisation for Gregorian/Julian calendars.
   Written by Jaka Jancar (jaka@kubje.org). */

/* c = &#x10D;, s = &#x161; z = &#x17E; C = &#x10C; S = &#x160; Z = &#x17D; */
_Gregorian.GregorianCalendar.localisations.sl = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij', 'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', '&#x10C;etrtek', 'Petek', 'Sobota'],
  dayNamesShort: ['Ned', 'Pon', 'Tor', 'Sre', '&#x10C;et', 'Pet', 'Sob'],
  dayNamesMin: ['Ne', 'Po', 'To', 'Sr', '&#x10C;e', 'Pe', 'So'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-sl.js.map