import { LoggerStrategy } from './logger-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockLoggerStrategy {
  debug: SinonStub<any[], void>
  error: SinonStub<any[], void>
  info: SinonStub<any[], void>
  warn: SinonStub<any[], void>
}

export const mockLoggerStrategy = (sandbox: SinonSandbox): any =>
  class implements LoggerStrategy, MockLoggerStrategy {
    public stub_constructor = sandbox.stub()
    public constructor(...args: any[]) {
      this.stub_constructor(...args)
    }
    public debug = sandbox.stub()
    public error = sandbox.stub()
    public info = sandbox.stub()
    public warn = sandbox.stub()
  }
