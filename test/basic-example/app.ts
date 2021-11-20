import { AppFlow } from '../../src/app-flow'
import { FirstInitiable } from './initiate/first-initiable'
import { SecondInitiable } from './initiate/second-initiable'
import { ThirdInitiable } from './initiate/third-initiable'

export class App extends AppFlow {
  public constructor() {
    super(new FirstInitiable(), [new SecondInitiable(), new ThirdInitiable()])
  }
}
