import { EventBus } from './event-bus'
import { EventBusType } from './event-bus-type'

export const eventBusUtil = {
  startEndEventWrapAndExecute: async <T = any>(eventBus: EventBus, message: string, cb: () => Promise<any>): Promise<T> => {
    eventBus.emit(EventBusType.LOG, ['START', message].join(' - '))
    const result = await cb()
    eventBus.emit(EventBusType.LOG, ['END  ', message].join(' - '))
    return result
  },
}
