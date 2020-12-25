"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionArray = void 0;
class FunctionArray {
    constructor(fns = []) {
        this.__fns = [];
        this.append = (cb) => {
            this.__fns.push(cb);
        };
        this.__fns = [...this.__fns, ...fns];
    }
    async execAll() {
        for (const fn of this.__fns)
            await fn();
    }
    get HasFns() {
        return this.__fns.length > 0;
    }
}
exports.FunctionArray = FunctionArray;
//# sourceMappingURL=function-array.js.map