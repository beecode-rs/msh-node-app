import { LoggerStrategy } from './logger-strategy'

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export class ConsoleLogger implements LoggerStrategy {
  private readonly __logLevel: LogLevel

  public constructor(logLevel: LogLevel = LogLevel.ERROR) {
    this.__logLevel = logLevel
  }

  private __logLevelToInt = (logLevel: LogLevel): number => {
    switch (logLevel) {
      case LogLevel.ERROR:
        return 0
      case LogLevel.WARN:
        return 1
      case LogLevel.INFO:
        return 2
      case LogLevel.DEBUG:
        return 3
      default:
        throw new Error(`Unknown log lever [${logLevel}]`)
    }
  }

  private __shouldLog = (currentLevel: LogLevel): boolean => {
    return this.__logLevelToInt(this.__logLevel) >= this.__logLevelToInt(currentLevel)
  }

  private __logMessage = (type: LogLevel, msg: string, obj?: any): void => {
    if (!this.__shouldLog(type)) return
    // eslint-disable-next-line no-console
    console.log(`${type.toUpperCase()}: ${msg}`)
    // eslint-disable-next-line no-console
    if (obj) console.log(obj)
  }

  public debug(msg: string, obj?: any): void {
    this.__logMessage(LogLevel.DEBUG, msg, obj)
  }

  public info(msg: string, obj?: any): void {
    this.__logMessage(LogLevel.INFO, msg, obj)
  }

  public warn(msg: string, obj?: any): void {
    this.__logMessage(LogLevel.WARN, msg, obj)
  }

  public error(msg: string, obj?: any): void {
    this.__logMessage(LogLevel.ERROR, msg, obj)
  }
}
