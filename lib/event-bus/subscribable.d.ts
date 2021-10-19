import { EventBusPayload } from './event-bus';
import { Unsubscribable } from './unsubscribable';
export interface Subscribable<T = string> {
    subscribe(cb: (message: EventBusPayload<T>) => void): Unsubscribable;
}
//# sourceMappingURL=subscribable.d.ts.map