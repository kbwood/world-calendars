/* http://keith-wood.name/worldCalendars.html
   Norwegian localisation for Gregorian/Julian calendars.
   Written by Naimdjon Takhirov (naimdjon@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.no = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  dayNames: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'],
  dayNamesShort: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
  dayNamesMin: ['Sø', 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
