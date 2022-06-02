/* http://keith-wood.name/worldCalendars.html
   Georgian localisation for Gregorian/Julian calendars.
   Andrei Gorbushkin. */

import { GregorianCalendar } from '../Gregorian'

GregorianCalendar.localisations.ka = {
  name: 'Gregorian',
  epochs: ['BCE', 'CE'],
  monthNames: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
  monthNamesShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაისი', 'ივნ',
    'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
  dayNames: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
  dayNamesShort: ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  dayNamesMin: ['კვ', 'ორ', 'სმ', 'ოთ', 'ხშ', 'პრ', 'შბ'],
  digits: undefined,
  dateFormat: 'dd/mm/yyyy',
  firstDay: 1,
  isRTL: false
}
