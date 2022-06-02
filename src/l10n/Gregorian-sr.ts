/* http://keith-wood.name/worldCalendars.html
   Serbian localisation for Gregorian/Julian calendars.
   Written by Dejan Dimić. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.sr = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун',
    'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'],
  monthNamesShort: ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'],
  dayNames: ['Недеља', 'Понедељак', 'Уторак', 'Среда', 'Четвртак', 'Петак', 'Субота'],
  dayNamesShort: ['Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб'],
  dayNamesMin: ['Не', 'По', 'Ут', 'Ср', 'Че', 'Пе', 'Су'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
