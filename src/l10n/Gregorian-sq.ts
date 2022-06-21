/* http://keith-wood.name/worldCalendars.html
   Albanian localisation for Gregorian/Julian calendars.
   Written by Flakron Bytyqi (flakron@gmail.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.sq = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
    'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
  monthNamesShort: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer',
    'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
  dayNames: ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtune'],
  dayNamesShort: ['Di', 'Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh'],
  dayNamesMin: ['Di', 'Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
