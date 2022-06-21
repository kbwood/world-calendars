"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Montenegrin localisation for Gregorian/Julian calendars.
   By Miloš Milošević - fleka d.o.o. */
_Gregorian.GregorianCalendar.localisations['me-ME'] = {
  name: 'Gregorijanski',
  epochs: ['pne', 'ne'],
  monthNames: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Neđelja', 'Poneđeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
  dayNamesShort: ['Neđ', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
  dayNamesMin: ['Ne', 'Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-me-ME.js.map