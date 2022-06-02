/* http://keith-wood.name/worldCalendars.html
   Ukrainian localisation for Gregorian/Julian calendars.
   Written by Maxim Drogobitskiy (maxdao@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.uk = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
  monthNamesShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер',
    'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
  dayNames: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п\'ятниця', 'субота'],
  dayNamesShort: ['нед', 'пнд', 'вів', 'срд', 'чтв', 'птн', 'сбт'],
  dayNamesMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}