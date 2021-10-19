import { EventBus, EventBusPayload } from '../event-bus/event-bus';
import { Subscribable } from '../event-bus/subscribable';
import { Unsubscribable } from '../event-bus/unsubscribable';
import { Executable } from '../execute/executable';
import { Creatable } from './creatable';
import { Destructible } from './destructible';
export declare type LifeCycleExecutable<T> = Executable<T> & Subscribable;
export declare type ObjectType<T> = {
    new (...args: any[]): T;
};
export declare abstract class LifeCycle<T = any> implements Destructible, Creatable, Subscribable {
    protected readonly _eventBus: EventBus<string>;
    protected abstract _createFn(): Promise<T>;
    protected abstract _destroyFn(): Promise<T>;
    protected _createExec: LifeCycleExecutable<T>;
    protected _destroyExec: LifeCycleExecutable<T>;
    readonly name: string;
    protected constructor(name: string, createExec?: ObjectType<LifeCycleExecutable<T>>, destroyExec?: ObjectType<LifeCycleExecutable<T>>);
    create(): Promise<T>;
    destroy(): Promise<T>;
    subscribe(cb: (message: EventBusPayload) => void): Unsubscribable;
}
//# sourceMappingURL=life-cycle.d.ts.map