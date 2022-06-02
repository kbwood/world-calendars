/* http://keith-wood.name/worldCalendars.html
   Basque localisation for Gregorian/Julian calendars.
   Karrikas-ek itzulia (karrikas@karrikas.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.eu = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Urtarrila', 'Otsaila', 'Martxoa', 'Apirila', 'Maiatza', 'Ekaina',
    'Uztaila', 'Abuztua', 'Iraila', 'Urria', 'Azaroa', 'Abendua'],
  monthNamesShort: ['Urt', 'Ots', 'Mar', 'Api', 'Mai', 'Eka',
    'Uzt', 'Abu', 'Ira', 'Urr', 'Aza', 'Abe'],
  dayNames: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata'],
  dayNamesShort: ['Iga', 'Ast', 'Ast', 'Ast', 'Ost', 'Ost', 'Lar'],
  dayNamesMin: ['Ig', 'As', 'As', 'As', 'Os', 'Os', 'La'],
  digits: undefined,
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: false
}
