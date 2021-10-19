import { EventBusType } from '../event-bus/event-bus-type'
import { eventBusUtil } from '../event-bus/event-bus-util'
import EventBusUtilContract from '../event-bus/event-bus-util.contract'
import EventBusContract from '../event-bus/event-bus.contract'
import { ExecuteWithHooks } from './execute-with-hooks'
import FunctionArrayContract from './function-array.contract'
import { MockerContractResult, mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'

describe('ExecuteWithHooks', () => {
  let mock_EventBus: MockerContractResult
  let mock_EventBusUtil: MockerContractResult
  let mock_FunctionArray: MockerContractResult

  beforeEach(() => {
    mock_EventBus = mocker.contract(EventBusContract)
    mock_EventBusUtil = mocker.contract(EventBusUtilContract)
    mock_FunctionArray = mocker.contract(FunctionArrayContract)
  })

  afterEach(() => {
    mock_EventBus.mockRestore()
    mock_EventBusUtil.mockRestore()
    mock_FunctionArray.mockRestore()
    jest.restoreAllMocks()
  })

  describe('execute', () => {
    it('should execute fake fn', async () => {
      const name = 'execWithHooksName'
      const fakeResult = 'fake'
      const fakeFn = jest.fn().mockResolvedValue(fakeResult)
      const execWithHooks = new ExecuteWithHooks(name, fakeFn)

      expect(execWithHooks['_preFn'].HasFns).not.toHaveBeenCalled()
      expect(execWithHooks['_postFn'].HasFns).not.toHaveBeenCalled()
      expect(execWithHooks['_preFn'].execAll).not.toHaveBeenCalled()
      expect(execWithHooks['_postFn'].execAll).not.toHaveBeenCalled()
      expect(eventBusUtil.startEndEventWrapAndExecute).not.toHaveBeenCalled()

      const result = await execWithHooks.execute()

      expect(eventBusUtil.startEndEventWrapAndExecute).toHaveBeenCalledTimes(3)
      expect(result).toEqual(fakeResult)
      expect(execWithHooks['_eventBus'].emit).toHaveBeenCalledTimes(1)
      expect(execWithHooks['_eventBus'].emit).toHaveBeenCalledWith(EventBusType.LOG, 'execWithHooksName Called')

      // expect(execWithHooks['_preFn'].HasFns).toHaveBeenCalledTimes(0)
      // expect(execWithHooks['_postFn'].HasFns).toHaveBeenCalledTimes(0)
      // expect(execWithHooks['_preFn'].execAll).toHaveBeenCalledTimes(1)
      // expect(execWithHooks['_postFn'].execAll).toHaveBeenCalledTimes(1)
    })
  })
})
