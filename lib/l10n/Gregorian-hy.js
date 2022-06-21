"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Armenian localisation for Gregorian/Julian calendars.
   Written by Levon Zakaryan (levon.zakaryan@gmail.com). */
_Gregorian.GregorianCalendar.localisations.hy = {
  name: 'Gregorian',
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
//# sourceMappingURL=Gregorian-hy.js.map