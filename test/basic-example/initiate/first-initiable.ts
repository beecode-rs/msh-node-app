import { LifeCycle } from '../../../src/life-cycle'

export class FirstInitiable extends LifeCycle {
  public constructor() {
    super({ name: 'First initiable' })
  }

  protected async _createFn(): Promise<any> {
    console.log('%%%%%% First create') // eslint-disable-line no-console
  }

  protected async _destroyFn(): Promise<any> {
    console.log('%%%%%% First destroy') // eslint-disable-line no-console
  }
}
