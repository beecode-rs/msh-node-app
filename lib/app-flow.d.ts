import { LifeCycle } from './life-cycle';
export declare type FlowList = (LifeCycle | LifeCycle[])[];
export declare enum FlowDirection {
    DESTROY = "destroy",
    CREATE = "create"
}
export declare abstract class AppFlow {
    protected readonly _flowList: FlowList;
    protected constructor(...args: FlowList);
    create(): Promise<void>;
    destroy(): Promise<void>;
    protected _topLevelReversedFlowList(): FlowList;
    static DeepExecFlowList(params: {
        flowList: FlowList;
        direction: FlowDirection;
    }): Promise<void>;
    static ExecSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: FlowDirection): Promise<void>;
}
//# sourceMappingURL=app-flow.d.ts.map