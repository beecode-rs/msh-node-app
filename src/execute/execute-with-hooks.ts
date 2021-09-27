import { EventBus, EventBusPayload } from '../event-bus/event-bus'
import { EventBusType } from '../event-bus/event-bus-type'
import { eventBusUtil } from '../event-bus/event-bus-util'
import { Subscribable } from '../event-bus/subscribable'
import { Unsubscribable } from '../event-bus/unsubscribable'
import { Executable } from './executable'
import { FunctionArray } from './function-array'

export class ExecuteWithHooks<T = any> implements Executable<T>, Subscribable {
  protected readonly _eventBus = new EventBus()
  protected _postFn = new FunctionArray<T>()
  protected _preFn = new FunctionArray<T>()

  constructor(protected _name: string, protected _fn: () => Promise<T>) {}

  public async execute(): Promise<T> {
    this._eventBus.emit(EventBusType.LOG, `${this._name} Called`)
    if (this._preFn.HasFns)
      await eventBusUtil.startEndEventWrapAndExecute<T>(this._eventBus, `Pre  ${this._name}`, this._preFn.execAll)
    const result = await eventBusUtil.startEndEventWrapAndExecute<T>(this._eventBus, this._name, this._fn)
    if (this._postFn.HasFns)
      await eventBusUtil.startEndEventWrapAndExecute<T>(this._eventBus, `Post ${this._name}`, this._postFn.execAll)
    return result
  }

  public subscribe(cb: (message: EventBusPayload) => void): Unsubscribable {
    return this._eventBus.subscribe(cb)
  }
}
