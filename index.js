const {
  performanceChecker,
} = require('./performance-checker/performance-checker')
const { returnAwait } = require('./functions/functions')

function la() {
  return 0
}
const main = async () => {
  const theAnalysis = await performanceChecker(returnAwait.function, {
    names: returnAwait.dataset,
    expectError: true,
  })
  console.log(theAnalysis)
}

main()
