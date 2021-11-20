import { FlowList } from '../app-flow'

export class AppFlow {
  protected readonly _flowList: FlowList

  public get FlowList(): FlowList {
    return this._flowList
  }

  protected constructor(...args: FlowList) {
    this._flowList = [...args]
  }

  public create = jest.fn()
  public destroy = jest.fn()
}
