export declare abstract class LifeCycle<T = any> {
    protected abstract _createFn(): Promise<T>;
    protected abstract _destroyFn(): Promise<T>;
    readonly name: string;
    protected constructor(params: {
        name: string;
    });
    create(): Promise<T>;
    destroy(): Promise<T>;
}
//# sourceMappingURL=life-cycle.d.ts.map