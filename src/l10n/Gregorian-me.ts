/* http://keith-wood.name/worldCalendars.html
   Montenegrin localisation for Gregorian/Julian calendars.
   By Miloš Milošević - fleka d.o.o. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.me = {
  name: 'Грегоријански',
  epochs: ['пне', 'не'],
  monthNames: ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун',
    'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'],
  monthNamesShort: ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун',
    'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец'],
  dayNames: ['Неђеља', 'Понеђељак', 'Уторак', 'Сриједа', 'Четвртак', 'Петак', 'Субота'],
  dayNamesShort: ['Неђ', 'Пон', 'Уто', 'Сри', 'Чет', 'Пет', 'Суб'],
  dayNamesMin: ['Не', 'По', 'Ут', 'Ср', 'Че', 'Пе', 'Су'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
