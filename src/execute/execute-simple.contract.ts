import { EventBus } from '../event-bus/event-bus'
import EventBusUtilContract from '../event-bus/event-bus-util.contract'
import EventBusContract from '../event-bus/event-bus.contract'
import * as ExecuteSimpleModule from './execute-simple'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'
import { mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'
import { ContractMockRevertFns } from '@beecode/msh-test-contractor/lib/types'

export default contractFactory(
  {
    module: ExecuteSimpleModule,
    subjectName: 'ExecuteSimple',
    mock: (): ContractMockRevertFns => {
      return [mocker.contract(EventBusContract).mockRestore, mocker.contract(EventBusUtilContract).mockRestore]
    },
  },
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
