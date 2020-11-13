const {
  performanceChecker,
} = require('./performance-checker/performance-checker')
const { pushAssignment, directAssignment } = require('./functions/functions')

const main = async () => {
  const theAnalysis = await performanceChecker(
    [pushAssignment.function, directAssignment.function],
    {
      inputs: [[], []],
      names: [pushAssignment.name, directAssignment.name],
    }
  )
  console.log(theAnalysis)
}

main()
