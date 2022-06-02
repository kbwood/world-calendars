/* http://keith-wood.name/worldCalendars.html
   Iniciacion en galego.
   Traducido por Manuel (McNuel@gmx.net). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.gl = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño',
    'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro'],
  monthNamesShort: ['Xan', 'Feb', 'Mar', 'Abr', 'Mai', 'Xuñ',
    'Xul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
  dayNames: ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mér', 'Xov', 'Ven', 'Sáb'],
  dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Xo', 'Ve', 'Sá'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
