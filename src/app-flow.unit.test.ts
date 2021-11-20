import { AppFlow, FlowDirection } from './app-flow'
import { LifeCycleMockImplementation } from './life-cycle.unit.test'
import { logger } from './util/logger'

jest.mock('./util/logger')

export type FlowListMockImplementation = (LifeCycleMockImplementation | LifeCycleMockImplementation[])[]

export class AppFlowMockImplementation extends AppFlow {
  constructor(...args: FlowListMockImplementation) {
    super(...(args as any))
  }
}

describe('AppFlow', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  describe('create', () => {
    it('should call _deepExecFlowList', async () => {
      const flow: any[] | LifeCycleMockImplementation = []
      const appFlow = new AppFlowMockImplementation(...flow)
      const spy_deepExecFlowList = jest.spyOn<any, any>(AppFlow, 'DeepExecFlowList').mockImplementation(() => Promise.resolve())

      await appFlow.create()
      expect(spy_deepExecFlowList).toHaveBeenCalledTimes(1)
      expect(spy_deepExecFlowList).toHaveBeenCalledWith({ flowList: flow, direction: FlowDirection.CREATE })
    })
  })

  describe('destroy', () => {
    it('should call _deepExecFlowList and _topLevelReversedFlowList', async () => {
      const flow: any[] | LifeCycleMockImplementation = []
      const reversFlow: any[] | LifeCycleMockImplementation = []
      const appFlow = new AppFlowMockImplementation(...flow)
      const spy_deepExecFlowList = jest.spyOn<any, any>(AppFlow, 'DeepExecFlowList').mockImplementation(() => Promise.resolve())
      const spy_topLevelReversedFlowList = jest.spyOn<any, any>(appFlow, '_topLevelReversedFlowList').mockReturnValue(reversFlow)

      await appFlow.destroy()
      expect(spy_deepExecFlowList).toHaveBeenCalledTimes(1)
      expect(spy_deepExecFlowList).toHaveBeenCalledWith({ flowList: reversFlow, direction: FlowDirection.DESTROY })
      expect(spy_topLevelReversedFlowList).toHaveBeenCalledTimes(1)
    })
  })

  describe('_topLevelReversedFlowList', () => {
    it('should call reverse on flowList', () => {
      const fake_flow = { reverse: jest.fn().mockImplementation() } as any

      const appFlow = new AppFlowMockImplementation()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      appFlow['_flowList'] = fake_flow

      appFlow['_topLevelReversedFlowList']()
      expect(fake_flow.reverse).toHaveBeenCalledTimes(1)
    })
  })

  describe('ExecSyncFlowList', () => {
    it('should call destroy fn for every lifeCycle entity ', async () => {
      const fakeLifeCycle1 = { destroy: jest.fn() }
      const fakeLifeCycle2 = { destroy: jest.fn() }
      const fakeLifeCycle3 = { destroy: jest.fn() }
      const lifeCycleArray = [fakeLifeCycle1, fakeLifeCycle2, fakeLifeCycle3] as any[]
      await AppFlow.ExecSyncFlowList(lifeCycleArray, FlowDirection.DESTROY)
      expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
      expect(fakeLifeCycle2.destroy).toHaveBeenCalledTimes(1)
      expect(fakeLifeCycle3.destroy).toHaveBeenCalledTimes(1)
    })
  })

  describe('DeepExecFlowList', () => {
    it('should not call ExecSyncFlowList if flow empty', async () => {
      const flow = [] as any[]
      const spy_execSyncFlowList = jest.spyOn<any, any>(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

      await AppFlow.DeepExecFlowList({ flowList: flow, direction: FlowDirection.DESTROY })

      expect(spy_execSyncFlowList).not.toHaveBeenCalled()
    })

    it('should not call ExecSyncFlowList if flow has no arrays', async () => {
      const fakeLifeCycle1 = { destroy: jest.fn() }
      const flow = [fakeLifeCycle1] as any[]
      const spy_execSyncFlowList = jest.spyOn<any, any>(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

      await AppFlow.DeepExecFlowList({ flowList: flow, direction: FlowDirection.DESTROY })

      expect(spy_execSyncFlowList).not.toHaveBeenCalled()
      expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
    })

    it('should call _execSyncFlowList if flow has arrays', async () => {
      const fakeLifeCycle1 = { destroy: jest.fn() }
      const fakeLifeCycle2 = { destroy: jest.fn() }

      const flow = [[fakeLifeCycle1, fakeLifeCycle2]] as any[]

      const spy_execSyncFlowList = jest.spyOn<any, any>(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())
      await AppFlow.DeepExecFlowList({ flowList: flow, direction: FlowDirection.DESTROY })

      expect(spy_execSyncFlowList).toHaveBeenCalledTimes(1)
    })

    it('should log end throw error if lifeCycle fails', async () => {
      const lifeCycleError = new Error('boom')
      const fakeLifeCycle1 = { destroy: jest.fn().mockRejectedValue(lifeCycleError) }
      const flow = [fakeLifeCycle1] as any[]
      const spy_execSyncFlowList = jest.spyOn<any, any>(AppFlow, 'ExecSyncFlowList').mockImplementation(() => Promise.resolve())

      try {
        await AppFlow.DeepExecFlowList({ flowList: flow, direction: FlowDirection.DESTROY })
        throw new Error('failed')
      } catch (err) {
        expect(logger().error).toHaveBeenCalledTimes(1)
        expect(logger().error).toHaveBeenCalledWith(lifeCycleError)
        expect(spy_execSyncFlowList).not.toHaveBeenCalled()
        expect(fakeLifeCycle1.destroy).toHaveBeenCalledTimes(1)
      }
    })
  })
})
