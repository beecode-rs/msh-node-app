"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFlow = void 0;
class AppFlow {
    constructor(...args) {
        this.__flowList = [...args];
    }
    async initiate() {
        await this._deepExecFlowList(this.__flowList, 'initiate');
    }
    async destroy() {
        await this._deepExecFlowList(this._reversedFlowList(), 'destroy');
    }
    _reversedFlowList() {
        return this.__flowList.reverse();
    }
    async _deepExecFlowList(flowList, fnName) {
        for (const flow of flowList) {
            if (Array.isArray(flow))
                await this._execSyncFlowList(flow, fnName);
            else
                await flow[fnName]();
        }
    }
    async _execSyncFlowList(flowList, fnName) {
        await Promise.all(flowList.map((i) => i[fnName]()));
    }
}
exports.AppFlow = AppFlow;
//# sourceMappingURL=app-flow.js.map