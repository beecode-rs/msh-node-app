"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBusUtil = void 0;
const event_bus_type_1 = require("./event-bus-type");
exports.eventBusUtil = {
    startEndEventWrapAndExecute: async (eventBus, message, cb) => {
        eventBus.emit(event_bus_type_1.EventBusType.LOG, ['START', message].join(' - '));
        const result = await cb();
        eventBus.emit(event_bus_type_1.EventBusType.LOG, ['END  ', message].join(' - '));
        return result;
    },
};
//# sourceMappingURL=event-bus-util.js.map