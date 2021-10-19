"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycle = void 0;
const event_bus_1 = require("../event-bus/event-bus");
const execute_simple_1 = require("../execute/execute-simple");
class LifeCycle {
    constructor(name, createExec = execute_simple_1.ExecuteSimple, destroyExec = execute_simple_1.ExecuteSimple) {
        this._eventBus = new event_bus_1.EventBus();
        this.name = name;
        this._createExec = new createExec('create ', this._createFn);
        this._destroyExec = new destroyExec('destroy', this._destroyFn);
        this._createExec.subscribe((p) => this._eventBus.emit(p.type, p.message));
        this._destroyExec.subscribe((p) => this._eventBus.emit(p.type, p.message));
    }
    create() {
        return this._createExec.execute();
    }
    destroy() {
        return this._destroyExec.execute();
    }
    subscribe(cb) {
        return this._eventBus.subscribe(cb);
    }
}
exports.LifeCycle = LifeCycle;
//# sourceMappingURL=life-cycle.js.map