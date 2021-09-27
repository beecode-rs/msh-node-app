import { EventBusType } from './event-bus-type'
import { Subscribable } from './subscribable'
import { Unsubscribable } from './unsubscribable'
import { Observable, Subject, filter } from 'rxjs'

export type EventBusPayload<T = string> = {
  type: EventBusType
  message: T
}

export class EventBus<T = string> implements Subscribable<T> {
  protected readonly _subject = new Subject<EventBusPayload<T>>()

  public emit(type: EventBusType, message: T): void {
    this._subject.next({ type, message })
  }

  public subscribe(cb: (message: EventBusPayload<T>) => void, type?: EventBusType): Unsubscribable {
    const subscription = this._rxjsFilteredSubject(type).subscribe(cb)
    return { unsubscribe: (): void => subscription.unsubscribe() }
  }
  protected _rxjsFilteredSubject(type?: EventBusType): Observable<EventBusPayload<T>> {
    return type ? this._subject.pipe(filter((m: EventBusPayload<T>) => m.type === type)) : this._subject
  }
}
