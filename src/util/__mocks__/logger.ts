import { LoggerStrategy, LoggerStrategyParams, StringOrObjectType } from '@beecode/msh-node-log'

export const _logger: LoggerStrategy = {
  debug: jest.fn<void, StringOrObjectType[]>(),
  error: jest.fn<void, StringOrObjectType[]>(),
  info: jest.fn<void, StringOrObjectType[]>(),
  warn: jest.fn<void, StringOrObjectType[]>(),
  clone: jest.fn<LoggerStrategy, [LoggerStrategyParams]>(),
}

export const logger = (): LoggerStrategy => {
  return _logger
}
