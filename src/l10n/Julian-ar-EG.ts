/* http://keith-wood.name/worldCalendars.html
   Arabic localisation for Gregorian/Julian calendars.
   Mahmoud Khaled -- mahmoud.khaled@badrit.com
   NOTE: monthNames are the new months names. */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations['ar-EG'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونية',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  dayNamesMin: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 6,
  isRTL: true
}
