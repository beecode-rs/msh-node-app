import { LifeCycle } from './life-cycle/life-cycle';
export declare type LifeCycleList = (LifeCycle | LifeCycle[])[];
export declare enum LifeCycleDirection {
    DESTROY = "destroy",
    CREATE = "create"
}
export declare class AppFlow {
    protected readonly _lifeCycleList: LifeCycleList;
    constructor(...args: LifeCycleList);
    create(): Promise<void>;
    destroy(): Promise<void>;
    protected _topLevelReversedFlowList(): LifeCycleList;
    protected _deepExecFlowList(lifeCycleList: LifeCycleList, createOrDestroy: LifeCycleDirection): Promise<void>;
    protected _execSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: LifeCycleDirection): Promise<void>;
}
//# sourceMappingURL=app-flow.d.ts.map