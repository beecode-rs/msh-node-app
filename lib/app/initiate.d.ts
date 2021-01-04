import { LoggerStrategy } from '@beecode/msh-node-log';
export declare abstract class Initiate {
    private __loggerStrategy;
    private __preInitFn;
    private __postInitFn;
    private __preDestroyFn;
    private __postDestroyFn;
    abstract get Name(): string;
    protected abstract _initFn(): Promise<void>;
    protected abstract _destroyFn(): Promise<void>;
    set Logger(loggerStrategy: LoggerStrategy);
    protected get _Logger(): LoggerStrategy;
    initiate(): Promise<void>;
    onPreInit: (cb: import(".").CallBackFn) => void;
    onPostInit: (cb: import(".").CallBackFn) => void;
    onPreDestroy: (cb: import(".").CallBackFn) => void;
    onPostDestroy: (cb: import(".").CallBackFn) => void;
    destroy(): Promise<void>;
}
//# sourceMappingURL=initiate.d.ts.map