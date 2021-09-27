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
const AppFlow = __importStar(require("./app-flow"));
const contractor_factory_1 = require("@beecode/msh-test-contractor/lib/contract/contractor-factory");
const special_fn_name_1 = require("@beecode/msh-test-contractor/lib/enum/special-fn-name");
const dummyFlowList = [{ init: 1 }, [{ init: 2 }, { init: 3 }], { init: 4 }];
exports.default = (0, contractor_factory_1.contractFactory)({ module: AppFlow, subjectName: 'AppFlow' }, {
    [special_fn_name_1.SpecialFnName.CONSTRUCTOR]: {
        terms: [
            {
                params: [...dummyFlowList],
                result: { __flowList: [...dummyFlowList] },
            },
        ],
    },
});
//# sourceMappingURL=app-flow.contract.js.map