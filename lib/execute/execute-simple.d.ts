import { EventBus, EventBusPayload } from '../event-bus/event-bus';
import { Subscribable } from '../event-bus/subscribable';
import { Unsubscribable } from '../event-bus/unsubscribable';
import { Executable } from './executable';
export declare class ExecuteSimple<T = any> implements Executable<T>, Subscribable {
    protected readonly _name: string;
    protected readonly _fn: () => Promise<T>;
    protected readonly _eventBus: EventBus<string>;
    constructor(_name: string, _fn: () => Promise<T>);
    execute(): Promise<T>;
    subscribe(cb: (message: EventBusPayload) => void): Unsubscribable;
}
//# sourceMappingURL=execute-simple.d.ts.map