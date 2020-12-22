"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class ConsoleLogger {
    constructor(logLevel = LogLevel.ERROR) {
        this.__logLevelToInt = (logLevel) => {
            switch (logLevel) {
                case LogLevel.ERROR:
                    return 0;
                case LogLevel.WARN:
                    return 1;
                case LogLevel.INFO:
                    return 2;
                case LogLevel.DEBUG:
                    return 3;
                default:
                    throw new Error(`Unknown log lever [${logLevel}]`);
            }
        };
        this.__shouldLog = (currentLevel) => {
            return this.__logLevelToInt(this.__logLevel) >= this.__logLevelToInt(currentLevel);
        };
        this.__logMessage = (type, msg, obj) => {
            if (!this.__shouldLog(type))
                return;
            // eslint-disable-next-line no-console
            console.log(`${type.toUpperCase()}: ${msg}`);
            // eslint-disable-next-line no-console
            if (obj)
                console.log(obj);
        };
        this.__logLevel = logLevel;
    }
    debug(msg, obj) {
        this.__logMessage(LogLevel.DEBUG, msg, obj);
    }
    info(msg, obj) {
        this.__logMessage(LogLevel.INFO, msg, obj);
    }
    warn(msg, obj) {
        this.__logMessage(LogLevel.WARN, msg, obj);
    }
    error(msg, obj) {
        this.__logMessage(LogLevel.ERROR, msg, obj);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console-logger.js.map