"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initiate = void 0;
const _1 = require(".");
const no_logger_1 = require("@beecode/msh-node-log/lib/no-logger");
class Initiate {
    constructor() {
        this.__loggerStrategy = new no_logger_1.NoLogger();
        this.__preInitFn = new _1.FunctionArray();
        this.__postInitFn = new _1.FunctionArray();
        this.__preDestroyFn = new _1.FunctionArray();
        this.__postDestroyFn = new _1.FunctionArray();
        this.onPreInit = this.__preInitFn.append;
        this.onPostInit = this.__postInitFn.append;
        this.onPreDestroy = this.__preDestroyFn.append;
        this.onPostDestroy = this.__postDestroyFn.append;
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
            this._Logger.debug(`${this.Name} - START - Pre Init`);
            await this.__preInitFn.execAll();
            this._Logger.debug(`${this.Name} - END   - Pre Init`);
        }
        this._Logger.debug(`${this.Name} - START - Init`);
        await this._initFn();
        this._Logger.debug(`${this.Name} - END   - Init`);
        if (this.__postInitFn.HasFns) {
            this._Logger.debug(`${this.Name} - START - Post Init`);
            await this.__postInitFn.execAll();
            this._Logger.debug(`${this.Name} - END   - Post Init`);
        }
    }
    async destroy() {
        this._Logger.debug(`${this.Name} - Destroy Called`);
        if (this.__preDestroyFn.HasFns) {
            this._Logger.debug(`${this.Name} - START - Pre Destroy`);
            await this.__preDestroyFn.execAll();
            this._Logger.debug(`${this.Name} - END   - Pre Destroy`);
        }
        this._Logger.debug(`${this.Name} - START - Destroy`);
        await this._destroyFn();
        this._Logger.debug(`${this.Name} - END   - Destroy`);
        if (this.__postDestroyFn.HasFns) {
            this._Logger.debug(`${this.Name} - START - Post Destroy`);
            await this.__postDestroyFn.execAll();
            this._Logger.debug(`${this.Name} - END   - Post Destroy`);
        }
    }
}
exports.Initiate = Initiate;
//# sourceMappingURL=initiate.js.map