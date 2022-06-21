/* http://keith-wood.name/worldCalendars.html
   Italian localisation for Gregorian/Julian calendars.
   Written by Apaella (apaella@gmail.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.it = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
    'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gio', 'Ve', 'Sa'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
