import { FunctionArray } from './function-array'

describe('app - FunctionArray', () => {
  const emptyFn = () => async (): Promise<void> => {
    return
  }

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

          expect(fnArray['_fns'].length).toEqual(subTest.fns.length)
          test.fns.forEach((f: any) => fnArray.append(f))
          expect(fnArray['_fns'].length).toEqual(subTest.fns.length + test.fns.length)
          expect(fnArray['_fns']).toEqual([...subTest.fns, ...test.fns])
        })
      })
    })
  })

  describe('execAll', () => {
    const fakeFnFactory = (result: number): jest.Mock => jest.fn().mockResolvedValue(result)
    const fakeErrorFnFactory = (error: Error): jest.Mock => jest.fn().mockRejectedValue(error)
    afterEach(jest.restoreAllMocks)
    ;(
      [
        { text: 'not call any function but should pass with no errors', fns: [], result: [] },
        { text: 'call one function', fns: [fakeFnFactory(1)], result: [1] },
        { text: 'call two functions in order', fns: [fakeFnFactory(2), fakeFnFactory(3)], result: [2, 3] },
        {
          text: 'call multiple function in order',
          fns: [fakeFnFactory(4), fakeFnFactory(5), fakeFnFactory(6), fakeFnFactory(7), fakeFnFactory(8)],
          result: [4, 5, 6, 7, 8],
        },
      ] as { text: string; fns: any[]; result: number[] }[]
    ).map((test) => {
      it(`should ${test.text}`, async () => {
        const fnArray = new FunctionArray(test.fns)
        const result = await fnArray.execAll()
        expect(result).toEqual(test.result)
        test.fns.forEach((fn) => expect(fn).toHaveBeenCalledTimes(1))
        test.fns.forEach((tfn, ix, ls) => {
          if (ix === 0) return
          expect(tfn).toHaveBeenCalledAfter(ls[ix - 1])
        })
      })
    })

    it('should throw error if any function throws error', async () => {
      const errorMessage = new Error('Boooooom')
      const fns = [fakeFnFactory(1), fakeFnFactory(2), fakeErrorFnFactory(errorMessage), fakeFnFactory(3)]
      const fnArray = new FunctionArray(fns)
      try {
        await fnArray.execAll()
        throw new Error('test failed')
      } catch (e: any) {
        expect(e.message).toEqual(errorMessage.message)
        expect(fns[0]).toHaveBeenCalledTimes(1)
        expect(fns[1]).toHaveBeenCalledTimes(1)
        expect(fns[2]).toHaveBeenCalledTimes(1)
        expect(fns[3]).not.toHaveBeenCalled()
      }
    })
  })
})
