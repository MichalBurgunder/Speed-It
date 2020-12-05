const {
  min,
  max,
  mean,
  median,
  variance,
  standardDeviation,
} = require('simple-statistics')

function analyzeData(rawData, options) {
  if (options.raw) {
    return rawData
  }
  if (rawData.length === 0) {
    throw new Error('No data received for analysis')
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
