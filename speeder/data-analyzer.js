const ss = require('simple-statistics')

function analyzeData(rawData, options) {
  if (rawData.length === 0) {
    throw new Error("Couldn't collect any data points for analysis")
  }
  const finalAnalysis = {
    min: ss.min(rawData),
    max: ss.max(rawData),
    mean: ss.mean(rawData),
    median: ss.median(rawData),
    variance: ss.variance(rawData),
    std: ss.standardDeviation(rawData),
    counts: rawData.length,
  }

  if (options.raw) {
    finalAnalysis.raw = rawData
  }

  return finalAnalysis
}

module.exports = { analyzeData }
