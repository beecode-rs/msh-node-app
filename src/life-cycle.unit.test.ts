import { LifeCycle } from './life-cycle'
import { logger } from './util/logger'

jest.mock('./util/logger')
export class LifeCycleMockImplementation extends LifeCycle {
  public constructor(params: { name: string }) {
    super(params)
    this._createFn = jest.fn()
    this._destroyFn = jest.fn()
  }

  protected _createFn: jest.Mock
  protected _destroyFn: jest.Mock

  public get CreateFn(): jest.Mock {
    return this._createFn
  }
  public get DestroyFn(): jest.Mock {
    return this._destroyFn
  }
}

describe('LifeCycle', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('name', () => {
    it('should set name property', () => {
      const someName = 'someName'
      const lifeCycle = new LifeCycleMockImplementation({ name: someName })

      expect(lifeCycle.name).toEqual(someName)
    })
  })

  describe('create', () => {
    it('should execute create and log start/stop', async () => {
      const lifeCycle = new LifeCycleMockImplementation({ name: 'test-create' })
      lifeCycle.CreateFn.mockResolvedValue('create returns this')

      const result = await lifeCycle.create()

      expect(result).toEqual('create returns this')
      expect(logger().debug).toHaveBeenCalledTimes(2)
      expect(logger().debug).toHaveBeenNthCalledWith(1, 'test-create Create START')
      expect(logger().debug).toHaveBeenNthCalledWith(2, 'test-create Create END')
      expect(lifeCycle.CreateFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('destroy', () => {
    it('should execute destroy and log start/stop', async () => {
      const lifeCycle = new LifeCycleMockImplementation({ name: 'test-destroy' })
      lifeCycle.DestroyFn.mockResolvedValue('destroy returns this')

      const result = await lifeCycle.destroy()

      expect(result).toEqual('destroy returns this')
      expect(logger().debug).toHaveBeenCalledTimes(2)
      expect(logger().debug).toHaveBeenNthCalledWith(1, 'test-destroy Destroy START')
      expect(logger().debug).toHaveBeenNthCalledWith(2, 'test-destroy Destroy END')
      expect(lifeCycle.DestroyFn).toHaveBeenCalledTimes(1)
    })
  })
})
