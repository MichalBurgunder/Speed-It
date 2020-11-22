const assert = require('assert')
const speeder = require('../index')
const { COUNTS } = require('../performance-checker/globals')
describe('speeder', (done) => {
  async function testFunctionAsync() {
    return 0
  }

  function testFunction() {
    return 0
  }

  describe('no options', () => {
    it('single function returns single object', async () => {
      const basicAnalysis = await speeder(testFunction).then((result) => {
        assert.strictEqual(result.min * 0, 0)
        assert.strictEqual(result.max * 0, 0)
        assert.strictEqual(result.mean * 0, 0)
        assert.strictEqual(result.median * 0, 0)
        assert.strictEqual(result.variance * 0, 0)
        assert.strictEqual(result.std * 0, 0)
        assert.strictEqual(result.dataPoints * 0, 0)
        assert.strictEqual(result.rawData, undefined)
      })
    })
    it('multiple functions returns array of results', async () => {
      const basicAnalysis = await speeder([testFunction, testFunction]).then(
        (result) => {
          assert.strictEqual(result.length, 2)
        }
      )
    })
    it('works with sync and async functions', async () => {
      const analysisAsync = await speeder(
        testFunctionAsync
      ).then((result) => {})
      const analysisSync = await speeder(testFunction).then((result) => {
        assert.strictEqual(typeof result.min, typeof 0)
        assert.strictEqual(typeof result.min, typeof 0)
      })
    })
    it('creates a default name if names are not given', async () => {
      const analysisSync = await speeder(testFunction).then((result) => {
        assert.strictEqual(result.name, 'Function 1')
      })
    })
    it('creates a default names if names are not given', async () => {
      const analysisSync = await speeder([testFunction, testFunction]).then(
        (result) => {
          assert.strictEqual(result[0].name, 'Function 1')
          assert.strictEqual(result[1].name, 'Function 2')
        }
      )
    })
  })
  describe('options', () => {
    it.skip('works with maximum options, on multiple functions"', async (done) => {})
    describe('errors', () => {
      it('works with multiple functions', async () => {
        const result = await speeder([testFunction, testFunctionAsync]).then(
          (result) => {
            assert.strictEqual(result.length, 2)
            assert.strictEqual(typeof result[0].min, typeof 4.4)
            assert.strictEqual(typeof result[0].max, typeof 4.4)
            assert.strictEqual(typeof result[0].mean, typeof 4.4)
            assert.strictEqual(typeof result[0].median, typeof 4.4)
            assert.strictEqual(typeof result[0].variance, typeof 4.4)
            assert.strictEqual(typeof result[0].std, typeof 4.4)
          }
        )
      })
      it('works with single function', async () => {
        const result = await speeder(testFunction).then((result) => {
          assert.strictEqual(typeof result.min, typeof 4.4)
          assert.strictEqual(typeof result.max, typeof 4.4)
          assert.strictEqual(typeof result.mean, typeof 4.4)
          assert.strictEqual(typeof result.median, typeof 4.4)
          assert.strictEqual(typeof result.variance, typeof 4.4)
          assert.strictEqual(typeof result.std, typeof 4.4)
        })
      })
    })
    describe('raw', () => {
      it('outputs rawData if set to true', async () => {
        const result = await speeder(testFunction, {
          raw: true,
        }).then((result) => {
          assert.strictEqual(!!result.rawData, true)
          assert.strictEqual(result.rawData.length, COUNTS)
        })
      })
      it('outputs no rawData if set to false', async () => {
        speeder(testFunction).then((result) => {
          assert.strictEqual(!!result.rawData, false)
        })
      })
    })
    describe('names', () => {
      it('gives each analysis given names', async () => {
        const result = await speeder([testFunction, testFunctionAsync], {
          names: ['My Function', 'My Second Function'],
        }).then((result) => {
          assert.strictEqual(result[0].name, 'My Function')
          assert.strictEqual(result[1].name, 'My Second Function')
        })
      })
      it('throws error if name given is not a String', async () => {
        assert.throws(
          speeder(testFunction).then((result) => {
            assert.strictEqual(result.name, true)
          })
        )
      })
      it('default names the analysises if no names given', async () => {
        const result = await speeder(testFunction).then((result) => {
          assert.strictEqual(result.name, 'Function 1')
        })
      })
      it('default names the analysises on multiple functions', async () => {
        const result = await speeder([testFunction, testFunction]).then(
          (result) => {
            assert.strictEqual(result[0].name, 'Function 1')
            assert.strictEqual(result[1].name, 'Function 2')
          }
        )
      })
    })
    describe('inputs / multipleInputs', () => {
      it.skip('works with a single input, no multipleInputs', async () => {})
      it.skip('works with single input, multipleInputs', async () => {})
      it('does not throw error with multiple inputs, no multipleInputs (array input)', async () => {
        const result = await speeder([testFunction, testFunction], {
          inputs: [
            [77, 88],
            [77, 88],
          ],
          multipleInputs: false,
        }).then(() => {})
      })
      it('works with multiple inputs, multipleInputs', async () => {
        const result = await speeder([testFunction, testFunction], {
          inputs: [
            [77, 88],
            [77, 88],
          ],
          multipleInputs: true,
        }).then((result) => {})
      })
      it.skip('actually accepts the inputs', async () => {})
    })
  })
})
