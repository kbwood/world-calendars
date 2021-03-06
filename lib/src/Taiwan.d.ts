import { CalendarBase, CDate } from './Calendars';
import './Gregorian';
import type { RegionalLocalisations } from './Calendars';
declare class TaiwanCalendar extends CalendarBase {
    static localisations: RegionalLocalisations;
    static gregorian: CalendarBase;
    static readonly yearsOffset: number;
    constructor(language?: string);
    leapYear(date: CDate): boolean;
    leapYear(year: number): boolean;
    weekOfYear(date: CDate): number;
    weekOfYear(year: number, month: number, day: number): number;
    daysInMonth(date: CDate): number;
    daysInMonth(year: number, month: number): number;
    weekDay(date: CDate): boolean;
    weekDay(year: number, month: number, day: number): boolean;
    toJD(date: CDate): number;
    toJD(year: number, month: number, day: number): number;
    fromJD(jd: number): CDate;
    private taiwanToGregorianYear;
    private gregorianToTaiwanYear;
}
export { TaiwanCalendar };
