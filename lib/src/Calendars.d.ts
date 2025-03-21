type CompareResult = -1 | 0 | 1;
type Period = 'd' | 'm' | 'w' | 'y';
declare class CalendarError extends Error {
}
declare class CDate {
    private cal;
    private yr;
    private mn;
    private dy;
    constructor(calendar: CalendarBase, date: CDate);
    constructor(calendar: CalendarBase, year: number, month: number, day: number);
    date(): CDate;
    date(year: number, month: number, day: number): CDate;
    calendar(): CalendarBase;
    year(value: number): CDate;
    year(): number;
    month(value: number): CDate;
    month(): number;
    day(value: number): CDate;
    day(): number;
    epoch(): string;
    formatYear(): string;
    leapYear(): boolean;
    monthOfYear(): number;
    weekOfYear(): number;
    daysInYear(): number;
    dayOfYear(): number;
    daysInMonth(): number;
    dayOfWeek(): number;
    weekDay(): boolean;
    extraInfo(): Object;
    add(offset: number, period: Period): CDate;
    sub(offset: number, period: Period): CDate;
    set(value: number, period: Period): CDate;
    compareTo(date: CDate): CompareResult;
    format(pattern?: string): string;
    toJD(): number;
    fromJD(jd: number): CDate;
    toJSDate(): Date;
    fromJSDate(jsd: Date): CDate;
    toString(): string;
}
type SubstituteDigits = (value: string) => string;
type CalendarLocalisation = {
    dateFormat: string;
    dayNames: string[];
    dayNamesMin: string[];
    dayNamesShort: string[];
    epochs: string[];
    firstDay: number;
    isRTL: boolean;
    localiseDigits?: SubstituteDigits;
    monthNames: string[];
    monthNamesShort: string[];
    name: string;
    normaliseDigits?: SubstituteDigits;
};
type DateParts = [number, number, number];
type RegionalLocalisations = {
    '': CalendarLocalisation;
    [index: string]: CalendarLocalisation | undefined;
};
type ValidOptions = {
    notDay?: boolean;
    notMonth?: boolean;
};
declare abstract class CalendarBase {
    readonly name: string;
    protected readonly jdEpoch: number;
    protected readonly daysPerMonth: number[];
    protected readonly hasYearZero: boolean;
    protected readonly monthsPerYear: number;
    readonly firstMonth: number;
    readonly minMonth: number;
    readonly minDay: number;
    readonly local: CalendarLocalisation;
    constructor(name: string, jdEpoch: number, localisations: RegionalLocalisations, language: string, daysPerMonth: number[], monthsPerYear?: number, hasYearZero?: boolean, minMonth?: number, firstMonth?: number, minDay?: number);
    date(date?: CDate): CDate;
    date(year: number, month: number, day: number): CDate;
    abstract leapYear(date: CDate): boolean;
    abstract leapYear(year: number): boolean;
    epoch(yearOrDate: CDate | number): string;
    formatYear(yearOrDate: CDate | number): string;
    monthsInYear(yearOrDate: CDate | number): number;
    monthOfYear(date: CDate): number;
    monthOfYear(year: number, month: number): number;
    fromMonthOfYear(year: number, ord: number): number;
    weekOfYear(date: CDate): number;
    weekOfYear(year: number, month: number, day: number): number;
    daysInYear(yearOrDate: CDate | number): number;
    dayOfYear(date: CDate): number;
    dayOfYear(year: number, month: number, day: number): number;
    abstract daysInMonth(date: CDate): number;
    abstract daysInMonth(year: number, month: number): number;
    daysInWeek(): number;
    dayOfWeek(date: CDate): number;
    dayOfWeek(year: number, month: number, day: number): number;
    abstract weekDay(date: CDate): boolean;
    abstract weekDay(year: number, month: number, day: number): boolean;
    extraInfo(date: CDate): Object;
    extraInfo(year: number, month: number, day: number): Object;
    add(date: CDate, offset: number, period: Period): CDate;
    sub(date: CDate, offset: number, period: Period): CDate;
    set(date: CDate, value: number, period: Period): CDate;
    format(date: CDate, pattern?: string): string;
    format(year: number, month: number, day: number, pattern?: string): string;
    parse(value: string, pattern?: string): CDate;
    isValid(year: number, month: number, day: number, { notDay, notMonth }?: ValidOptions): boolean;
    abstract toJD(date: CDate): number;
    abstract toJD(year: number, month: number, day: number): number;
    abstract fromJD(jd: number): CDate;
    toJSDate(date: CDate): Date;
    toJSDate(year: number, month: number, day: number): Date;
    fromJSDate(jsd: Date): CDate;
    private addInternal;
    protected gregorianFromJD(jd: number): DateParts;
    protected gregorianFromJSDate(jsd: Date): DateParts;
    protected gregorianToJD([year, month, day]: DateParts): number;
    protected gregorianToJSDate([year, month, day]: DateParts): Date;
    protected validate(error: string, date: CDate): DateParts;
    protected validate(error: string, year: number, month: number, day: number, validOptions?: ValidOptions): DateParts;
}
type CalendarClass = new (language: string) => CalendarBase;
type CalendarsLocalisation = {
    alreadyRegistered: string;
    differentCalendars: string;
    invalidCalendar: string;
    invalidDate: string;
    invalidMonth: string;
    invalidYear: string;
};
declare class Calendars {
    static local: CalendarsLocalisation;
    private static calendars;
    private static localCals;
    static instance(name?: string, language?: string): CalendarBase;
    static date(date?: CDate): CDate;
    static date(year: number, month: number, day: number, calendar?: (CalendarBase | string), language?: string): CDate;
    static register(name: string, implementingClass: CalendarClass): void;
    static localiseDigits(digits: string[]): SubstituteDigits;
    static normaliseDigits(digits: string[]): SubstituteDigits;
    static localiseChineseDigits(digits: string[], powers: string[]): SubstituteDigits;
    static normaliseChineseDigits(digits: string[], powers: string[]): SubstituteDigits;
}
export type { CalendarLocalisation, CompareResult, DateParts, Period, RegionalLocalisations, SubstituteDigits, ValidOptions };
export { CalendarBase, CalendarError, CDate };
export default Calendars;
