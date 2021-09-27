import { LifeCycle } from './life-cycle/life-cycle'

export type LifeCycleList = (LifeCycle | LifeCycle[])[]

export enum LifeCycleDirection {
  DESTROY = 'destroy',
  CREATE = 'create',
}

export class AppFlow {
  protected readonly _lifeCycleList: LifeCycleList

  constructor(...args: LifeCycleList) {
    this._lifeCycleList = [...args]
  }

  public async create(): Promise<void> {
    await this._deepExecFlowList(this._lifeCycleList, LifeCycleDirection.CREATE)
  }

  public async destroy(): Promise<void> {
    await this._deepExecFlowList(this._topLevelReversedFlowList(), LifeCycleDirection.DESTROY)
  }

  protected _topLevelReversedFlowList(): LifeCycleList {
    return this._lifeCycleList.reverse()
  }

  protected async _deepExecFlowList(lifeCycleList: LifeCycleList, createOrDestroy: LifeCycleDirection): Promise<void> {
    for (const lifeCycle of lifeCycleList) {
      if (Array.isArray(lifeCycle)) await this._execSyncFlowList(lifeCycle, createOrDestroy)
      else await lifeCycle[createOrDestroy]()
    }
  }

  protected async _execSyncFlowList(lifeCycleList: LifeCycle[], createOrDestroy: LifeCycleDirection): Promise<void> {
    await Promise.all(lifeCycleList.map((i: LifeCycle) => i[createOrDestroy]()))
  }
}
