import { LoggerStrategy } from '@beecode/msh-node-log'
import { NoLogger } from '@beecode/msh-node-log/lib/no-logger'

let _logger: LoggerStrategy = new NoLogger()

export const NodeAppLogger = (logger: LoggerStrategy): void => {
  _logger = logger
}

export const logger = (): LoggerStrategy => {
  return _logger
}
