/* http://keith-wood.name/worldCalendars.html
   Tatar localisation for Gregorian/Julian calendars.
   Written by Ирек Хаҗиев (khazirek@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.tt = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Гынвар', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: ['Гыйн', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['якшәмбе', 'дүшәмбе', 'сишәмбе', 'чәршәмбе', 'пәнҗешәмбе', 'җомга', 'шимбә'],
  dayNamesShort: ['якш', 'дүш', 'сиш', 'чәр', 'пән', 'җом', 'шим'],
  dayNamesMin: ['Як', 'Дү', 'Си', 'Чә', 'Пә', 'Җо', 'Ши'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
