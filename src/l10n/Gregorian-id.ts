/* http://keith-wood.name/worldCalendars.html
   Indonesian localisation for Gregorian/Julian calendars.
   Written by Deden Fathurahman (dedenf@gmail.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.id = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agus', 'Sep', 'Okt', 'Nop', 'Des'],
  dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'kam', 'Jum', 'Sab'],
  dayNamesMin: ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'jm', 'Sb'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}
