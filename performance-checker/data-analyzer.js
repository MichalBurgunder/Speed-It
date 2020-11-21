const ss = require('simple-statistics')

function analyzeData(rawData, options) {
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
