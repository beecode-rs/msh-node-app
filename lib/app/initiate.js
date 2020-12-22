"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initiate = void 0;
const logger_1 = require("../logger");
const _1 = require(".");
class Initiate {
    constructor(options) {
        this.__loggerStrategy = new logger_1.NoLogger();
        this.__preInitFn = new _1.FunctionArray();
        this.__postInitFn = new _1.FunctionArray();
        this.__preDestroyFn = new _1.FunctionArray();
        this.__postDestroyFn = new _1.FunctionArray();
        this.onPreInit = this.__preInitFn.append;
        this.onPostInit = this.__postInitFn.append;
        this.onPreDestroy = this.__preDestroyFn.append;
        this.onPostDestroy = this.__postDestroyFn.append;
        this.__initFn = options.initiateFn;
        this.__destroyFn = options.destroyFu;
        this.__name = options.name;
    }
    get Name() {
        return this.__name;
    }
    set Logger(loggerStrategy) {
        this.__loggerStrategy = loggerStrategy;
    }
    get _Logger() {
        return this.__loggerStrategy;
    }
    async initiate() {
        this._Logger.debug(`${this.Name} - Init Called`);
        if (this.__preInitFn.HasFns) {
            this._Logger.debug(`${this.Name}  - START - Pre Init`);
            await this.__preInitFn.execAll();
            this._Logger.debug(`${this.Name}  - END   - Pre Init`);
        }
        if (this.__initFn) {
            this._Logger.debug(`${this.Name}  - START - Init`);
            await this.__initFn();
            this._Logger.debug(`${this.Name}  - END   - Init`);
        }
        if (this.__postInitFn.HasFns) {
            this._Logger.debug(`${this.Name}  - START - Post Init`);
            await this.__postInitFn.execAll();
            this._Logger.debug(`${this.Name}  - END   - Post Init`);
        }
    }
    async destroy() {
        this._Logger.debug(`${this.Name} - Destroy Called`);
        if (this.__preDestroyFn.HasFns) {
            this._Logger.debug(`${this.Name}  - START - Pre Destroy`);
            await this.__preDestroyFn.execAll();
            this._Logger.debug(`${this.Name}  - END   - Pre Destroy`);
        }
        if (this.__destroyFn) {
            this._Logger.debug(`${this.Name}  - START - Destroy`);
            await this.__destroyFn();
            this._Logger.debug(`${this.Name}  - END   - Destroy`);
        }
        if (this.__postDestroyFn.HasFns) {
            this._Logger.debug(`${this.Name}  - START - Post Destroy`);
            await this.__postDestroyFn.execAll();
            this._Logger.debug(`${this.Name}  - END   - Post Destroy`);
        }
    }
}
exports.Initiate = Initiate;
//# sourceMappingURL=initiate.js.map