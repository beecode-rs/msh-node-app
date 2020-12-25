import { MockFunctionArray, mockFunctionArray } from './function-array.test'
import { Initiate } from './initiate'
import { mockLoggerStrategy } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { assert, createSandbox } from 'sinon'

describe('app - Initiate', () => {
  proxyquire.noCallThru()
  const dummyName = 'dummyName'
  let init: Initiate

  beforeEach(() => {
    init = new Initiate({ name: dummyName })
  })

  describe('constructor', () => {
    it('should set options', () => {
      const dummyInitFn = async (): Promise<void> => {
        return
      }
      const dummyDestroyFn = async (): Promise<void> => {
        return
      }
      const newInit = new Initiate({ name: dummyName, initiateFn: dummyInitFn, destroyFn: dummyDestroyFn })
      expect(newInit['__name']).to.equal(dummyName)
      expect(newInit['__initFn']).to.equal(dummyInitFn)
      expect(newInit['__destroyFn']).to.equal(dummyDestroyFn)
    })
  })

  describe('get Name', () => {
    it('should return name', () => {
      expect(init.Name).to.equal(dummyName)
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

  describe('initiate', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    let mod: any

    beforeEach(() => {
      mod = proxyquire('./initiate', {
        '@beecode/msh-node-log': {
          NoLogger: mockLoggerStrategy(sandbox),
        },
        '.': {
          FunctionArray: mockFunctionArray(sandbox),
        },
      })
    })

    it('should default logging strategy', async () => {
      const init = new mod.Initiate({ name: dummyName })
      await init.initiate()

      const defaultLogger = init['_Logger']

      assert.calledOnce(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug, `${dummyName} - Init Called`)
    })

    it('should call chosen logger strategy', async () => {
      const customLogger = new (mockLoggerStrategy(sandbox))()
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      init.Logger = customLogger
      await init.initiate()

      assert.notCalled(defaultLogger.debug)
      assert.calledOnce(customLogger.debug)
      assert.calledWith(customLogger.debug, `${dummyName} - Init Called`)
    })

    it('should call pre init if it has functions', async () => {
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      const preInitFn = init['__preInitFn'] as MockFunctionArray
      preInitFn.getHasFun.returns(true)

      await init.initiate()
      assert.calledThrice(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
      assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Init`)
      assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Init`)
      assert.calledOnce(preInitFn.execAll)
    })

    it('should call post init if it has functions', async () => {
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      const postInitFn = init['__postInitFn'] as MockFunctionArray
      postInitFn.getHasFun.returns(true)

      await init.initiate()
      assert.calledThrice(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Init Called`)
      assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Post Init`)
      assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Post Init`)
      assert.calledOnce(postInitFn.execAll)
    })

    it('should call pre, init and post init if it has functions', async () => {
      const fakeInitFn = sandbox.fake.resolves(undefined)
      const init = new mod.Initiate({ name: dummyName, initiateFn: fakeInitFn })
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
      assert.calledOnce(fakeInitFn)
      assert.calledOnce(postInitFn.execAll)
      assert.callOrder(preInitFn.execAll, fakeInitFn, postInitFn.execAll)
    })
  })

  describe('destroy', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    let mod: any

    beforeEach(() => {
      mod = proxyquire('./initiate', {
        '@beecode/msh-node-log': {
          NoLogger: mockLoggerStrategy(sandbox),
        },
        '.': {
          FunctionArray: mockFunctionArray(sandbox),
        },
      })
    })

    it('should default logging strategy', async () => {
      const init = new mod.Initiate({ name: dummyName })
      await init.destroy()

      const defaultLogger = init['_Logger']

      assert.calledOnce(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug, `${dummyName} - Destroy Called`)
    })

    it('should call chosen logger strategy', async () => {
      const customLogger = new (mockLoggerStrategy(sandbox))()
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      init.Logger = customLogger
      await init.destroy()

      assert.notCalled(defaultLogger.debug)
      assert.calledOnce(customLogger.debug)
      assert.calledWith(customLogger.debug, `${dummyName} - Destroy Called`)
    })

    it('should call pre init if it has functions', async () => {
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      const preDestroyFn = init['__preDestroyFn'] as MockFunctionArray
      preDestroyFn.getHasFun.returns(true)

      await init.destroy()
      assert.calledThrice(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
      assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Pre Destroy`)
      assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Pre Destroy`)
      assert.calledOnce(preDestroyFn.execAll)
    })

    it('should call post init if it has functions', async () => {
      const init = new mod.Initiate({ name: dummyName })
      const defaultLogger = init['_Logger']
      const postDestroyFn = init['__postDestroyFn'] as MockFunctionArray
      postDestroyFn.getHasFun.returns(true)

      await init.destroy()
      assert.calledThrice(defaultLogger.debug)
      assert.calledWith(defaultLogger.debug.getCall(0), `${dummyName} - Destroy Called`)
      assert.calledWith(defaultLogger.debug.getCall(1), `${dummyName} - START - Post Destroy`)
      assert.calledWith(defaultLogger.debug.getCall(2), `${dummyName} - END   - Post Destroy`)
      assert.calledOnce(postDestroyFn.execAll)
    })
    it('should call pre, init and post init if it has functions', async () => {
      const fakeDestroyFn = sandbox.fake.resolves(undefined)
      const init = new mod.Initiate({ name: dummyName, destroyFn: fakeDestroyFn })
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
      assert.calledOnce(fakeDestroyFn)
      assert.calledOnce(postDestroyFn.execAll)
      assert.callOrder(preDestroyFn.execAll, fakeDestroyFn, postDestroyFn.execAll)
    })
  })

  describe('append', () => {
    const sandbox = createSandbox()
    afterEach(sandbox.restore)
    let mod: any

    beforeEach(() => {
      mod = proxyquire('./initiate', {
        '@beecode/msh-node-log': {
          NoLogger: mockLoggerStrategy(sandbox),
        },
        '.': {
          FunctionArray: mockFunctionArray(sandbox),
        },
      })
    })
    ;([
      { prop: 'preInitFn', fn: 'onPreInit' },
      { prop: 'postInitFn', fn: 'onPostInit' },
      { prop: 'preDestroyFn', fn: 'onPreDestroy' },
      { prop: 'postDestroyFn', fn: 'onPostDestroy' },
    ] as { prop: string; fn: string }[]).map((test) => {
      it(`should call ${test.prop}.append`, () => {
        const init = new mod.Initiate({ name: dummyName })
        assert.notCalled(init[`__${test.prop}`].append)
        init[test.fn]({})
        assert.calledOnce(init[`__${test.prop}`].append)
      })
    })
  })
})
