"use strict";

var _Julian = require("../Julian");

/* http://keith-wood.name/worldCalendars.html
   Dutch localisation for Gregorian/Julian calendars.
   Written by Mathias Bynens <http://mathiasbynens.be/>. */
_Julian.JulianCalendar.localisations.nl = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
  dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Julian-nl.js.map