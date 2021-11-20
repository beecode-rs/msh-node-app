import * as AppFlow from './app-flow'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'

export const dummyData = Object.freeze({
  lifeCycleList: [{ init: 1 }, [{ init: 2.1 }, { init: 2.2 }], { init: 3 }],
  reverseLifeCycleList: [{ init: 3 }, [{ init: 2.1 }, { init: 2.2 }], { init: 1 }],
})
export default contractFactory(
  { module: AppFlow, subjectName: 'AppFlow' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
      terms: [
        {
          params: [...dummyData.lifeCycleList],
          result: { _flowList: [...dummyData.lifeCycleList] },
        },
      ],
    },
    _topLevelReversedFlowList: {
      terms: [
        {
          params: [],
          constructorParams: [...dummyData.lifeCycleList],
          result: dummyData.reverseLifeCycleList,
        },
      ],
    },
  }
)
