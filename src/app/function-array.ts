import { CallBackFn } from '.'

export interface IFunctionArray {
  execAll(): Promise<void>
  append: (cb: CallBackFn) => void
  readonly HasFns: boolean
}

export class FunctionArray implements IFunctionArray {
  private readonly __fns: CallBackFn[] = []

  public constructor(fns: CallBackFn[] = []) {
    this.__fns = [...this.__fns, ...fns]
  }

  public async execAll(): Promise<void> {
    for (const fn of this.__fns) await fn()
  }
  public append = (cb: CallBackFn): void => {
    this.__fns.push(cb)
  }
  public get HasFns(): boolean {
    return this.__fns.length > 0
  }
}
