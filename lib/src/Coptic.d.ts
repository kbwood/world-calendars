import { BaseCalendar, CDate } from './Calendars';
import type { RegionalLocalisations } from './Calendars';
declare class CopticCalendar extends BaseCalendar {
    static localisations: RegionalLocalisations;
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
export { CopticCalendar };
