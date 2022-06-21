/* http://keith-wood.name/worldCalendars.html
   Faroese localisation for Gregorian/Julian calendars.
   Written by Sverri Mohr Olsen, sverrimo@gmail.com */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.fo = {
  name: 'Gregorianskur',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'Mars', 'Apríl', 'Mei', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  dayNames: ['Sunnudagur', 'Mánadagur', 'Týsdagur', 'Mikudagur', 'Hósdagur', 'Fríggjadagur', 'Leyardagur'],
  dayNamesShort: ['Sun', 'Mán', 'Týs', 'Mik', 'Hós', 'Frí', 'Ley'],
  dayNamesMin: ['Su', 'Má', 'Tý', 'Mi', 'Hó', 'Fr', 'Le'],
  dateFormat: 'dd-mm-yyyy',
  firstDay: 0,
  isRTL: false
}
