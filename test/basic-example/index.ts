import { LogLevelType } from '@beecode/msh-node-log'
import { ConsoleLogger } from '@beecode/msh-node-log/lib/console-logger'
import { appStarterFactory } from '../../src/app-starter'
import { NodeAppLogger } from '../../src/util/logger'
import { App } from './app'

NodeAppLogger(new ConsoleLogger({ logLevel: LogLevelType.DEBUG }))

appStarterFactory(App)
  .start()
  .catch((err) => console.log(err)) // eslint-disable-line no-console
