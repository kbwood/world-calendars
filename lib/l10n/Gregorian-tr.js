"use strict";

var _Gregorian = require("../Gregorian");

/* http://keith-wood.name/worldCalendars.html
   Turkish localisation for Gregorian/Julian calendars.
   Written by Izzet Emre Erkan (kara@karalamalar.net). */
_Gregorian.GregorianCalendar.localisations.tr = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
  monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
  dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-tr.js.map