/* http://keith-wood.name/worldCalendars.html
   Brazilian Portuguese localisation for Gregorian/Julian calendars.
   Written by Leonildo Costa Silva (leocsilva@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations['pt-BR'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}
