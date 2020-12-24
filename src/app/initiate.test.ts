import { Initiate } from './initiate'
import { mockLoggerStrategy } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import { createSandbox } from 'sinon'

describe('app - Initiate', () => {
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
})
