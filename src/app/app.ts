import { Initiate } from './initiate'

export class App {
  private readonly __initList: (Initiate | Initiate[])[]

  constructor(...args: (Initiate | Initiate[])[]) {
    this.__initList = [...args]
  }

  public async initiate(): Promise<void> {
    for (const init of this.__initList) {
      if (!Array.isArray(init)) await init.initiate()
      else await Promise.all(init.map((i) => i.initiate()))
    }
  }

  public async destroy(): Promise<void> {
    for (const rInit of this.__initList.reverse()) {
      if (!Array.isArray(rInit)) await rInit.destroy()
      else await Promise.all(rInit.map((i) => i.destroy()))
    }
  }
}
