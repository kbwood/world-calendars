/* http://keith-wood.name/worldCalendars.html
   Spanish/Argentina localisation for Gregorian/Julian calendars.
   Written by Esteban Acosta Villafane (esteban.acosta@globant.com) of Globant (http://www.globant.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations['es-AR'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}
