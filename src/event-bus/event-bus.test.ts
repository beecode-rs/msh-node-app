import rxjsSubjectContractMock from '../global-contract/rxjs-subject.contract-mock'
import { EventBus } from './event-bus'
import { EventBusType } from './event-bus-type'
import { MockerContractResult, mocker } from '@beecode/msh-test-contractor/lib/mocker/mocker'
import * as rxjs from 'rxjs'

describe('EventBus', () => {
  let mock_rxjs_subject: MockerContractResult
  let spy_rxjs_filter: jest.SpyInstance
  beforeEach(() => {
    mock_rxjs_subject = mocker.contract(rxjsSubjectContractMock)
    spy_rxjs_filter = jest.spyOn(rxjs, 'filter')
  })
  afterEach(() => {
    mock_rxjs_subject.mockRestore()
    jest.restoreAllMocks()
  })
  describe('emit', () => {
    it('should call subject.next', () => {
      const eventBus = new EventBus()
      const type = EventBusType.LOG
      const message = 'test message'
      eventBus.emit(type, message)
      expect(eventBus['_subject'].next).toHaveBeenCalledTimes(1)
      expect(eventBus['_subject'].next).toHaveBeenCalledWith({ type, message })
    })
  })

  describe('_rxjsFilteredSubject', () => {
    it('should not call subject.pipe if no type is passed', () => {
      const eventBus = new EventBus()
      eventBus['_rxjsFilteredSubject']()
      expect(eventBus['_subject'].pipe).not.toHaveBeenCalled()
      expect(spy_rxjs_filter).not.toHaveBeenCalled()
    })

    it('should call subject.pipe if type is passed', () => {
      const eventBus = new EventBus()
      eventBus['_rxjsFilteredSubject'](EventBusType.LOG)
      expect(eventBus['_subject'].pipe).toHaveBeenCalled()
      expect(spy_rxjs_filter).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribe', () => {
    let spy_EventBus_rxjsFilteredSubject: jest.SpyInstance
    let spy_Subscribe: jest.SpyInstance
    let spy_Unsubscribe: jest.SpyInstance
    beforeEach(() => {
      spy_Unsubscribe = jest.fn()
      spy_Subscribe = jest.fn().mockReturnValue({ unsubscribe: spy_Unsubscribe })
      spy_EventBus_rxjsFilteredSubject = jest
        .spyOn(EventBus.prototype, '_rxjsFilteredSubject' as any)
        .mockReturnValue({ subscribe: spy_Subscribe })
    })
    it('should call _rxjsFilteredSubject without type', () => {
      const eventBus = new EventBus()
      const fakeCallback = jest.fn()
      eventBus.subscribe(fakeCallback)
      expect(spy_EventBus_rxjsFilteredSubject).toHaveBeenCalledTimes(1)
      expect(spy_EventBus_rxjsFilteredSubject).toHaveBeenCalledWith(undefined)
      expect(spy_Subscribe).toHaveBeenCalledTimes(1)
      expect(spy_Subscribe).toHaveBeenCalledWith(fakeCallback)
    })
    it('should call _rxjsFilteredSubject with type', () => {
      const eventBus = new EventBus()
      const fakeCallback = jest.fn()
      const type = EventBusType.LOG
      eventBus.subscribe(fakeCallback, type)
      expect(spy_EventBus_rxjsFilteredSubject).toHaveBeenCalledTimes(1)
      expect(spy_EventBus_rxjsFilteredSubject).toHaveBeenCalledWith(type)
      expect(spy_Subscribe).toHaveBeenCalledTimes(1)
      expect(spy_Subscribe).toHaveBeenCalledWith(fakeCallback)
    })
    it('should call unsubscribe', () => {
      const eventBus = new EventBus()
      const fakeCallback = jest.fn()
      const result = eventBus.subscribe(fakeCallback)
      expect(spy_Unsubscribe).not.toHaveBeenCalled()
      result.unsubscribe()
      expect(spy_Unsubscribe).toHaveBeenCalledTimes(1)
    })
  })
})
