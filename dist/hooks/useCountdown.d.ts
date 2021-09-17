export declare type Countdown = {
    /** days until the countdown finish [>=0] */
    days: number;
    /** hours until days prop decreases [>=0]  */
    hours: number;
    /** minutes until hours prop decreases [>=0]  */
    minutes: number;
    /** seconds until minutes prop decreases [>=0]  */
    seconds: number;
    /** milliseconds until seconds decreases [>=0]  */
    milliseconds: number;
    /** milliseconds until the countdown finish [>=0] */
    time: number;
};
export default function useCountdown(until: Pick<Date, 'getTime'>): Countdown;
