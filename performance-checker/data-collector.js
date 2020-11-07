const { COUNTS, ERROR_OUT_AT } = require('../globals')
const { performance } = require('perf_hooks')

async function collectData(theFunction) {
  let rawData = []
  let countsOfError = 0
  // we measure this function as an async function

  for (let i = 0; i < COUNTS; i++) {
    try {
      let beforeAwait
      let afterAwait
      if (theFunction[Symbol.toStringTag] === 'AsyncFunction') {
        // we run it asynchronously
        beforeAwait = performance.now()
        await theFunction()
        afterAwait = performance.now()
      } else {
        // we run it synchronously
        beforeAwait = performance.now()
        theFunction()
        afterAwait = performance.now()
      }

      rawData.push(afterAwait - beforeAwait)
    } catch (error) {
      countsOfError += 1
      // we're not sure what happened, so let's omit this entry
      if (ERROR_OUT_AT < countsOfError) {
        throw new Error(
          `Cannot analyze data: Too many errors. Error:\n${error}`
        )
      }
      i -= 1
    }
  }
  return rawData
}

module.exports = { collectData }
