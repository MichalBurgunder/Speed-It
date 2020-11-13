const { collectData } = require('./data-collector')
const { analyzeData } = require('./data-analyzer')
const { normalizeOptions } = require('./option-normalizer')
/**
 *
 * @param {[Function] | Function} theFunctions
 * Either an array of functions, or a single function
 * @param {Object} options
 *  {
 *  names: {[String] | String} an array of names, parallel to the functions, in order to prettify graph display. If not given, will name the functions in a standard way
 * errors: [Boolean] | String whether we are expecting an error to be received by the function (default false)
 * inputs: [Array] An array of inputs
 * numberInputs: [Number] The number of inputs for each function
 * constInput: {Boolean} // TODO
 * verbose: {Boolean} gives back all analyzed data (default false)
 * }
 */
async function performanceChecker(theFunctions, options) {
  // we are going to arrayify our inputs, so that we can simply loop through them, regarless wehther we get a single function, or an array of them
  const batch = normalizeOptions(theFunctions, options)

  const rawData = []
  for (let i = 0; i < batch.functions.length; i++) {
    const functionRawData = await collectData(batch.functions[i], batch, i)
    rawData.push(functionRawData)
  }
  const analyzedData = []
  for (let i = 0; i < rawData.length; i++) {
    const analysis = await analyzeData(rawData[i], batch.names[i])
    analyzedData.push(analysis)
    analyzedData[i].name = batch.names[i]
    if (options.verbose) {
      delete analyzedData[i].rawData
    }
  }
  return analyzedData
}

module.exports = { performanceChecker }
