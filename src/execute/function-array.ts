export type CallBackFn<T> = () => Promise<T>

export class FunctionArray<T = any> {
  protected _fns: CallBackFn<T>[]

  public constructor(fns: CallBackFn<T>[] = []) {
    this._fns = [...fns]
  }

  public async execAll(): Promise<T[]> {
    const result: T[] = []
    for (const fn of this._fns) result.push(await fn())
    return result
  }

  public append(cb: CallBackFn<T>): void {
    this._fns.push(cb)
  }

  public get HasFns(): boolean {
    return this._fns.length > 0
  }
}
