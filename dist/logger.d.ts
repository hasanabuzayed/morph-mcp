declare class MorphLogger {
    private enabled;
    private fileStream;
    constructor();
    debug(component: string, msg: string, data?: Record<string, unknown>): void;
    info(component: string, msg: string, data?: Record<string, unknown>): void;
    warn(component: string, msg: string, data?: Record<string, unknown>): void;
    error(component: string, msg: string, data?: Record<string, unknown>): void;
    enable(): void;
    get isEnabled(): boolean;
    private _log;
}
export declare const logger: MorphLogger;
export {};
