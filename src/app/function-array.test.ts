import { FunctionArray } from '.'
import { expect } from 'chai'

describe('app - FunctionArray', () => {
  describe('constructor', () => {
    it('should set fns to empty array by default', () => {
      const fnArray = new FunctionArray()
      expect(fnArray['__fns']).to.deep.equal([])
    })
    it('should pass param fn array to fns property', () => {
      const fnArrayParams = [
        async (): Promise<void> => {
          return
        },
        async (): Promise<void> => {
          return
        },
      ]
      const fnArray = new FunctionArray(fnArrayParams)
      expect(fnArray['__fns']).to.equal(fnArrayParams)
    })
  })
})
