/* http://keith-wood.name/worldCalendars.html
   Catalan localisation for Gregorian/Julian calendars.
   Writers: (joan.leon@gmail.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations.ca = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Gener', 'Febrer', 'Mar&ccedil;', 'Abril', 'Maig', 'Juny',
    'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
  monthNamesShort: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
  dayNames: ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
  dayNamesShort: ['Dug', 'Dln', 'Dmt', 'Dmc', 'Djs', 'Dvn', 'Dsb'],
  dayNamesMin: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
