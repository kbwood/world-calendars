import { CalendarBase, CDate } from './Calendars';
import './Gregorian';
import type { RegionalLocalisations } from './Calendars';
declare class NepaliCalendar extends CalendarBase {
    static localisations: RegionalLocalisations;
    static gregorian: CalendarBase;
    static defaultDaysPerYear: number;
    constructor(language?: string);
    leapYear(date: CDate): boolean;
    leapYear(year: number): boolean;
    daysInYear(yearOrDate: CDate | number): number;
    daysInMonth(date: CDate): number;
    daysInMonth(year: number, month: number): number;
    weekDay(date: CDate): boolean;
    weekDay(year: number, month: number, day: number): boolean;
    toJD(date: CDate): number;
    toJD(year: number, month: number, day: number): number;
    fromJD(jd: number): CDate;
    private createMissingCalendarData;
}
export { NepaliCalendar };
