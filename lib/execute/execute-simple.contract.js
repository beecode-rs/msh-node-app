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
const event_bus_1 = require("../event-bus/event-bus");
const event_bus_util_contract_1 = __importDefault(require("../event-bus/event-bus-util.contract"));
const event_bus_contract_1 = __importDefault(require("../event-bus/event-bus.contract"));
const ExecuteSimpleModule = __importStar(require("./execute-simple"));
const contractor_factory_1 = require("@beecode/msh-test-contractor/lib/contract/contractor-factory");
const special_fn_name_1 = require("@beecode/msh-test-contractor/lib/enum/special-fn-name");
const mocker_1 = require("@beecode/msh-test-contractor/lib/mocker/mocker");
exports.default = (0, contractor_factory_1.contractFactory)({
    module: ExecuteSimpleModule,
    subjectName: 'ExecuteSimple',
    mock: () => {
        return [mocker_1.mocker.contract(event_bus_contract_1.default).mockRestore, mocker_1.mocker.contract(event_bus_util_contract_1.default).mockRestore];
    },
}, {
    [special_fn_name_1.SpecialFnName.CONSTRUCTOR]: {
        terms: [
            {
                params: [
                    'dummyName',
                    () => {
                        return 'return';
                    },
                ],
                result: {
                    _eventBus: new event_bus_1.EventBus(),
                    _name: 'dummyName',
                    _fn: () => {
                        return 'return';
                    },
                },
            },
        ],
    },
    execute: {
        terms: [
            {
                constructorParams: [
                    'dummyName',
                    () => {
                        return 'return';
                    },
                ],
                params: [],
                result: 'return',
            },
        ],
    },
    subscribe: {
        terms: [
            {
                constructorParams: [
                    'dummyName',
                    () => {
                        return 'return';
                    },
                ],
                params: [],
                result: {
                    unsubscribe: () => {
                        return;
                    },
                },
            },
        ],
    },
});
//# sourceMappingURL=execute-simple.contract.js.map