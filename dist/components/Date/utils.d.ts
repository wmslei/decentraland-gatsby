export declare type DateOptions = {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
export declare enum Time {
    Millisecond = 1,
    Second = 1000,
    Minute = 60000,
    Hour = 3600000,
    Day = 86400000,
    Week = 604800000
}
export declare function toDateOptions(date: Date): DateOptions;
export declare function date(options?: Partial<DateOptions>): Date;
export declare function now(): Date;
export declare function today(): Date;
export declare type ToNameOptions = {
    short?: boolean;
    capitalized?: boolean;
    utc?: boolean;
};
export declare type ToNumberOptions = {
    utc?: boolean;
};
/** @deprecated use `toPrefixedNumber` instead */
export declare function toFixedNumber(value: number): string;
/** @deprecated use `utils/number/pad` instead */
export declare function toPrefixedNumber(value: number, length?: number): string;
/** @deprecated use `utils/Datetime#getDatePadded` instead */
export declare function toDayNumber(date: Date, options?: ToNumberOptions): number;
/** @deprecated use `utils/Datetime#getDateName` instead */
export declare function toDayName(date: Date, options?: ToNameOptions): string;
/** @deprecated use `utils/Datetime#getMonthName` instead */
export declare function toMonthName(date: Date, options?: ToNameOptions): string;
/** @deprecated use `utils/Datetime#getTimezoneName` instead */
export declare function toTimezoneName(value: Date): string;
/** @deprecated use `utils/Datetime#toInputDate` instead */
export declare function toInputDate(date: Date): string;
/** @deprecated use `utils/Datetime#toInputDate` instead */
export declare function toUTCInputDate(date: Date): string;
/** @deprecated use `utils/Datetime@fromInputDate` instead */
export declare function fromInputDate(value: string, base?: Date): Date;
/** @deprecated use `utils/Datetime@fromInputDate` instead */
export declare function fromUTCInputDate(value: string, base?: Date): Date;
/** @deprecated use `utils/Datetime#toInputTime` instead */
export declare function toInputTime(date: Date): string;
/** @deprecated use `utils/Datetime#toInputTime` instead */
export declare function toUTCInputTime(date: Date): string;
/** @deprecated use `utils/Datetime@fromInputTime` instead */
export declare function fromInputTime(value: string, base?: Date): Date;
/** @deprecated use `utils/Datetime@fromInputTime` instead */
export declare function fromUTCInputTime(value: string, base?: Date): Date;
/** @deprecated use `utils/Datetime#toGoogleCalendar` instead */
export declare function toCalendarDate(date: Date): string;
