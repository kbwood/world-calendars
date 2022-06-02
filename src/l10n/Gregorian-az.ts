/* http://keith-wood.name/worldCalendars.html
   Azerbaijani localisation for Gregorian/Julian calendars.
   Written by Jamil Najafov (necefov33@gmail.com). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.az = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
  monthNamesShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun',
    'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
  dayNames: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
  dayNamesShort: ['B', 'Be', 'Ça', 'Ç', 'Ca', 'C', 'Ş'],
  dayNamesMin: ['B', 'B', 'Ç', 'С', 'Ç', 'C', 'Ş'],
  digits: undefined,
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
