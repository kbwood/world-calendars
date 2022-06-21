/* http://keith-wood.name/worldCalendars.html
   Croatian localisation for Gregorian/Julian calendars.
   Written by Vjekoslav Nesek. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.hr = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Siječanj', 'Veljača', 'Ožujak', 'Travanj', 'Svibanj', 'Lipanj',
    'Srpanj', 'Kolovoz', 'Rujan', 'Listopad', 'Studeni', 'Prosinac'],
  monthNamesShort: ['Sij', 'Velj', 'Ožu', 'Tra', 'Svi', 'Lip',
    'Srp', 'Kol', 'Ruj', 'Lis', 'Stu', 'Pro'],
  dayNames: ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'],
  dayNamesShort: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
  dayNamesMin: ['Ne', 'Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su'],
  dateFormat: 'dd.mm.yyyy.',
  firstDay: 1,
  isRTL: false
}
