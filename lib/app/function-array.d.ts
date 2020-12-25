import { CallBackFn } from '.';
export interface IFunctionArray {
    execAll(): Promise<void>;
    append: (cb: CallBackFn) => void;
    readonly HasFns: boolean;
}
export declare class FunctionArray implements IFunctionArray {
    private readonly __fns;
    constructor(fns?: CallBackFn[]);
    execAll(): Promise<void>;
    append: (cb: CallBackFn) => void;
    get HasFns(): boolean;
}
//# sourceMappingURL=function-array.d.ts.map