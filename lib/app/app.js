"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
class app {
    constructor(...args) {
        this.__initList = args;
    }
    async initiate() {
        for (const init of this.__initList) {
            if (!Array.isArray(init))
                await init.initiate();
            else
                await Promise.all(init.map((i) => i.initiate()));
        }
    }
}
exports.app = app;
//# sourceMappingURL=app.js.map