import { LoggerStrategy } from './logger-strategy';
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export declare class ConsoleLogger implements LoggerStrategy {
    private readonly __logLevel;
    constructor(logLevel?: LogLevel);
    private __logLevelToInt;
    private __shouldLog;
    private __logMessage;
    debug(msg: string, obj?: any): void;
    info(msg: string, obj?: any): void;
    warn(msg: string, obj?: any): void;
    error(msg: string, obj?: any): void;
}
//# sourceMappingURL=console-logger.d.ts.map