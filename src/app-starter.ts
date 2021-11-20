import { AppFlow } from './app-flow'
import { logger } from './util/logger'

export enum AppStarterStatus {
  STARTED = 'started',
  STOPPED = 'stopped',
}

export declare type AppFlowObjectType<T extends AppFlow = any> = { new (): T }

export class AppStarter {
  protected _flow: AppFlow
  protected _status: AppStarterStatus = AppStarterStatus.STOPPED

  constructor(appFlow: AppFlow) {
    this._flow = appFlow
  }

  public async start(): Promise<void> {
    try {
      if (this._status === AppStarterStatus.STARTED) {
        logger().warn('App already started')
        return
      }
      this._status = AppStarterStatus.STARTED
      await this._flow.create()
      this._registerOnExit()
    } catch (err) {
      await this._onError(err as Error)
    }
  }

  protected _registerOnExit(): void {
    ;['SIGTERM', 'SIGINT'].forEach((signal: string) => {
      process.on(signal, () => {
        this._gracefulStop().catch((err) => logger().error(err))
      })
    })
  }

  protected async _gracefulStop(): Promise<void> {
    await this.stop()
    process.exit(0)
  }

  protected async _onError(err: Error): Promise<void> {
    logger().error(err.message)
    await this.stop()
    process.exit(1)
  }

  public async stop(): Promise<void> {
    if (this._status === AppStarterStatus.STOPPED) {
      logger().warn('App already stopped')
      return
    }
    this._status = AppStarterStatus.STOPPED
    await this._flow.destroy()
  }
}

export const appStarterFactory = (appFlow: AppFlowObjectType): AppStarter => new AppStarter(new appFlow())
