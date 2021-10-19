import { EventBus, EventBusPayload } from '../event-bus/event-bus';
import { Subscribable } from '../event-bus/subscribable';
import { Unsubscribable } from '../event-bus/unsubscribable';
import { Executable } from './executable';
import { FunctionArray } from './function-array';
export declare class ExecuteWithHooks<T = any> implements Executable<T>, Subscribable {
    protected _name: string;
    protected _fn: () => Promise<T>;
    protected readonly _eventBus: EventBus<string>;
    protected _postFn: FunctionArray<T>;
    protected _preFn: FunctionArray<T>;
    constructor(_name: string, _fn: () => Promise<T>);
    execute(): Promise<T>;
    subscribe(cb: (message: EventBusPayload) => void): Unsubscribable;
}
//# sourceMappingURL=execute-with-hooks.d.ts.map