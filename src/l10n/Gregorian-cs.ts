/* http://keith-wood.name/worldCalendars.html
   Czech localisation for Gregorian/Julian calendars.
   Written by Tomas Muller (tomas@tomas-muller.net). */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.cs = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen',
    'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
  monthNamesShort: ['led', 'úno', 'bře', 'dub', 'kvě', 'čer',
    'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
  dayNames: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'],
  dayNamesShort: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  dayNamesMin: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  dateFormat: 'dd.mm.yyyy',
  firstDay: 1,
  isRTL: false
}
