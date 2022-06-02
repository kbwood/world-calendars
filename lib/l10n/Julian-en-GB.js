"use strict";

var _Julian = require("../Julian");

/* http://keith-wood.name/worldCalendars.html
   English/UK localisation for Gregorian/Julian calendars.
   Stuart. */
_Julian.JulianCalendar.localisations['en-GB'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Julian-en-GB.js.map