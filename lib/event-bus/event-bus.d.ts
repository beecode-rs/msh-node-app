import { EventBusType } from './event-bus-type';
import { Subscribable } from './subscribable';
import { Unsubscribable } from './unsubscribable';
import { Observable, Subject } from 'rxjs';
export declare type EventBusPayload<T = string> = {
    type: EventBusType;
    message: T;
};
export declare class EventBus<T = string> implements Subscribable<T> {
    protected readonly _subject: Subject<EventBusPayload<T>>;
    emit(type: EventBusType, message: T): void;
    subscribe(cb: (message: EventBusPayload<T>) => void, type?: EventBusType): Unsubscribable;
    protected _rxjsFilteredSubject(type?: EventBusType): Observable<EventBusPayload<T>>;
}
//# sourceMappingURL=event-bus.d.ts.map