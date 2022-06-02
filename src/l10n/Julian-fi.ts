/* http://keith-wood.name/worldCalendars.html
   Finnish localisation for Gregorian/Julian calendars.
   Written by Harri Kilpiö (harrikilpio@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.fi = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kes&auml;kuu',
    'Hein&auml;kuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
  monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kes&auml;',
    'Hein&auml;', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
  dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'Su'],
  dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
  dayNamesMin: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
