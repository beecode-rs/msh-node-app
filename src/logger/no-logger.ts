import { LoggerStrategy } from './logger-strategy'

export class NoLogger implements LoggerStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public debug(_: string, __?: any): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public error(_: string, __?: any): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public info(_: string, __?: any): void {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public warn(_: string, __?: any): void {
    return
  }
}
