/* http://keith-wood.name/worldCalendars.html
   Maltese localisation for Gregorian/Julian calendars.
   Written by Chritian Sciberras (uuf6429@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.mt = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Jannar', 'Frar', 'Marzu', 'April', 'Mejju', 'Ġunju',
    'Lulju', 'Awissu', 'Settembru', 'Ottubru', 'Novembru', 'Diċembru'],
  monthNamesShort: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun',
    'Lul', 'Awi', 'Set', 'Ott', 'Nov', 'Diċ'],
  dayNames: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
  dayNamesShort: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
  dayNamesMin: ['Ħ', 'T', 'T', 'E', 'Ħ', 'Ġ', 'S'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
