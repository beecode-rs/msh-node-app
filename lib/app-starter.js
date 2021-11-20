"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appStarterFactory = exports.AppStarter = exports.AppStarterStatus = void 0;
const logger_1 = require("./util/logger");
var AppStarterStatus;
(function (AppStarterStatus) {
    AppStarterStatus["STARTED"] = "started";
    AppStarterStatus["STOPPED"] = "stopped";
})(AppStarterStatus = exports.AppStarterStatus || (exports.AppStarterStatus = {}));
class AppStarter {
    constructor(appFlow) {
        this._status = AppStarterStatus.STOPPED;
        this._flow = appFlow;
    }
    async start() {
        try {
            if (this._status === AppStarterStatus.STARTED) {
                (0, logger_1.logger)().warn('App already started');
                return;
            }
            this._status = AppStarterStatus.STARTED;
            await this._flow.create();
            this._registerOnExit();
        }
        catch (err) {
            await this._onError(err);
        }
    }
    _registerOnExit() {
        ;
        ['SIGTERM', 'SIGINT'].forEach((signal) => {
            process.on(signal, () => {
                this._gracefulStop().catch((err) => (0, logger_1.logger)().error(err));
            });
        });
    }
    async _gracefulStop() {
        await this.stop();
        process.exit(0);
    }
    async _onError(err) {
        (0, logger_1.logger)().error(err.message);
        await this.stop();
        process.exit(1);
    }
    async stop() {
        if (this._status === AppStarterStatus.STOPPED) {
            (0, logger_1.logger)().warn('App already stopped');
            return;
        }
        this._status = AppStarterStatus.STOPPED;
        await this._flow.destroy();
    }
}
exports.AppStarter = AppStarter;
const appStarterFactory = (appFlow) => new AppStarter(new appFlow());
exports.appStarterFactory = appStarterFactory;
//# sourceMappingURL=app-starter.js.map