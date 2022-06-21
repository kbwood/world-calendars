"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Hungarian localisation for Gregorian/Julian calendars.
   Written by Istvan Karaszi (jquerycalendar@spam.raszi.hu). */
_Gregorian.GregorianCalendar.localisations.hu = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Vasárnap', 'Hétfö', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  dayNamesShort: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
  dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  dateFormat: 'yyyy-mm-dd',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-hu.js.map