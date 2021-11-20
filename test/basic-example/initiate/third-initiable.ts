import { LifeCycle } from '../../../src/life-cycle'

export class ThirdInitiable extends LifeCycle {
  constructor() {
    super({ name: 'Third initiable' })
  }

  protected async _createFn(): Promise<any> {
    console.log('%%%%%% Third create') // eslint-disable-line no-console
  }

  protected async _destroyFn(): Promise<any> {
    console.log('%%%%%% Third destroy') // eslint-disable-line no-console
  }
}
