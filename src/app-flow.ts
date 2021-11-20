import { LifeCycle } from './life-cycle'
import { logger } from './util/logger'

export type FlowList = (LifeCycle | LifeCycle[])[]

export enum FlowDirection {
  DESTROY = 'destroy',
  CREATE = 'create',
}

export abstract class AppFlow {
  protected readonly _flowList: FlowList

  protected constructor(...args: FlowList) {
    this._flowList = [...args]
  }

  public async create(): Promise<void> {
    await AppFlow.DeepExecFlowList({ flowList: this._flowList, direction: FlowDirection.CREATE })
  }

  public async destroy(): Promise<void> {
    await AppFlow.DeepExecFlowList({ flowList: this._topLevelReversedFlowList(), direction: FlowDirection.DESTROY })
  }

  protected _topLevelReversedFlowList(): FlowList {
    return this._flowList.reverse()
  }

  public static async DeepExecFlowList(params: { flowList: FlowList; direction: FlowDirection }): Promise<void> {
    try {
      const { flowList, direction } = params
      for (const lifeCycle of flowList) {
        if (Array.isArray(lifeCycle)) await AppFlow.ExecSyncFlowList(lifeCycle, direction)
        else await lifeCycle[direction]()
      }
    } catch (err) {
      if (err instanceof Error) logger().error(err)
      throw err
    }
  }

  public static async ExecSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: FlowDirection): Promise<void> {
    await Promise.all(lifeCycleList.map((lifeCycle: LifeCycle) => lifeCycle[createOrDestroy]()))
  }
}
