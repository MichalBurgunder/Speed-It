const ss = require('simple-statistics')

function analyzeData(rawData) {
    const data = rawData.map((raw) => raw.data)

    const finalAnalysis = {
        datasets: rawData.map((raw) => raw.dataset),
        min: [],
        max: [],
        mean: [],
        median: [],
        variance: [],
        std: [],
    }

    for (let i = 0; i < data.length; i++) {
        finalAnalysis.min.push(ss.min(data[i]))
        finalAnalysis.max.push(ss.max(data[i]))
        finalAnalysis.mean.push(ss.mean(data[i]))
        finalAnalysis.median.push(ss.median(data[i]))
        finalAnalysis.variance.push(ss.variance(data[i]))
        finalAnalysis.std.push(ss.standardDeviation(data[i]))
    }
    return finalAnalysis
}

module.exports = { analyzeData }
