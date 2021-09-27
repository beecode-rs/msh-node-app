import { Initiate } from './initiate';
export declare type FlowList = (Initiate | Initiate[])[];
export declare class AppFlow {
    private readonly __flowList;
    constructor(...args: FlowList);
    initiate(): Promise<void>;
    destroy(): Promise<void>;
    protected _reversedFlowList(): FlowList;
    protected _deepExecFlowList(flowList: FlowList, fnName: 'destroy' | 'initiate'): Promise<void>;
    protected _execSyncFlowList(flowList: Initiate[], fnName: 'destroy' | 'initiate'): Promise<void>;
}
//# sourceMappingURL=app-flow.d.ts.map