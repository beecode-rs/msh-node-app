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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyData = void 0;
const FunctionArrayModule = __importStar(require("./function-array"));
const contractor_factory_1 = require("@beecode/msh-test-contractor/lib/contract/contractor-factory");
const special_fn_name_1 = require("@beecode/msh-test-contractor/lib/enum/special-fn-name");
exports.dummyData = {
    fakeFunctionResult: 'test',
    fakeFunction: async () => {
        return exports.dummyData.fakeFunctionResult;
    },
};
exports.default = (0, contractor_factory_1.contractFactory)({ module: FunctionArrayModule, subjectName: 'FunctionArray' }, {
    [special_fn_name_1.SpecialFnName.CONSTRUCTOR]: {
        terms: [
            {
                params: [],
                result: { _fns: [] },
            },
        ],
    },
    execAll: {
        terms: [
            {
                constructorParams: [],
                params: [],
                result: [],
            },
            {
                constructorParams: [[]],
                params: [],
                result: [],
            },
            {
                constructorParams: [[exports.dummyData.fakeFunction]],
                params: [],
                result: [exports.dummyData.fakeFunctionResult],
            },
        ],
    },
    HasFns: {
        terms: [
            {
                constructorParams: [],
                params: [],
                result: false,
            },
            {
                constructorParams: [[]],
                params: [],
                result: false,
            },
            {
                constructorParams: [[exports.dummyData.fakeFunction]],
                params: [],
                result: true,
            },
        ],
    },
});
//# sourceMappingURL=function-array.contract.js.map