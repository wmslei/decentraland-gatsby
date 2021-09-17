export declare class Logger {
    private write;
    log(log: string, data?: Record<string, any>): void;
    warning(log: string, data?: Record<string, any>): void;
    error(log: string, data?: Record<string, any>): void;
}
declare const _default: Logger;
export default _default;
