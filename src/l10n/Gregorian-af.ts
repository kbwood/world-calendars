/* http://keith-wood.name/worldCalendars.html
   Afrikaans localisation for Gregorian/Julian calendars.
   Written by Renier Pretorius and Ruediger Thiede. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.af = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie',
    'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember'],
  monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
  dayNamesShort: ['Son', 'Maan', 'Dins', 'Woens', 'Don', 'Vry', 'Sat'],
  dayNamesMin: ['So', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Sa'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
