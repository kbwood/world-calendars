/* http://keith-wood.name/worldCalendars.html
   Polish localisation for Gregorian/Julian calendars.
   Written by Jacek Wysocki (jacek.wysocki@gmail.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.pl = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
  monthNamesShort: ['Sty', 'Lu', 'Mar', 'Kw', 'Maj', 'Cze',
    'Lip', 'Sie', 'Wrz', 'Pa', 'Lis', 'Gru'],
  dayNames: ['Niedziela', 'Poniedzialek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['Nie', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So'],
  dayNamesMin: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
  digits: undefined,
  dateFormat: 'yyyy-mm-dd',
  firstDay: 1,
  isRTL: false
}
