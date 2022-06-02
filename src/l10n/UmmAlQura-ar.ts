/* http://keith-wood.name/worldCalendars.html
   Arabic localisation for UmmAlQura calendar.
   Written by Amro Osama March 2013.
   Updated by Fahad Alqahtani April 2016. */

import Calendars from '../Calendars'
import { UmmAlQuraCalendar } from '../UmmAlQura'

UmmAlQuraCalendar.localisations.ar = {
  name: 'UmmAlQura', // The calendar name
  epochs: ['BAM', 'AM'],
  monthNames: 'محرم_صفر_ربيع الأول_ربيع الثاني_جمادى الأول_جمادى الآخر_رجب_شعبان_رمضان_شوال_ذو القعدة_ذو الحجة'.split('_'),
  monthNamesShort: 'محرم_صفر_ربيع1_ربيع2_جمادى1_جمادى2_رجب_شعبان_رمضان_شوال_القعدة_الحجة'.split('_'),
  dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  dayNamesMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  digits: Calendars.substituteDigits(['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']),
  dateFormat: 'yyyy/mm/dd',
  firstDay: 1,
  isRTL: true
}
