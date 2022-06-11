import { CalendarBase, CDate } from './Calendars';
import './Gregorian';
import type { RegionalLocalisations } from './Calendars';
declare class NanakshahiCalendar extends CalendarBase {
    static localisations: RegionalLocalisations;
    static gregorian: CalendarBase;
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
}
export { NanakshahiCalendar };
