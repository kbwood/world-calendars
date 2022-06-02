/* http://keith-wood.name/worldCalendars.html
   Esperanto localisation for Gregorian/Julian calendars.
   Written by Olivier M. (olivierweb@ifrance.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.eo = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januaro', 'Februaro', 'Marto', 'Aprilo', 'Majo', 'Junio',
    'Julio', 'Aŭgusto', 'Septembro', 'Oktobro', 'Novembro', 'Decembro'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun',
    'Jul', 'Aŭg', 'Sep', 'Okt', 'Nov', 'Dec'],
  dayNames: ['Dimanĉo', 'Lundo', 'Mardo', 'Merkredo', 'Ĵaŭdo', 'Vendredo', 'Sabato'],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Ĵaŭ', 'Ven', 'Sab'],
  dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Ĵa', 'Ve', 'Sa'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}
