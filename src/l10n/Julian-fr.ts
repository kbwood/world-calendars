/* http://keith-wood.name/worldCalendars.html
   French localisation for Gregorian/Julian calendar.
   Stéphane Nahmani (sholby@sholby.net). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.fr = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
    'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
