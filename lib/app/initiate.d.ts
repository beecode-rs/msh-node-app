import { LoggerStrategy } from '../logger';
import { CallBackFn } from '.';
export declare type InitiateOptions = {
    name: string;
    initiateFn?: CallBackFn;
    destroyFu?: CallBackFn;
};
export declare class Initiate {
    private __loggerStrategy;
    private readonly __name;
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