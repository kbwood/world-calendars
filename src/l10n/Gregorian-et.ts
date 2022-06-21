/* http://keith-wood.name/worldCalendars.html
   Estonian localisation for Gregorian/Julian calendars.
   Written by Mart Sõmermaa (mrts.pydev at gmail com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.et = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni',
    'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
  monthNamesShort: ['Jaan', 'Veebr', 'Märts', 'Apr', 'Mai', 'Juuni',
    'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
  dayNames: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
  dayNamesShort: ['Pühap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
  dayNamesMin: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
