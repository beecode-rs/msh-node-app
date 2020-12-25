import { FunctionArray, IFunctionArray } from '.'
import { expect } from 'chai'
import { SinonSandbox, SinonStub, assert, createSandbox } from 'sinon'

export interface MockFunctionArray {
  append: SinonStub
  readonly HasFns: boolean
  getHasFun: SinonStub
  execAll: SinonStub
}

export const mockFunctionArray = (sandbox: SinonSandbox): any =>
  class implements IFunctionArray, MockFunctionArray {
    public append = sandbox.stub()

    public get HasFns(): boolean {
      return this.getHasFun()
    }
    public getHasFun = sandbox.stub()

    public execAll = sandbox.stub()
  }

describe('app - FunctionArray', () => {
  const emptyFn = () => async (): Promise<void> => {
    return
  }

  describe('constructor', () => {
    it('should set fns to empty array by default', () => {
      const fnArray = new FunctionArray()
      expect(fnArray['__fns']).to.deep.equal([])
    })
    it('should pass param fn array to fns property', () => {
      const fnArrayParams = [emptyFn(), emptyFn()]
      const fnArray = new FunctionArray(fnArrayParams)
      expect(fnArray['__fns']).to.deep.equal(fnArrayParams)
    })
  })

  describe('HasFns', () => {
    ;([
      {
        fns: [],
        text: 'there are no functions in fns',
        result: false,
      },
      {
        fns: [emptyFn()],
        text: 'there is one function in fns',
        result: true,
      },
      {
        fns: [emptyFn(), emptyFn()],
        text: 'there are two functions in fns',
        result: true,
      },
      {
        fns: [emptyFn(), emptyFn(), emptyFn(), emptyFn(), emptyFn(), emptyFn()],
        text: 'there are many functions in fns',
        result: true,
      },
    ] as { fns: any; text: string; result: boolean }[]).map((test) => {
      it(`should return ${test.result} if ${test.text}`, () => {
        const fnArray = new FunctionArray(test.fns)
        expect(fnArray['__fns']).to.deep.equal(test.fns)
        expect(fnArray.HasFns).to.equal(test.result)
      })
    })
  })

  describe('append', () => {
    const tests = [
      { text: 'append one function', fns: [emptyFn()] },
      { text: 'append two functions', fns: [emptyFn(), emptyFn()] },
      { text: 'append multiple functions', fns: [emptyFn(), emptyFn(), emptyFn(), emptyFn(), emptyFn()] },
    ] as { text: string; fns: any }[]
    const subTests = [
      { text: 'empty fns', fns: [] },
      { text: 'fns whit one function', fns: [emptyFn()] },
      { text: 'fns whit two functions', fns: [emptyFn(), emptyFn()] },
      { text: 'fns whit many functions', fns: [emptyFn(), emptyFn(), emptyFn(), emptyFn(), emptyFn(), emptyFn()] },
    ] as { text: string; fns: any }[]

    tests.map((test) => {
      subTests.map((subTest) => {
        it(`should ${test.text} to ${subTest.text}`, () => {
          const fnArray = new FunctionArray(subTest.fns)

          expect(fnArray['__fns'].length).to.equal(subTest.fns.length)
          test.fns.forEach(fnArray.append)
          expect(fnArray['__fns'].length).to.equal(subTest.fns.length + test.fns.length)
          expect(fnArray['__fns']).to.deep.equal([...subTest.fns, ...test.fns])
        })
      })
    })
  })

  describe('execAll', () => {
    const sandbox = createSandbox()
    const fakeFn = (): any => sandbox.fake.resolves(undefined)
    afterEach(sandbox.restore)
    ;([
      { text: 'not call any function but should pass with no errors', fns: [] },
      { text: 'call one function', fns: [fakeFn()] },
      { text: 'call two functions in order', fns: [fakeFn(), fakeFn()] },
      { text: 'call multiple function in order', fns: [fakeFn(), fakeFn(), fakeFn(), fakeFn(), fakeFn()] },
    ] as { text: string; fns: any[] }[]).map((test) => {
      it(`should ${test.text}`, async () => {
        const fnArray = new FunctionArray(test.fns)
        await fnArray.execAll()
        test.fns.forEach((fn) => assert.calledOnce(fn))
        assert.callOrder(...test.fns)
      })
    })

    it('should throw error if any function throws error', async () => {
      const errorMessage = new Error('Boooooom')
      const fns = [fakeFn(), fakeFn(), sandbox.fake.throws(errorMessage), fakeFn()]
      const fnArray = new FunctionArray(fns)
      try {
        await fnArray.execAll()
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal(errorMessage.message)
        assert.calledOnce(fns[0])
        assert.calledOnce(fns[1])
        assert.calledOnce(fns[2])
        assert.notCalled(fns[3])
      }
    })
  })
})
