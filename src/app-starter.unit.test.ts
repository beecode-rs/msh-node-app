import { AppFlow } from './app-flow'
import { AppStarter, AppStarterStatus } from './app-starter'
import { logger } from './util/logger'

jest.mock('./util/logger')
jest.mock('./app-flow')

class DummyAppFlow extends AppFlow {
  public constructor() {
    super()
  }
}

describe('AppStarter', () => {
  let dummyAppFlow: DummyAppFlow
  let appStarter: AppStarter

  beforeEach(() => {
    dummyAppFlow = new DummyAppFlow()
    appStarter = new AppStarter(dummyAppFlow)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })
  describe('constructor', () => {
    it('should set appFlow and check for defaults', () => {
      expect(appStarter['_flow']).toEqual(dummyAppFlow)
      expect(appStarter['_status']).toEqual(AppStarterStatus.STOPPED)
    })
  })

  describe('start', () => {
    beforeEach(() => {
      appStarter['_registerOnExit'] = jest.fn()
      appStarter['_onError'] = jest.fn()
    })

    it('should log end return if status is STARTED', async () => {
      appStarter['_status'] = AppStarterStatus.STARTED
      await appStarter.start()
      expect(logger().warn).toHaveBeenCalledTimes(1)
      expect(logger().warn).toHaveBeenCalledWith('App already started')
    })

    it('should set status to STARTED and call created and if no error call _registerOnExit', async () => {
      ;(dummyAppFlow.create as jest.Mock).mockResolvedValue(undefined)
      expect(appStarter['_status']).toEqual(AppStarterStatus.STOPPED)

      await appStarter.start()

      expect(appStarter['_status']).toEqual(AppStarterStatus.STARTED)
      expect(dummyAppFlow.create).toHaveBeenCalledTimes(1)
      expect(appStarter['_registerOnExit']).toHaveBeenCalledTimes(1)
      expect(appStarter['_onError']).not.toHaveBeenCalled()
    })

    it('should call created and if on error call _onError', async () => {
      const error = new Error('boom')
      ;(dummyAppFlow.create as jest.Mock).mockRejectedValue(error)
      ;(appStarter['_onError'] as jest.Mock).mockResolvedValue(undefined)
      await appStarter.start()

      expect(appStarter['_registerOnExit']).not.toHaveBeenCalled()
      expect(appStarter['_onError']).toHaveBeenCalledTimes(1)
      expect(appStarter['_onError']).toHaveBeenCalledWith(error)
      expect(error.message).toEqual('boom')
    })

    it('should throw error if _onError fails', async () => {
      const error = new Error('boom')
      const onErrorError = new Error('boom2')
      ;(dummyAppFlow.create as jest.Mock).mockRejectedValue(error)
      ;(appStarter['_onError'] as jest.Mock).mockRejectedValue(onErrorError)

      try {
        await appStarter.start()
        throw new Error('test failed')
      } catch (err) {
        expect(appStarter['_registerOnExit']).not.toHaveBeenCalled()
        expect(appStarter['_onError']).toHaveBeenCalledTimes(1)
        expect(appStarter['_onError']).toHaveBeenCalledWith(error)
        expect(err).toEqual(onErrorError)
      }
    })
  })

  describe('stop', () => {
    it('should log end return if status is STOPPED', () => {
      expect(appStarter['_status']).toEqual(AppStarterStatus.STOPPED)

      appStarter.stop()
      expect(logger().warn).toHaveBeenCalledTimes(1)
      expect(logger().warn).toHaveBeenCalledWith('App already stopped')
    })

    it('should set status to STOPPED and call created and if no error call _registerOnExit', async () => {
      ;(dummyAppFlow.destroy as jest.Mock).mockResolvedValue(undefined)
      appStarter['_status'] = AppStarterStatus.STARTED

      await appStarter.stop()

      expect(dummyAppFlow.destroy).toHaveBeenCalledTimes(1)
      expect(appStarter['_status']).toEqual(AppStarterStatus.STOPPED)
    })
  })

  describe('_onError', () => {
    let spy_process_exit: jest.SpyInstance
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      spy_process_exit = jest.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
    })

    it('should log error message, call stop and end process', async () => {
      appStarter.stop = jest.fn().mockResolvedValue(undefined)
      const error = new Error('boom')
      await appStarter['_onError'](error)
      expect(logger().error).toHaveBeenCalledTimes(1)
      expect(logger().error).toHaveBeenCalledWith('boom')
      expect(appStarter.stop).toHaveBeenCalledTimes(1)
      expect(spy_process_exit).toHaveBeenCalledTimes(1)
      expect(spy_process_exit).toHaveBeenCalledWith(1)
    })
    it('should log error message, call stop and fail', async () => {
      const stopError = new Error('stopBoom')
      appStarter.stop = jest.fn().mockRejectedValue(stopError)
      try {
        const error = new Error('boom')
        await appStarter['_onError'](error)
      } catch (e) {
        expect(logger().error).toHaveBeenCalledTimes(1)
        expect(logger().error).toHaveBeenCalledWith('boom')
        expect(appStarter.stop).toHaveBeenCalledTimes(1)
        expect(spy_process_exit).not.toHaveBeenCalled()
        expect(e).toEqual(stopError)
      }
    })
  })

  describe('_gracefulStop', () => {
    let spy_process_exit: jest.SpyInstance
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      spy_process_exit = jest.spyOn(process, 'exit').mockImplementation(() => {}) // eslint-disable-line
    })
    it('should call stop and exit', async () => {
      appStarter.stop = jest.fn().mockResolvedValue(undefined)
      await appStarter['_gracefulStop']()

      expect(appStarter.stop).toHaveBeenCalledTimes(1)
      expect(spy_process_exit).toHaveBeenCalledTimes(1)
      expect(spy_process_exit).toHaveBeenCalledWith(0)
    })
    it('should call stop and fail', async () => {
      const stopError = new Error('stopBoom')
      appStarter.stop = jest.fn().mockRejectedValue(stopError)
      try {
        await appStarter['_gracefulStop']()
      } catch (e) {
        expect(appStarter.stop).toHaveBeenCalledTimes(1)
        expect(spy_process_exit).not.toHaveBeenCalled()
        expect(e).toEqual(stopError)
      }
    })
  })

  describe('_registerOnExit', () => {
    let spy_process_on: jest.SpyInstance
    const processOnSlots: { [k: string]: () => Promise<void> } = {}
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      spy_process_on = jest.spyOn(process, 'on').mockImplementation((slot: string, fn: () => Promise<void>) => {
        processOnSlots[slot] = fn
      })
    })
    it('should register two signals', () => {
      appStarter['_registerOnExit']()
      expect(spy_process_on).toHaveBeenCalledTimes(2)
      expect(spy_process_on).toHaveBeenNthCalledWith(1, 'SIGTERM', expect.anything())
      expect(spy_process_on).toHaveBeenNthCalledWith(2, 'SIGINT', expect.anything())
    })
    it('should call graceful stop for signal SIGTERM', async () => {
      appStarter['_registerOnExit']()
      appStarter['_gracefulStop'] = jest.fn().mockResolvedValue(undefined)
      await processOnSlots['SIGTERM']()
      expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
    })
    it('should call graceful stop for signal SIGINT', async () => {
      appStarter['_registerOnExit']()
      appStarter['_gracefulStop'] = jest.fn().mockResolvedValue(undefined)
      await processOnSlots['SIGINT']()
      expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
    })
    it('should log error if graceful fails for signal SIGTERM', async () => {
      const error = new Error('boom')
      appStarter['_registerOnExit']()
      appStarter['_gracefulStop'] = jest.fn().mockRejectedValue(error)
      await processOnSlots['SIGTERM']()
      expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
      expect(logger().error).toHaveBeenCalledTimes(1)
      expect(logger().error).toHaveBeenCalledWith(error)
    })
    it('should log error if graceful fails for signal SIGINT', async () => {
      const error = new Error('boom')
      appStarter['_registerOnExit']()
      appStarter['_gracefulStop'] = jest.fn().mockRejectedValue(error)
      await processOnSlots['SIGINT']()
      expect(appStarter['_gracefulStop']).toHaveBeenCalledTimes(1)
      expect(logger().error).toHaveBeenCalledTimes(1)
      expect(logger().error).toHaveBeenCalledWith(error)
    })
  })
})
