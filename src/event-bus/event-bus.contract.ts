import rxjsSubjectContractMock from '../global-contract/rxjs-subject.contract-mock'
import * as EventBusModule from './event-bus'
import { EventBusType } from './event-bus-type'
import { Unsubscribable } from './unsubscribable'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { SpecialFnName } from '@beecode/msh-test-contractor/lib/enum/special-fn-name'
import { mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'
import { ContractMockRevertFns } from '@beecode/msh-test-contractor/lib/types'

const selfContract = contractFactory(
  {
    module: EventBusModule,
    subjectName: 'EventBus',
    mock: (): ContractMockRevertFns => {
      return [mocker.contract(rxjsSubjectContractMock).mockRestore]
    },
  },
  {
    [SpecialFnName.CONSTRUCTOR]: {
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
          params: [EventBusType.LOG],
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
            (): void => {
              return
            },
          ],
          result: {
            unsubscribe: (): void => {
              return
            },
          } as Unsubscribable,
        },
        {
          constructorParams: [],
          params: [
            (): void => {
              return
            },
            EventBusType.LOG,
          ],
          result: {
            unsubscribe: (): void => {
              return
            },
          } as Unsubscribable,
        },
      ],
    },
  }
)
export default selfContract
