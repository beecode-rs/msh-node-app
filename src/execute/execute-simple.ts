import { EventBus, EventBusPayload } from '../event-bus/event-bus'
import { EventBusType } from '../event-bus/event-bus-type'
import { eventBusUtil } from '../event-bus/event-bus-util'
import { Subscribable } from '../event-bus/subscribable'
import { Unsubscribable } from '../event-bus/unsubscribable'
import { Executable } from './executable'

export class ExecuteSimple<T = any> implements Executable<T>, Subscribable {
  protected readonly _eventBus = new EventBus()

  constructor(protected readonly _name: string, protected readonly _fn: () => Promise<T>) {}

  public execute(): Promise<T> {
    this._eventBus.emit(EventBusType.LOG, `${this._name} Called`)
    return eventBusUtil.startEndEventWrapAndExecute<T>(this._eventBus, this._name, this._fn)
  }

  public subscribe(cb: (message: EventBusPayload) => void): Unsubscribable {
    return this._eventBus.subscribe(cb)
  }
}
