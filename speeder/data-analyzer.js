const {
  min,
  max,
  mean,
  median,
  variance,
  standardDeviation,
} = require('simple-statistics')

function analyzeData(rawData, options) {
  if (rawData.length === 0) {
    throw new Error("Couldn't collect any data points for analysis")
  }
  if (options.raw) {
    return rawData
  }
  const finalAnalysis = {
    min: min(rawData),
    max: max(rawData),
    mean: mean(rawData),
    median: median(rawData),
    variance: variance(rawData),
    std: standardDeviation(rawData),
    counts: rawData.length,
  }

  return finalAnalysis
}

module.exports = { analyzeData }
