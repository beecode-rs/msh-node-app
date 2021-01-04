import { MockFunctionArray, mockFunctionArray } from './function-array.test'
import { Initiate } from './initiate'
import { mockLoggerStrategy } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonSandbox, assert, createSandbox } from 'sinon'

export const instanceInitiateFactory = (sandbox: SinonSandbox): any =>
  class extends Initiate {
    public name = sandbox.stub()

    public get Name(): string {
      return this.name()
    }

    protected _destroyFn = sandbox.stub()
    protected _initFn = sandbox.stub()
  }

describe('app - Initiate', () => {
  const sandbox = createSandbox()
  proxyquire.noCallThru()
  const dummyName = 'dummyName'
  let init: Initiate

  beforeEach(() => {
    init = new (instanceInitiateFactory(sandbox))()
    ;(init as any).name.returns(dummyName)
  })

  describe('get Name', () => {
    it('should return name', () => {
      expect(init.Name).to.equal(dummyName)
      assert.calledOnce((init as any).name)
    })
  })

  describe('set Logger', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    it('should set loggerStrategy', () => {
      const mockLogger = mockLoggerStrategy(sandbox)
      init.Logger = mockLogger
      expect(init['__loggerStrategy']).to.equal(mockLogger)
    })
  })

  describe('get _Logger', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    it('should set loggerStrategy', () => {
      const mockLogger = mockLoggerStrategy(sandbox)
      init['__loggerStrategy'] = mockLogger
      expect(init['_Logger']).to.equal(mockLogger)
    })
  })

  describe('override module', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    let mod: any

    let overrideInitiate: any

    beforeEach(() => {
      mod = proxyquire('./initiate', {
        '@beecode/msh-node-log': {
          NoLogger: mockLoggerStrategy(sandbox),
        },
        '.': {
          FunctionArray: mockFunctionArray(sandbox),
        },
      })
      overrideInitiate = new (class extends mod.Initiate {
        public name = sandbox.stub()

        public get Name(): string {
          return this.name()
        }

        protected _destroyFn = sandbox.stub()
        protected _initFn = sandbox.stub()
      })() as any
      overrideInitiate.name.returns(dummyName)
    })

    describe('initiate', () => {
      it('should default logging strategy', async () => {
        const init = overrideInitiate
        await init.initiate()

        const defaultLogger = init['_Logger']

        assert.calledThrice(defaultLogger.debug)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Init`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Init`)
      })

      it('should call chosen logger strategy', async () => {
        const customLogger = new (mockLoggerStrategy(sandbox))()
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        init.Logger = customLogger
        await init.initiate()

        assert.notCalled(defaultLogger.debug)
        assert.calledThrice(customLogger.debug)
        assert.calledWith(customLogger.debug.getCall(0), `${dummyName} - Init Called`)
        assert.calledWith(customLogger.debug.getCall(1), `${dummyName} - START - Init`)
        assert.calledWith(customLogger.debug.getCall(2), `${dummyName} - END   - Init`)
      })

      it('should call pre init and init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const preInitFn = init['__preInitFn'] as MockFunctionArray
        preInitFn.getHasFun.returns(true)

        await init.initiate()
        assert.callCount(defaultLogger.debug, 5)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Init`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Init`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Init`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Init`)
        assert.calledOnce(preInitFn.execAll)
      })

      it('should call post init and init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const postInitFn = init['__postInitFn'] as MockFunctionArray
        postInitFn.getHasFun.returns(true)

        await init.initiate()
        assert.callCount(defaultLogger.debug, 5)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Init`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Init`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Post Init`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Post Init`)
        assert.calledOnce(postInitFn.execAll)
      })

      it('should call pre, init and post init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const preInitFn = init['__preInitFn'] as MockFunctionArray
        preInitFn.getHasFun.returns(true)
        const postInitFn = init['__postInitFn'] as MockFunctionArray
        postInitFn.getHasFun.returns(true)

        await init.initiate()
        assert.callCount(defaultLogger.debug, 7)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Init`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Init`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Init`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Init`)
        assert.calledWith(defaultLogger.debug.getCall(5), `${dummyName} - START - Post Init`)
        assert.calledWith(defaultLogger.debug.getCall(6), `${dummyName} - END   - Post Init`)
        assert.calledOnce(preInitFn.execAll)
        assert.calledOnce(init._initFn)
        assert.calledOnce(postInitFn.execAll)
        assert.callOrder(preInitFn.execAll, init._initFn, postInitFn.execAll)
      })
    })

    describe('destroy', () => {
      it('should default logging strategy', async () => {
        const init = overrideInitiate
        await init.destroy()

        const defaultLogger = init['_Logger']

        assert.calledThrice(defaultLogger.debug)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Destroy`)
      })

      it('should call chosen logger strategy', async () => {
        const customLogger = new (mockLoggerStrategy(sandbox))()
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        init.Logger = customLogger
        await init.destroy()

        assert.notCalled(defaultLogger.debug)
        assert.calledThrice(customLogger.debug)
        assert.calledWith(customLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
        assert.calledWith(customLogger.debug.getCall(1), `${dummyName} - START - Destroy`)
        assert.calledWith(customLogger.debug.getCall(2), `${dummyName} - END   - Destroy`)
      })

      it('should call pre init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const preDestroyFn = init['__preDestroyFn'] as MockFunctionArray
        preDestroyFn.getHasFun.returns(true)

        await init.destroy()
        assert.callCount(defaultLogger.debug, 5)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Destroy`)
        assert.calledOnce(preDestroyFn.execAll)
      })

      it('should call post init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const postDestroyFn = init['__postDestroyFn'] as MockFunctionArray
        postDestroyFn.getHasFun.returns(true)

        await init.destroy()
        assert.callCount(defaultLogger.debug, 5)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Post Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Post Destroy`)
        assert.calledOnce(postDestroyFn.execAll)
      })
      it('should call pre, init and post init if it has functions', async () => {
        const init = overrideInitiate
        const defaultLogger = init['_Logger']
        const preDestroyFn = init['__preDestroyFn'] as MockFunctionArray
        preDestroyFn.getHasFun.returns(true)
        const postDestroyFn = init['__postDestroyFn'] as MockFunctionArray
        postDestroyFn.getHasFun.returns(true)

        await init.destroy()
        assert.callCount(defaultLogger.debug, 7)
        assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
        assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(3), `${dummyName} - START - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(4), `${dummyName} - END   - Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(5), `${dummyName} - START - Post Destroy`)
        assert.calledWith(defaultLogger.debug.getCall(6), `${dummyName} - END   - Post Destroy`)
        assert.calledOnce(preDestroyFn.execAll)
        assert.calledOnce(init._destroyFn)
        assert.calledOnce(postDestroyFn.execAll)
        assert.callOrder(preDestroyFn.execAll, init._destroyFn, postDestroyFn.execAll)
      })
    })

    describe('append', () => {
      ;([
        { prop: 'preInitFn', fn: 'onPreInit' },
        { prop: 'postInitFn', fn: 'onPostInit' },
        { prop: 'preDestroyFn', fn: 'onPreDestroy' },
        { prop: 'postDestroyFn', fn: 'onPostDestroy' },
      ] as { prop: string; fn: string }[]).map((test) => {
        it(`should call ${test.prop}.append`, () => {
          const init = overrideInitiate as any
          assert.notCalled(init[`__${test.prop}`].append)
          init[test.fn]({})
          assert.calledOnce(init[`__${test.prop}`].append)
        })
      })
    })
  })
})
