/* http://keith-wood.name/worldCalendars.html
   English/New Zealand localisation for Gregorian/Julian calendars.
   Based on en-GB. */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations['en-NZ'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
