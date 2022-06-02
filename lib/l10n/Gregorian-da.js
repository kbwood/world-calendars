"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Danish localisation for Gregorian/Julian calendars.
   Written by Jan Christensen ( deletestuff@gmail.com). */
_Gregorian.GregorianCalendar.localisations.da = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
  dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
  dayNamesMin: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
  digits: undefined,
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false
};
//# sourceMappingURL=Gregorian-da.js.map