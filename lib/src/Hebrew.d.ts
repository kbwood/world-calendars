import { CalendarBase, CDate } from './Calendars';
import type { RegionalLocalisations } from './Calendars';
declare class HebrewCalendar extends CalendarBase {
    static localisations: RegionalLocalisations;
    constructor(language?: string);
    leapYear(date: CDate): boolean;
    leapYear(year: number): boolean;
    monthsInYear(yearOrDate: CDate | number): number;
    daysInYear(yearOrDate: CDate | number): number;
    daysInMonth(date: CDate): number;
    daysInMonth(year: number, month: number): number;
    weekDay(date: CDate): boolean;
    weekDay(year: number, month: number, day: number): boolean;
    extraInfo(date: CDate): Object;
    extraInfo(year: number, month: number, day: number): Object;
    toJD(date: CDate): number;
    toJD(year: number, month: number, day: number): number;
    fromJD(jd: number): CDate;
    private delay1;
    private delay2;
    private isLeapYear;
}
export { HebrewCalendar };
