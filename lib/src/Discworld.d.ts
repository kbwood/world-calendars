import { CalendarBase, CDate } from './Calendars';
import type { RegionalLocalisations } from './Calendars';
declare class DiscworldCalendar extends CalendarBase {
    static localisations: RegionalLocalisations;
    constructor(language?: string);
    leapYear(date: CDate): boolean;
    leapYear(year: number): boolean;
    daysInYear(yearOrDate: CDate | number): number;
    daysInMonth(date: CDate): number;
    daysInMonth(year: number, month: number): number;
    daysInWeek(): number;
    dayOfWeek(date: CDate): number;
    dayOfWeek(year: number, month: number, day: number): number;
    weekDay(date: CDate): boolean;
    weekDay(year: number, month: number, day: number): boolean;
    extraInfo(date: CDate): Object;
    extraInfo(year: number, month: number, day: number): Object;
    toJD(date: CDate): number;
    toJD(year: number, month: number, day: number): number;
    fromJD(jd: number): CDate;
}
export { DiscworldCalendar };
