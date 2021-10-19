"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionArray = void 0;
class FunctionArray {
    constructor(fns = []) {
        this._fns = [...fns];
    }
    async execAll() {
        const result = [];
        for (const fn of this._fns)
            result.push(await fn());
        return result;
    }
    append(cb) {
        this._fns.push(cb);
    }
    get HasFns() {
        return this._fns.length > 0;
    }
}
exports.FunctionArray = FunctionArray;
//# sourceMappingURL=function-array.js.map