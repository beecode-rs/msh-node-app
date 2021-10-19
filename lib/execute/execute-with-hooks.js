"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteWithHooks = void 0;
const event_bus_1 = require("../event-bus/event-bus");
const event_bus_type_1 = require("../event-bus/event-bus-type");
const event_bus_util_1 = require("../event-bus/event-bus-util");
const function_array_1 = require("./function-array");
class ExecuteWithHooks {
    constructor(_name, _fn) {
        this._name = _name;
        this._fn = _fn;
        this._eventBus = new event_bus_1.EventBus();
        this._postFn = new function_array_1.FunctionArray();
        this._preFn = new function_array_1.FunctionArray();
    }
    async execute() {
        this._eventBus.emit(event_bus_type_1.EventBusType.LOG, `${this._name} Called`);
        if (this._preFn.HasFns)
            await event_bus_util_1.eventBusUtil.startEndEventWrapAndExecute(this._eventBus, `Pre  ${this._name}`, this._preFn.execAll);
        const result = await event_bus_util_1.eventBusUtil.startEndEventWrapAndExecute(this._eventBus, this._name, this._fn);
        if (this._postFn.HasFns)
            await event_bus_util_1.eventBusUtil.startEndEventWrapAndExecute(this._eventBus, `Post ${this._name}`, this._postFn.execAll);
        return result;
    }
    subscribe(cb) {
        return this._eventBus.subscribe(cb);
    }
}
exports.ExecuteWithHooks = ExecuteWithHooks;
//# sourceMappingURL=execute-with-hooks.js.map