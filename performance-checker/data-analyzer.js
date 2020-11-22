const ss = require('simple-statistics')
const { normalizeOptions } = require('./option-normalizer')

function analyzeData(rawData, options) {
  if (rawData.length === 0) {
    console.log(options)
    throw new Error("Couldn't collect any data points for analysis")
  }
  const finalAnalysis = {
    min: ss.min(rawData),
    max: ss.max(rawData),
    mean: ss.mean(rawData),
    median: ss.median(rawData),
    variance: ss.variance(rawData),
    std: ss.standardDeviation(rawData),
    dataPoints: rawData.length,
  }

  if (options.raw) {
    finalAnalysis.rawData = rawData
  }

  return finalAnalysis
}

module.exports = { analyzeData }
