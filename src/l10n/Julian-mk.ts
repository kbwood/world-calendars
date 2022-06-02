/* http://keith-wood.name/worldCalendars.html
   Македонски MK localisation for Gregorian/Julian calendars.
   Hajan Selmani (hajan [at] live [dot] com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.mk = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
    'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
  monthNamesShort: ['Јан', 'Фев', 'Мар', 'Апр', 'Мај', 'Јун',
    'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дек'],
  dayNames: ['Недела', 'Понеделник', 'Вторник', 'Среда', 'Четврток', 'Петок', 'Сабота'],
  dayNamesShort: ['Нед', 'Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб'],
  dayNamesMin: ['Не', 'По', 'Вт', 'Ср', 'Че', 'Пе', 'Са'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
