import { NoLogger } from '.'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('logger - NoLogger', () => {
  describe('should not call logger', () => {
    const sandbox = createSandbox()
    const logger = new NoLogger()
    const dummyMessage = 'dummyMessage'
    const dummyObject = { dummy: 'object' }
    let stub_console_log: SinonStub
    beforeEach(() => {
      stub_console_log = sandbox.stub(console, 'log')
    })
    afterEach(sandbox.restore)

    it('should not log on error', () => {
      logger.error(dummyMessage, dummyObject)
      assert.notCalled(stub_console_log)
    })

    it('should not log on warn', () => {
      logger.warn(dummyMessage, dummyObject)
      assert.notCalled(stub_console_log)
    })

    it('should not log on info', () => {
      logger.info(dummyMessage, dummyObject)
      assert.notCalled(stub_console_log)
    })

    it('should not log on debug', () => {
      logger.debug(dummyMessage, dummyObject)
      assert.notCalled(stub_console_log)
    })
  })
})
