"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteSimple = void 0;
const event_bus_1 = require("../event-bus/event-bus");
const event_bus_type_1 = require("../event-bus/event-bus-type");
const event_bus_util_1 = require("../event-bus/event-bus-util");
class ExecuteSimple {
    constructor(_name, _fn) {
        this._name = _name;
        this._fn = _fn;
        this._eventBus = new event_bus_1.EventBus();
    }
    execute() {
        this._eventBus.emit(event_bus_type_1.EventBusType.LOG, `${this._name} Called`);
        return event_bus_util_1.eventBusUtil.startEndEventWrapAndExecute(this._eventBus, this._name, this._fn);
    }
    subscribe(cb) {
        return this._eventBus.subscribe(cb);
    }
}
exports.ExecuteSimple = ExecuteSimple;
//# sourceMappingURL=execute-simple.js.map