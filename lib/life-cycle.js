"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycle = void 0;
const logger_1 = require("./util/logger");
class LifeCycle {
    constructor(params) {
        const { name } = params;
        this.name = name;
    }
    async create() {
        (0, logger_1.logger)().debug(`${this.name} Create START`);
        const result = await this._createFn();
        (0, logger_1.logger)().debug(`${this.name} Create END`);
        return result;
    }
    async destroy() {
        (0, logger_1.logger)().debug(`${this.name} Destroy START`);
        const result = await this._destroyFn();
        (0, logger_1.logger)().debug(`${this.name} Destroy END`);
        return result;
    }
}
exports.LifeCycle = LifeCycle;
//# sourceMappingURL=life-cycle.js.map