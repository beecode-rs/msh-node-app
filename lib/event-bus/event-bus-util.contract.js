"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_bus_1 = require("./event-bus");
const eventBusUtilModule = __importStar(require("./event-bus-util"));
const event_bus_contract_1 = __importDefault(require("./event-bus.contract"));
const contractor_factory_1 = require("@beecode/msh-test-contractor/lib/contract/contractor-factory");
const mocker_1 = require("@beecode/msh-test-contractor/lib/mocker/mocker");
exports.default = (0, contractor_factory_1.contractFactory)({
    module: eventBusUtilModule,
    subjectName: 'eventBusUtil',
    mock: () => {
        return [mocker_1.mocker.contract(event_bus_contract_1.default).mockRestore];
    },
}, {
    startEndEventWrapAndExecute: {
        terms: [
            {
                params: [
                    new event_bus_1.EventBus(),
                    'test',
                    async () => {
                        return 'return';
                    },
                ],
                result: 'return',
            },
            {
                params: [
                    new event_bus_1.EventBus(),
                    'dummyName',
                    async () => {
                        return 'return';
                    },
                ],
                result: 'return',
            },
            {
                params: [
                    new event_bus_1.EventBus(),
                    'execSimpleName',
                    async () => {
                        return 'fake';
                    },
                ],
                result: 'fake',
            },
            {
                params: [
                    new event_bus_1.EventBus(),
                    'Pre  execSimpleName',
                    async () => {
                        return 'pre fake';
                    },
                ],
                result: 'pre fake',
            },
            {
                params: [
                    new event_bus_1.EventBus(),
                    'Post execSimpleName',
                    async () => {
                        return 'post fake';
                    },
                ],
                result: 'post fake',
            },
        ],
    },
});
//# sourceMappingURL=event-bus-util.contract.js.map