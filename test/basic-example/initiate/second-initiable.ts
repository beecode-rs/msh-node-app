import { LifeCycle } from '../../../src/life-cycle'

export class SecondInitiable extends LifeCycle {
  constructor() {
    super({ name: 'Second initiable' })
  }

  protected async _createFn(): Promise<any> {
    console.log('%%%%%% Second create') // eslint-disable-line no-console
  }

  protected async _destroyFn(): Promise<any> {
    console.log('%%%%%% Second destroy') // eslint-disable-line no-console
  }
}
