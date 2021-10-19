import { EventBusType } from '../event-bus/event-bus-type'
import { eventBusUtil } from '../event-bus/event-bus-util'
import EventBusUtilContract from '../event-bus/event-bus-util.contract'
import EventBusContract from '../event-bus/event-bus.contract'
import { ExecuteSimple } from './execute-simple'
import { MockerContractResult, mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'

describe('ExecuteSimple', () => {
  let mock_EventBus: MockerContractResult
  let mock_EventBusUtil: MockerContractResult

  beforeEach(() => {
    mock_EventBus = mocker.contract(EventBusContract)
    mock_EventBusUtil = mocker.contract(EventBusUtilContract)
  })

  afterEach(() => {
    mock_EventBus.mockRestore()
    mock_EventBusUtil.mockRestore()
    jest.restoreAllMocks()
  })

  describe('execute', () => {
    it('should execute fake fn', async () => {
      const name = 'execSimpleName'
      const fakeResult = 'fake'
      const fakeFn = jest.fn().mockResolvedValue(fakeResult)
      const executeSimple = new ExecuteSimple(name, fakeFn)
      expect(eventBusUtil.startEndEventWrapAndExecute).not.toHaveBeenCalled()
      expect(executeSimple['_eventBus'].emit).not.toHaveBeenCalled()

      const result = await executeSimple.execute()

      expect(eventBusUtil.startEndEventWrapAndExecute).toHaveBeenCalledTimes(1)
      expect(result).toEqual(fakeResult)
      expect(executeSimple['_eventBus'].emit).toHaveBeenCalledTimes(1)
      expect(executeSimple['_eventBus'].emit).toHaveBeenCalledWith(EventBusType.LOG, 'execSimpleName Called')
    })
  })

  describe('subscribe', () => {
    it('should exec subscription and return unsubscribe function', () => {
      const name = 'execSimpleName'
      const fakeFn = jest.fn()
      const fakeCb = jest.fn()
      const executeSimple = new ExecuteSimple(name, fakeFn)
      const result = executeSimple.subscribe(fakeCb)
      expect(executeSimple['_eventBus'].subscribe).toHaveBeenCalledTimes(1)
      expect(executeSimple['_eventBus'].subscribe).toHaveBeenCalledWith(fakeCb)
      expect(result.unsubscribe).toBeDefined()
    })
  })
})
