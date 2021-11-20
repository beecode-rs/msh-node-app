"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.NodeAppLogger = void 0;
const no_logger_1 = require("@beecode/msh-node-log/lib/no-logger");
let _logger = new no_logger_1.NoLogger();
const NodeAppLogger = (logger) => {
    _logger = logger;
};
exports.NodeAppLogger = NodeAppLogger;
const logger = () => {
    return _logger;
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map