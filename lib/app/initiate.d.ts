import { CallBackFn } from '.';
import { LoggerStrategy } from '@beecode/msh-node-log';
export declare type InitiateOptions = {
    name: string;
    initiateFn?: CallBackFn;
    destroyFn?: CallBackFn;
};
export declare class Initiate {
    private readonly __name;
    private __loggerStrategy;
    private __preInitFn;
    private __postInitFn;
    private __preDestroyFn;
    private __postDestroyFn;
    private readonly __initFn;
    private readonly __destroyFn;
    get Name(): string;
    set Logger(loggerStrategy: LoggerStrategy);
    protected get _Logger(): LoggerStrategy;
    constructor(options: InitiateOptions);
    initiate(): Promise<void>;
    onPreInit: (cb: CallBackFn) => void;
    onPostInit: (cb: CallBackFn) => void;
    onPreDestroy: (cb: CallBackFn) => void;
    onPostDestroy: (cb: CallBackFn) => void;
    destroy(): Promise<void>;
}
//# sourceMappingURL=initiate.d.ts.map