const {
  performanceChecker,
} = require('./performance-checker/performance-checker')
const { constInLoop, letInLoop, varInLoop } = require('./functions/functions')

const main = async () => {
  const theAnalysis = await performanceChecker(
    [constInLoop.function, letInLoop.function, varInLoop.function],
    {
      names: [constInLoop.name, letInLoop.name, varInLoop.name],
    }
  )
  console.log(theAnalysis)
}

main()
