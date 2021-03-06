"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
class App {
    constructor(...args) {
        this.__initList = [...args];
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
exports.App = App;
//# sourceMappingURL=app.js.map