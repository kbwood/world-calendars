/* http://keith-wood.name/worldCalendars.html
   Romansh localisation for Gregorian/Julian calendars.
   Yvonne Gienal (yvonne.gienal@educa.ch). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.rm = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Schaner', 'Favrer', 'Mars', 'Avrigl', 'Matg', 'Zercladur',
    'Fanadur', 'Avust', 'Settember', 'October', 'November', 'December'],
  monthNamesShort: ['Scha', 'Fev', 'Mar', 'Avr', 'Matg', 'Zer',
    'Fan', 'Avu', 'Sett', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Dumengia', 'Glindesdi', 'Mardi', 'Mesemna', 'Gievgia', 'Venderdi', 'Sonda'],
  dayNamesShort: ['Dum', 'Gli', 'Mar', 'Mes', 'Gie', 'Ven', 'Som'],
  dayNamesMin: ['Du', 'Gl', 'Ma', 'Me', 'Gi', 'Ve', 'So'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
