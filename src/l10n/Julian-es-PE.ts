/* http://keith-wood.name/worldCalendars.html
   Spanish/Perú localisation for Gregorian/Julian calendars.
   Written by Fischer Tirado (fishdev@globant.com) of ASIX (http://www.asixonline.com). */

import { JulianCalendar } from '../Julian'

JulianCalendar.localisations['es-PE'] = {
  name: 'Julian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  dateFormat: 'dd/mm/yyyy',
  firstDay: 0,
  isRTL: false
}
