import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'
import * as rxjsModule from 'rxjs'

export const rxjsMocker = {
  subscription: jest.fn(),
  subscribe: jest.fn().mockImplementation(() => rxjsMocker.subscription),
  subjectFactory: () => {
    const self: any = {
      subscribe: rxjsMocker.subscribe,
      pipe: jest.fn().mockImplementation(() => self),
      next: jest.fn(),
    }
    return self
  },
} as any

export default contractFactory(
  { module: rxjsModule, subjectName: 'Subject' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
      terms: [
        {
          params: [],
          result: rxjsMocker.subjectFactory(),
        },
      ],
    },
  }
)
