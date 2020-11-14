const {
  performanceChecker,
} = require('./performance-checker/performance-checker')
const { addOneMap, addOneFor, addOneForEach } = require('./functions/functions')

const sampleData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const main = async () => {
  const theAnalysis = await performanceChecker(
    [addOneMap.function, addOneFor.function, addOneForEach.function],
    {
      names: [addOneMap.name, addOneFor.name, addOneForEach.name],
      inputs: [sampleData, sampleData, sampleData],
    }
  )
  console.log(theAnalysis)
}

main()
