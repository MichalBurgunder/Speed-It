const assert = require('assert')
const speeder = require('../index')

describe('speeder', () => {
  async function testFunctionAsync() {
    return 0
  }

  function testFunction() {
    return 0
  }

  describe('no options', () => {
    it('single function returns single object', async () => {
      const basicAnalysis = await speeder(testFunction)

      assert.strictEqual(basicAnalysis.min * 0, 0)
      assert.strictEqual(basicAnalysis.max * 0, 0)
      assert.strictEqual(basicAnalysis.mean * 0, 0)
      assert.strictEqual(basicAnalysis.median * 0, 0)
      assert.strictEqual(basicAnalysis.variance * 0, 0)
      assert.strictEqual(basicAnalysis.std * 0, 0)
      assert.strictEqual(basicAnalysis.dataPoints * 0, 0)
      assert.strictEqual(basicAnalysis.rawData, undefined)
    })
    it('multiple functions returns array of results', async () => {
      const basicAnalysis = await speeder([testFunction, testFunction])
      assert.strictEqual(basicAnalysis.length, 2)
    })
    it('works with sync and async functions', async () => {
      const analysisAsync = await speeder(testFunctionAsync)
      const analysisSync = await speeder(testFunction)
      assert.strictEqual(analysisAsync.min * 0, 0)

      assert.strictEqual(analysisSync.min * 0, 0)
    })
    it('creates a default name if names are not given', async () => {
      const analysisSync = await speeder(testFunction)
      assert.strictEqual(analysisSync.name, 'Function 1')
    })
    it('creates a default names if names are not given', async () => {
      const analysisSync = await speeder([testFunction, testFunction])
      assert.strictEqual(analysisSyn[0].name, 'Function 1')
      assert.strictEqual(analysisSyn[0].name, 'Function 2')
    })
  })
  describe('options', () => {
    describe('errors', () => {
      it('works with multiple functions"', async () => {})
      it('works with single function', async () => {})
    })
    describe('raw', () => {
      it('outputs rawData if set to true', async () => {})
      it('outputs no rawData if set to false', async () => {})
    })
    describe('names', () => {
      it('gives each analysis given names', async () => {})
      it('default names the analysises if no names given', async () => {})
    })
    describe('inputs / multipleInputs', () => {
      it('works with a single input, no multipleInputs', async () => {})
      it('works with single input, multipleInputs', async () => {})
      it('throw error with multiple inputs, no multipleInputs', async () => {})
      it('works with multiple inputs, multipleInputs', async () => {})
      it('actually accepts the inputs', async () => {})
    })
  })
})
