"use strict";

var _Gregorian = require("../Gregorian");
/* http://keith-wood.name/worldCalendars.html
   Swiss French localisation for Gregorian/Julian calendars.
   Written by Martin Voelkle (martin.voelkle@e-tc.ch). */

_Gregorian.GregorianCalendar.localisations['fr-CH'] = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
};
//# sourceMappingURL=Gregorian-fr-CH.js.map