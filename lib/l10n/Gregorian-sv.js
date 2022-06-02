"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Swedish localisation for Gregorian/Julian calendars.
   Written by Anders Ekdahl (anders@nomadiz.se). */
_Gregorian.GregorianCalendar.localisations.sv = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
  dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
  dayNamesMin: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
  digits: undefined,
  dateFormat: 'yyyy-mm-dd',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-sv.js.map