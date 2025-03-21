/* http://keith-wood.name/worldCalendars.html
   Farsi localisation for Iranian calendar.
   From https://www.jqueryscript.net/demo/Persian-Jalali-Calendar-Data-Picker-Plugin-With-jQuery-kamaDatepicker/ March 2025. */

import Calendars from '../Calendars'
import { IranianCalendar } from '../Iranian'

const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

IranianCalendar.localisations.fa = {
  name: 'Iranian',
  epochs: ['BSH', 'SH'],
  monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  dayNames: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'],
  dayNamesShort: ['يک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'],
  dayNamesMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: true,
  localiseDigits: Calendars.localiseDigits(farsiDigits),
  normaliseDigits: Calendars.normaliseDigits(farsiDigits)
}
