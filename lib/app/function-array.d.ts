import { CallBackFn } from '.';
export declare class FunctionArray {
    private readonly __fns;
    constructor(fns?: CallBackFn[]);
    execAll(): Promise<void>;
    append(cb: CallBackFn): void;
    get HasFns(): boolean;
}
//# sourceMappingURL=function-array.d.ts.map