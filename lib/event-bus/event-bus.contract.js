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
const rxjs_subject_contract_mock_1 = __importDefault(require("../global-contract/rxjs-subject.contract-mock"));
const EventBusModule = __importStar(require("./event-bus"));
const event_bus_type_1 = require("./event-bus-type");
const contractor_factory_1 = require("@beecode/msh-test-contractor/lib/contract/contractor-factory");
const special_fn_name_1 = require("@beecode/msh-test-contractor/lib/enum/special-fn-name");
const mocker_1 = require("@beecode/msh-test-contractor/lib/mocker/mocker");
const selfContract = (0, contractor_factory_1.contractFactory)({
    module: EventBusModule,
    subjectName: 'EventBus',
    mock: () => {
        return [mocker_1.mocker.contract(rxjs_subject_contract_mock_1.default).mockRestore];
    },
}, {
    [special_fn_name_1.SpecialFnName.CONSTRUCTOR]: {
        terms: [
            {
                params: [],
                result: { _subject: {} },
            },
        ],
    },
    _rxjsFilteredSubject: {
        terms: [
            {
                constructorParams: [],
                params: [],
                result: {},
            },
            {
                constructorParams: [],
                params: [event_bus_type_1.EventBusType.LOG],
                result: {},
            },
        ],
    },
    subscribe: {
        // mock: (): ContractMockRevertFns => {
        //   return [mocker.function(selfContract, '_rxjsFilteredSubject').mockRestore]
        // },
        terms: [
            {
                constructorParams: [],
                params: [
                    () => {
                        return;
                    },
                ],
                result: {
                    unsubscribe: () => {
                        return;
                    },
                },
            },
            {
                constructorParams: [],
                params: [
                    () => {
                        return;
                    },
                    event_bus_type_1.EventBusType.LOG,
                ],
                result: {
                    unsubscribe: () => {
                        return;
                    },
                },
            },
        ],
    },
});
exports.default = selfContract;
//# sourceMappingURL=event-bus.contract.js.map