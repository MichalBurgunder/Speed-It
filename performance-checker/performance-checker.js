const { collectData } = require('./data-collector')
const { analyzeData } = require('./data-analyzer')
/**
 *
 * @param {*} theFunctions
 * @param {*} options
 *  {
 *  names: {Array} an array of names, parallel to the functions, in order to prettify graph display
 * }
 */
async function performanceChecker(theFunctions, options) {
  const finalFunctions =
    theFunctions instanceof Array ? theFunctions : [theFunctions]
  let finalNames
  if (options && options.names) {
    if (options.names instanceof Array) {
      finalNames = options.names
    } else {
      // singular name
      finalNames = [options.names]
    }
  } else {
    // no options; lets call functions by numbers for now
    finalNames = []
    for (let i = 0; i < theFunctions.length; i++) {
      finalNames.push(i)
    }
  }
  const finalOptions = { names: finalNames }
  const rawData = []
  for (let i = 0; i < finalFunctions.length; i++) {
    const functionRawData = await collectData(finalFunctions[i])
    rawData.push(functionRawData)
  }
  const analyzedData = []
  for (let i = 0; i < rawData.length; i++) {
    const analysis = await analyzeData(rawData[i], finalNames[i])
    analyzedData.push(analysis)
  }
  return analyzedData
}

module.exports = { performanceChecker }
