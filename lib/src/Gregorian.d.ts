import { CalendarBase, CDate } from './Calendars';
import type { RegionalLocalisations } from './Calendars';
declare class GregorianCalendar extends CalendarBase {
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
    toJSDate(date: CDate): Date;
    toJSDate(year: number, month: number, day: number): Date;
    fromJSDate(jsd: Date): CDate;
}
export { GregorianCalendar };
