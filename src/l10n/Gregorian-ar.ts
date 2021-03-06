/* http://keith-wood.name/worldCalendars.html
   Arabic localisation for Gregorian/Julian calendars.
   Khaled Al Horani -- خالد الحوراني -- koko.dw@gmail.com.
   Updated by Fahad Alqahtani April 2016. */
/* NOTE: monthNames are the original months names and they are the Arabic names,
   not the new months name فبراير - يناير and there isn't any Arabic roots for these months */

import Calendars from '../Calendars'
import { GregorianCalendar } from '../Gregorian'

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

GregorianCalendar.localisations.ar = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران',
    'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
  monthNamesShort: 'كانون2_شباط_آذار_نيسان_آذار_حزيران_تموز_آب_أيلول_تشرين1_تشرين2_كانون1'.split('_'),
  dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  dayNamesMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: true,
  localiseDigits: Calendars.localiseDigits(arabicDigits),
  normaliseDigits: Calendars.normaliseDigits(arabicDigits)
}
