const { speeder } = require('./speeder/performance-checker')

// const speeder = async () => {
//   const theAnalysis = await performanceChecker(
//     [addOneMap.function, addOneFor.function, addOneForEach.function],
//     {
//       names: [addOneMap.name, addOneFor.name, addOneForEach.name],
//       inputs: [sampleData, sampleData, sampleData],
//     }
//   )
// }

module.exports = speeder
