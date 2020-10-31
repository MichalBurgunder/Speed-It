const { analyzeData } = require('./data-handler')

async function checkPerformance(theFunction) {
    const rawData = await theFunction()
    const analyzedData = analyzeData(rawData)
    return analyzedData
}

module.exports = { checkPerformance }
