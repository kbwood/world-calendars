import { CalendarBase, CDate } from './Calendars';
import type { DateParts, RegionalLocalisations, ValidOptions } from './Calendars';
type YearInfo = {
    gy: number;
    leap: number;
    march: number;
};
declare class IranianCalendar extends CalendarBase {
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
    isValid(year: number, month: number, day: number, validOptions?: ValidOptions): boolean;
    toJD(date: CDate): number;
    toJD(year: number, month: number, day: number): number;
    fromJD(jd: number): CDate;
    protected d2gy(jd: number): number;
    protected g2d(year: number, month: number, day: number): number;
    protected validate(error: string, date: CDate): DateParts;
    protected validate(error: string, year: number, month: number, day: number, validOptions?: ValidOptions): DateParts;
    protected yearInfo(year: number): YearInfo;
}
export { IranianCalendar };
