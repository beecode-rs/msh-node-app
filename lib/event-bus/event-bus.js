"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const rxjs_1 = require("rxjs");
class EventBus {
    constructor() {
        this._subject = new rxjs_1.Subject();
    }
    emit(type, message) {
        this._subject.next({ type, message });
    }
    subscribe(cb, type) {
        const subscription = this._rxjsFilteredSubject(type).subscribe(cb);
        return { unsubscribe: () => subscription.unsubscribe() };
    }
    _rxjsFilteredSubject(type) {
        return type ? this._subject.pipe((0, rxjs_1.filter)((m) => m.type === type)) : this._subject;
    }
}
exports.EventBus = EventBus;
//# sourceMappingURL=event-bus.js.map