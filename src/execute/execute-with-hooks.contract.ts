import { EventBus } from '../event-bus/event-bus'
import * as ExecuteWithHooksModule from './execute-with-hooks'
import { FunctionArray } from './function-array'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'

export default contractFactory(
  { module: ExecuteWithHooksModule, subjectName: 'ExecuteWithHooks' },
  {
    [SpecialFnName.CONSTRUCTOR]: {
      terms: [
        {
          params: [
            'dummyName',
            (): string => {
              return 'return'
            },
          ],
          result: {
            _eventBus: new EventBus(),
            _name: 'dummyName',
            _fn: (): string => {
              return 'return'
            },
            _postFn: new FunctionArray(),
            _preFn: new FunctionArray(),
          },
        },
      ],
    },
    execute: {
      terms: [
        {
          constructorParams: [
            'dummyName',
            (): string => {
              return 'return'
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
            (): string => {
              return 'return'
            },
          ],
          params: [],
          result: {
            unsubscribe: (): void => {
              return
            },
          },
        },
      ],
    },
  }
)
