/* http://keith-wood.name/worldCalendars.html
   Hebrew localisation for Gregorian/Julian calendars.
   Written by Amir Hardon (ahardon at gmail dot com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.he = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'],
  dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  dayNamesShort: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
  dayNamesMin: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: true
}
