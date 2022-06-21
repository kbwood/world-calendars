/* http://keith-wood.name/worldCalendars.html
   Bulgarian localisation for Gregorian/Julian calendars.
   Written by Stoyan Kyosev (http://svest.org). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.bg = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
  monthNamesShort: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни',
    'Юли', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дек'],
  dayNames: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
  dayNamesShort: ['Нед', 'Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб'],
  dayNamesMin: ['Не', 'По', 'Вт', 'Ср', 'Че', 'Пе', 'Съ'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
