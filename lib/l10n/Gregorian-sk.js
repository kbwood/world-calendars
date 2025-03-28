"use strict";

var _Gregorian = require("../Gregorian");
/* http://keith-wood.name/worldCalendars.html
   Slovak localisation for Gregorian/Julian calendars.
   Written by Vojtech Rinik (vojto@hmm.sk). */

_Gregorian.GregorianCalendar.localisations.sk = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Nedel\'a', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota'],
  dayNamesShort: ['Ned', 'Pon', 'Uto', 'Str', 'Štv', 'Pia', 'Sob'],
  dayNamesMin: ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pia', 'So'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 0,
  isRTL: false
};
//# sourceMappingURL=Gregorian-sk.js.map