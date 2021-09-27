import * as FunctionArrayModule from './function-array'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'

export const dummyData = {
  fakeFunctionResult: 'test',
  fakeFunction: async (): Promise<string> => {
    return dummyData.fakeFunctionResult
  },
}

export default contractFactory(
  { module: FunctionArrayModule, subjectName: 'FunctionArray' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
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
          constructorParams: [[dummyData.fakeFunction]],
          params: [],
          result: [dummyData.fakeFunctionResult],
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
          constructorParams: [[dummyData.fakeFunction]],
          params: [],
          result: true,
        },
      ],
    },
  }
)
