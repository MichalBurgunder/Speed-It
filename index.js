const {
  performanceChecker,
} = require('./performance-checker/performance-checker')
const { serialAwait, promiseDotAllAwait } = require('./functions/functions')

const main = async () => {
  const theAnalysis = await performanceChecker(
    [serialAwait.function, promiseDotAllAwait.function],
    {
      names: [serialAwait.name, promiseDotAllAwait.name],
      inputs: [1, 2],
    }
  )
  console.log(theAnalysis)
}

main()
