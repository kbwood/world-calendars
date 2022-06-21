/* http://keith-wood.name/worldCalendars.html
   Lithuanian localisation for Gregorian/Julian calendars.
   Arturas Paleicikas <arturas@avalon.lt>. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.lt = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegužė', 'Birželis',
    'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
  monthNamesShort: ['Sau', 'Vas', 'Kov', 'Bal', 'Geg', 'Bir',
    'Lie', 'Rugp', 'Rugs', 'Spa', 'Lap', 'Gru'],
  dayNames: ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis'],
  dayNamesShort: ['sek', 'pir', 'ant', 'tre', 'ket', 'pen', 'šeš'],
  dayNamesMin: ['Se', 'Pr', 'An', 'Tr', 'Ke', 'Pe', 'Še'],
  dateFormat: 'yyyy-mm-dd',
  firstDay: 1,
  isRTL: false
}
