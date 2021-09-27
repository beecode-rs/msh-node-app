import { EventBus, EventBusPayload } from '../event-bus/event-bus'
import { Subscribable } from '../event-bus/subscribable'
import { Unsubscribable } from '../event-bus/unsubscribable'
import { Executable } from '../execute/executable'
import { ExecuteSimple } from '../execute/execute-simple'
import { Creatable } from './creatable'
import { Destructible } from './destructible'

export type LifeCycleExecutable<T> = Executable<T> & Subscribable
export declare type ObjectType<T> = { new (...args: any[]): T }

export abstract class LifeCycle<T = any> implements Destructible, Creatable, Subscribable {
  protected readonly _eventBus = new EventBus()

  protected abstract _createFn(): Promise<T>
  protected abstract _destroyFn(): Promise<T>

  protected _createExec: LifeCycleExecutable<T>
  protected _destroyExec: LifeCycleExecutable<T>

  public readonly name: string

  protected constructor(
    name: string,
    createExec: ObjectType<LifeCycleExecutable<T>> = ExecuteSimple,
    destroyExec: ObjectType<LifeCycleExecutable<T>> = ExecuteSimple
  ) {
    this.name = name

    this._createExec = new createExec('create ', this._createFn)
    this._destroyExec = new (destroyExec as any)('destroy', this._destroyFn)

    this._createExec.subscribe((p) => this._eventBus.emit(p.type, p.message))
    this._destroyExec.subscribe((p) => this._eventBus.emit(p.type, p.message))
  }

  public create(): Promise<T> {
    return this._createExec.execute()
  }

  public destroy(): Promise<T> {
    return this._destroyExec.execute()
  }

  public subscribe(cb: (message: EventBusPayload) => void): Unsubscribable {
    return this._eventBus.subscribe(cb)
  }
}
