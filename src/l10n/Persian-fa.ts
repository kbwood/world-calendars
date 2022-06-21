/* http://keith-wood.name/worldCalendars.html
   Farsi/Persian localisation for Persian calendar.
   Written by Sajjad Servatjoo (sajjad.servatjoo{at}gmail.com) April 2011. */

import Calendars from '../Calendars'
import { PersianCalendar } from '../Persian'

const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

PersianCalendar.localisations.fa = {
  name: 'Persian',
  epochs: ['BP', 'AP'],
  monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  monthNamesShort: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  dayNames: ['يک شنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه', 'شنبه'],
  dayNamesShort: ['يک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'],
  dayNamesMin: ['ي', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  dateFormat: 'yyyy/mm/dd',
  firstDay: 6,
  isRTL: true,
  localiseDigits: Calendars.localiseDigits(farsiDigits),
  normaliseDigits: Calendars.normaliseDigits(farsiDigits)
}
