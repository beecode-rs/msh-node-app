import { CallBackFn, FunctionArray, IFunctionArray } from '.'
import { LoggerStrategy, NoLogger } from '@beecode/msh-node-log'

export type InitiateOptions = {
  name: string
  initiateFn?: CallBackFn
  destroyFn?: CallBackFn
}

export class Initiate {
  private readonly __name: string
  private __loggerStrategy = new NoLogger()
  private __preInitFn: IFunctionArray = new FunctionArray()
  private __postInitFn: IFunctionArray = new FunctionArray()
  private __preDestroyFn: IFunctionArray = new FunctionArray()
  private __postDestroyFn: IFunctionArray = new FunctionArray()
  private readonly __initFn: CallBackFn | undefined
  private readonly __destroyFn: CallBackFn | undefined

  public get Name(): string {
    return this.__name
  }

  public set Logger(loggerStrategy: LoggerStrategy) {
    this.__loggerStrategy = loggerStrategy
  }
  protected get _Logger(): LoggerStrategy {
    return this.__loggerStrategy
  }

  public constructor(options: InitiateOptions) {
    this.__initFn = options.initiateFn
    this.__destroyFn = options.destroyFn
    this.__name = options.name
  }

  public async initiate(): Promise<void> {
    this._Logger.debug(`${this.Name} - Init Called`)

    if (this.__preInitFn.HasFns) {
      this._Logger.debug(`${this.Name} - START - Pre Init`)
      await this.__preInitFn.execAll()
      this._Logger.debug(`${this.Name} - END   - Pre Init`)
    }
    if (this.__initFn) {
      this._Logger.debug(`${this.Name} - START - Init`)
      await this.__initFn()
      this._Logger.debug(`${this.Name} - END   - Init`)
    }
    if (this.__postInitFn.HasFns) {
      this._Logger.debug(`${this.Name} - START - Post Init`)
      await this.__postInitFn.execAll()
      this._Logger.debug(`${this.Name} - END   - Post Init`)
    }
  }

  public onPreInit = this.__preInitFn.append
  public onPostInit = this.__postInitFn.append
  public onPreDestroy = this.__preDestroyFn.append
  public onPostDestroy = this.__postDestroyFn.append

  public async destroy(): Promise<void> {
    this._Logger.debug(`${this.Name} - Destroy Called`)
    if (this.__preDestroyFn.HasFns) {
      this._Logger.debug(`${this.Name} - START - Pre Destroy`)
      await this.__preDestroyFn.execAll()
      this._Logger.debug(`${this.Name} - END   - Pre Destroy`)
    }
    if (this.__destroyFn) {
      this._Logger.debug(`${this.Name} - START - Destroy`)
      await this.__destroyFn()
      this._Logger.debug(`${this.Name} - END   - Destroy`)
    }
    if (this.__postDestroyFn.HasFns) {
      this._Logger.debug(`${this.Name} - START - Post Destroy`)
      await this.__postDestroyFn.execAll()
      this._Logger.debug(`${this.Name} - END   - Post Destroy`)
    }
  }
}
