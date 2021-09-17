import dayjs from 'dayjs';
declare module 'dayjs' {
    const Millisecond: number;
    const Second: number;
    const Minute: number;
    const Hour: number;
    const Day: number;
    const Week: number;
    const Formats: {
        GoogleCalendar: string;
        InputDate: string;
        InputTime: string;
    };
    function date(value?: undefined | null): null;
    function date(value: string | number | Date | dayjs.Dayjs): Date;
    function date(value?: undefined | null | string | number | Date | dayjs.Dayjs): Date | null;
    const from: typeof dayjs;
    const isTime: typeof dayjs.isDayjs;
    interface Dayjs {
        getTime(): number;
        toJSON(): string;
    }
}
