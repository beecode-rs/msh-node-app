import { CallBackFn } from '.'

export class FunctionArray {
  private readonly __fns: CallBackFn[]

  public constructor(fns: CallBackFn[] = []) {
    this.__fns = fns
  }

  public async execAll(): Promise<void> {
    for (const fn of this.__fns) await fn()
  }
  public append(cb: CallBackFn): void {
    this.__fns.push(cb)
  }
  public get HasFns(): boolean {
    return this.__fns.length > 0
  }
}
