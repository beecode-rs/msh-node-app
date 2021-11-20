"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFlow = exports.FlowDirection = void 0;
const logger_1 = require("./util/logger");
var FlowDirection;
(function (FlowDirection) {
    FlowDirection["DESTROY"] = "destroy";
    FlowDirection["CREATE"] = "create";
})(FlowDirection = exports.FlowDirection || (exports.FlowDirection = {}));
class AppFlow {
    constructor(...args) {
        this._flowList = [...args];
    }
    async create() {
        await AppFlow.DeepExecFlowList({ flowList: this._flowList, direction: FlowDirection.CREATE });
    }
    async destroy() {
        await AppFlow.DeepExecFlowList({ flowList: this._topLevelReversedFlowList(), direction: FlowDirection.DESTROY });
    }
    _topLevelReversedFlowList() {
        return this._flowList.reverse();
    }
    static async DeepExecFlowList(params) {
        try {
            const { flowList, direction } = params;
            for (const lifeCycle of flowList) {
                if (Array.isArray(lifeCycle))
                    await AppFlow.ExecSyncFlowList(lifeCycle, direction);
                else
                    await lifeCycle[direction]();
            }
        }
        catch (err) {
            if (err instanceof Error)
                (0, logger_1.logger)().error(err);
            throw err;
        }
    }
    static async ExecSyncFlowList(lifeCycleList, createOrDestroy) {
        await Promise.all(lifeCycleList.map((lifeCycle) => lifeCycle[createOrDestroy]()));
    }
}
exports.AppFlow = AppFlow;
//# sourceMappingURL=app-flow.js.map