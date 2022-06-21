/* http://keith-wood.name/worldCalendars.html
   German localisation for Gregorian/Julian calendars.
   Written by Milian Wolff (mail@milianw.de). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.de = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
