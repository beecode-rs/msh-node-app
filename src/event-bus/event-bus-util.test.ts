import EventBusContract from '../event-bus/event-bus.contract'
import { EventBus } from './event-bus'
import { eventBusUtil } from './event-bus-util'
import { MockerContractResult, mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'

describe('eventBusUtil', () => {
  describe('startEndEventWrapAndExecute', () => {
    let mock_eventBus: MockerContractResult
    beforeEach(() => {
      mock_eventBus = mocker.contract(EventBusContract)
    })
    afterEach(() => {
      mock_eventBus.mockRestore()
    })

    it('should ', async () => {
      const cbResult = { callback: 'result' }
      const fakeCallback = jest.fn().mockResolvedValue(cbResult)
      const fakeEventBus = new EventBus()
      const result = await eventBusUtil.startEndEventWrapAndExecute(fakeEventBus, 'test-message', fakeCallback)
      expect(result).toEqual(cbResult)
      expect(fakeEventBus.emit).toHaveBeenCalledTimes(2)
    })
  })
})
