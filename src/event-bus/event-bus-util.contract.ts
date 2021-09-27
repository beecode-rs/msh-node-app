import { EventBus } from './event-bus'
import * as eventBusUtilModule from './event-bus-util'
import EventBusContract from './event-bus.contract'
import { contractFactory } from '@beecode/msh-test-contractor/lib/contract/contractor-factory'
import { mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'
import { ContractMockRevertFns } from '@beecode/msh-test-contractor/lib/types'

export default contractFactory(
  {
    module: eventBusUtilModule,
    subjectName: 'eventBusUtil',
    mock: (): ContractMockRevertFns => {
      return [mocker.contract(EventBusContract).mockRestore]
    },
  },
  {
    startEndEventWrapAndExecute: {
      terms: [
        {
          params: [
            new EventBus(),
            'test',
            async (): Promise<string> => {
              return 'return'
            },
          ],
          result: 'return',
        },
        {
          params: [
            new EventBus(),
            'dummyName',
            async (): Promise<string> => {
              return 'return'
            },
          ],
          result: 'return',
        },
        {
          params: [
            new EventBus(),
            'execSimpleName',
            async (): Promise<string> => {
              return 'fake'
            },
          ],
          result: 'fake',
        },
      ],
    },
  }
)
