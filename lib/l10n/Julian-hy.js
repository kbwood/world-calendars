"use strict";

var _Julian = require("../Julian");

/* http://keith-wood.name/worldCalendars.html
   Armenian localisation for Gregorian/Julian calendars.
   Written by Levon Zakaryan (levon.zakaryan@gmail.com). */
_Julian.JulianCalendar.localisations.hy = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'],
  monthNamesShort: ['Հունվ', 'Փետր', 'Մարտ', 'Ապր', 'Մայիս', 'Հունիս', 'Հուլ', 'Օգս', 'Սեպ', 'Հոկ', 'Նոյ', 'Դեկ'],
  dayNames: ['կիրակի', 'եկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ'],
  dayNamesShort: ['կիր', 'երկ', 'երք', 'չրք', 'հնգ', 'ուրբ', 'շբթ'],
  dayNamesMin: ['կիր', 'երկ', 'երք', 'չրք', 'հնգ', 'ուրբ', 'շբթ'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Julian-hy.js.map