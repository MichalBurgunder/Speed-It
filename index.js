const {
    checkPerformance,
} = require('./performance-checker/performance-checker')
const { returnAwait } = require('./functions/functions')

const main = async () => {
    const theAnalysis = await checkPerformance(returnAwait)
    console.log(theAnalysis)
}

main()
