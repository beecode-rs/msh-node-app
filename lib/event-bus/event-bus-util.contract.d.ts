import { EventBus } from './event-bus';
import * as eventBusUtilModule from './event-bus-util';
declare const _default: import("@beecode/msh-test-contractor/lib/types").Contract<typeof eventBusUtilModule, "eventBusUtil", {
    startEndEventWrapAndExecute: <T = any>(eventBus: EventBus<string>, message: string, cb: () => Promise<any>) => Promise<T>;
}>;
export default _default;
//# sourceMappingURL=event-bus-util.contract.d.ts.map