/* http://keith-wood.name/worldCalendars.html
   Algerian (and Tunisian) Arabic localisation for Gregorian/Julian calendars.
   Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations['ar-DZ'] = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
    'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesMin: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 6,
  isRTL: true
}
