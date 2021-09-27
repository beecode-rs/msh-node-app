// import { App } from './app'
// import { expect } from 'chai'
// import { assert, createSandbox } from 'sinon'
//
// describe('app - App', () => {
//   describe('constructor', () => {
//     it('should pass init from constructor to initList', () => {
//       const dummyInitList = [{ init: 1 }, [{ init: 2 }, { init: 3 }], { init: 4 }] as any
//       const app = new App(...dummyInitList)
//       expect(app['__initList']).to.deep.equal(dummyInitList)
//       expect(app['__initList']).not.to.equal(dummyInitList)
//     })
//   })
//
//   describe('initiate', () => {
//     const sandbox = createSandbox()
//     const fakeFn = (_id: number = Math.random()): { initiate: any; _id: number } => ({
//       // eslint-disable-next-line no-unused-labels
//       initiate: sandbox.fake.resolves(undefined),
//       _id,
//     })
//     afterEach(sandbox.restore)
//     ;([
//       { text: 'exec with no errors if no init available', inits: [] },
//       { text: 'exec one init fn', inits: [fakeFn()] },
//       { text: 'exec two init fn', inits: [fakeFn(), fakeFn()] },
//       { text: 'exec multi init fn', inits: [fakeFn(), fakeFn(), fakeFn(), fakeFn(), fakeFn()] },
//       { text: 'exec one parallel init fn', inits: [[fakeFn(), fakeFn()]] },
//       {
//         text: 'exec two parallel init fn',
//         inits: [
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//         ],
//       },
//       {
//         text: 'exec multi parallel init fn',
//         inits: [
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//         ],
//       },
//       { text: 'exec mixed tow serial parallel init fn', inits: [fakeFn(), [fakeFn(), fakeFn()]] },
//       {
//         text: 'exec mixed multiple serial parallel init fn',
//         inits: [fakeFn(), [fakeFn(), fakeFn()], fakeFn(), fakeFn(), [fakeFn(), fakeFn(), fakeFn(), fakeFn()]],
//       },
//     ] as { text: string; inits: { initiate: any }[] }[]).map((test) => {
//       it(`should ${test.text}`, async () => {
//         const app = new App(...(test.inits as any))
//         await app.initiate()
//         test.inits.flat().forEach((init) => assert.calledOnce(init.initiate))
//         assert.callOrder(...test.inits.flat().map((i) => i.initiate))
//       })
//     })
//   })
//   describe('destroy', () => {
//     const sandbox = createSandbox()
//     const fakeFn = (_id: number = Math.random()): { destroy: any; _id: number } => ({
//       // eslint-disable-next-line no-unused-labels
//       destroy: sandbox.fake.resolves(undefined),
//       _id,
//     })
//     afterEach(sandbox.restore)
//     ;([
//       { text: 'exec with no errors if no init available', inits: [] },
//       { text: 'exec one init fn', inits: [fakeFn()] },
//       { text: 'exec two init fn', inits: [fakeFn(), fakeFn()] },
//       { text: 'exec multi init fn', inits: [fakeFn(), fakeFn(), fakeFn(), fakeFn(), fakeFn()] },
//       { text: 'exec one parallel init fn', inits: [[fakeFn(), fakeFn()]] },
//       {
//         text: 'exec two parallel init fn',
//         inits: [
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//         ],
//       },
//       {
//         text: 'exec multi parallel init fn',
//         inits: [
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn()],
//           [fakeFn(), fakeFn(), fakeFn()],
//         ],
//       },
//       { text: 'exec mixed tow serial parallel init fn', inits: [fakeFn(), [fakeFn(), fakeFn()]] },
//       {
//         text: 'exec mixed multiple serial parallel init fn',
//         inits: [fakeFn(), [fakeFn(), fakeFn()], fakeFn(), fakeFn(), [fakeFn(), fakeFn(), fakeFn(), fakeFn()]],
//       },
//     ] as { text: string; inits: { destroy: any }[] }[]).map((test) => {
//       it(`should ${test.text}`, async () => {
//         const app = new App(...(test.inits as any))
//         await app.destroy()
//         test.inits.flat().forEach((init) => assert.calledOnce(init.destroy))
//         assert.callOrder(
//           ...test.inits
//             .reverse()
//             .flat()
//             .map((i) => i.destroy)
//         )
//       })
//     })
//   })
// })

it('should dummy test', () => {
  // dummy
})
