/* http://keith-wood.name/worldCalendars.html
   Romanian localisation for Gregorian/Julian calendars.
   Written by Edmond L. (ll_edmond@walla.com) and Ionut G. Stan (ionut.g.stan@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.ro = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
  monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
    'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
  dayNames: ['Duminică', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
  dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
  dayNamesMin: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
