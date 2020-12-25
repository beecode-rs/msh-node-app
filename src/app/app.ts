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
}
