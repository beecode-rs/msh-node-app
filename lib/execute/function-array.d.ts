export declare type CallBackFn<T> = () => Promise<T>;
export declare class FunctionArray<T = any> {
    protected _fns: CallBackFn<T>[];
    constructor(fns?: CallBackFn<T>[]);
    execAll(): Promise<T[]>;
    append(cb: CallBackFn<T>): void;
    get HasFns(): boolean;
}
//# sourceMappingURL=function-array.d.ts.map