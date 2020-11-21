const ss = require('simple-statistics')

function analyzeData(rawData, options) {
  const finalAnalysis = {
    min: [],
    max: [],
    mean: [],
    median: [],
    variance: [],

    std: [],
    dataPoints: rawData.length,
  }

  finalAnalysis.min.push(ss.min(rawData))
  finalAnalysis.max.push(ss.max(rawData))
  finalAnalysis.mean.push(ss.mean(rawData))
  finalAnalysis.median.push(ss.median(rawData))
  finalAnalysis.variance.push(ss.variance(rawData))
  finalAnalysis.std.push(ss.standardDeviation(rawData))

  return finalAnalysis
}

module.exports = { analyzeData }
