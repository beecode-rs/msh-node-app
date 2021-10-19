"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFlow = exports.LifeCycleDirection = void 0;
var LifeCycleDirection;
(function (LifeCycleDirection) {
    LifeCycleDirection["DESTROY"] = "destroy";
    LifeCycleDirection["CREATE"] = "create";
})(LifeCycleDirection = exports.LifeCycleDirection || (exports.LifeCycleDirection = {}));
class AppFlow {
    constructor(...args) {
        this._lifeCycleList = [...args];
    }
    async create() {
        await this._deepExecFlowList(this._lifeCycleList, LifeCycleDirection.CREATE);
    }
    async destroy() {
        await this._deepExecFlowList(this._topLevelReversedFlowList(), LifeCycleDirection.DESTROY);
    }
    _topLevelReversedFlowList() {
        return this._lifeCycleList.reverse();
    }
    async _deepExecFlowList(lifeCycleList, createOrDestroy) {
        for (const lifeCycle of lifeCycleList) {
            if (Array.isArray(lifeCycle))
                await this._execSyncFlowList(lifeCycle, createOrDestroy);
            else
                await lifeCycle[createOrDestroy]();
        }
    }
    async _execSyncFlowList(lifeCycleList, createOrDestroy) {
        await Promise.all(lifeCycleList.map((i) => i[createOrDestroy]()));
    }
}
exports.AppFlow = AppFlow;
//# sourceMappingURL=app-flow.js.map