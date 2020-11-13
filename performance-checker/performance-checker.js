const { collectData } = require('./data-collector')
const { analyzeData } = require('./data-analyzer')

function normalizeOptions(theFunctions, options) {
  const finalFunctions =
    theFunctions instanceof Array ? theFunctions : [theFunctions]

  // Let's name our function to ease display
  let finalNames
  if (options && options.names) {
    if (options.names instanceof Array) {
      finalNames = options.names
    } else {
      // singular name for singular function
      finalNames = [options.names]
    }
  } else {
    // though an option, we are going to name our function by default
    finalNames = []
    for (let i = 0; i < finalFunctions.length; i++) {
      finalNames.push(`Function ${i + 1}`)
    }
  }
  let finalExpectError = []
  if (!options || !options.expectError) {
    for (let i = 0; i < finalFunctions.length; i++) {
      finalExpectError.push(false)
    }
  } else if (
    options &&
    typeof options.expectError === typeof true &&
    finalFunctions.length === 1
  ) {
    finalExpectError = [options.expectError]
  } else if (options && options.expectError.length !== finalFunctions.length) {
    throw new Error(
      'expectError array is not the same length as the function array'
    )
  }

  return { finalFunctions, finalNames, finalExpectError }
}
/**
 *
 * @param {[Function] | Function} theFunctions
 * Either an array of functions, or a single function
 * @param {*} options
 *  {
 *  names: {[String] | String} an array of names, parallel to the functions, in order to prettify graph display. If not given, will name the functions in a standard way
 * expectError: [Boolean] | String whether we are expecting an error to be received by the function
 * }
 */
async function performanceChecker(theFunctions, options) {
  // we are going to arrayify our inputs, so that we can simply loop through them, regarless wehther we get a single function, or an array of them
  const { finalFunctions, finalNames, finalExpectError } = normalizeOptions(
    theFunctions,
    options
  )

  const rawData = []
  for (let i = 0; i < finalFunctions.length; i++) {
    const functionRawData = await collectData(
      finalFunctions[i],
      finalExpectError[i]
    )
    rawData.push(functionRawData)
  }
  const analyzedData = []
  for (let i = 0; i < rawData.length; i++) {
    const analysis = await analyzeData(rawData[i], finalNames[i])
    analyzedData.push(analysis)
    analyzedData[i].dataSet = finalNames[i]
  }
  return analyzedData
}

module.exports = { performanceChecker }
