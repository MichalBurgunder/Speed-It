const { COUNTS, ERROR_OUT_AT } = require('../globals')
const { performance } = require('perf_hooks')

async function collectData(theFunction, options, pos) {
  let rawData = []
  let countsOfError = 0
  // we measure this function as an async function

  for (let i = 0; i < COUNTS; i++) {
    let beforeAwait
    let afterAwait
    try {
      if (theFunction[Symbol.toStringTag] === 'AsyncFunction') {
        // we run it asynchronously
        if (options.inputs[pos]) {
          beforeAwait = performance.now()
          await theFunction(options.inputs[pos])
          afterAwait = performance.now()
        } else {
          beforeAwait = performance.now()
          await theFunction()
          afterAwait = performance.now()
        }
      } else {
        // we run it synchronously
        if (options.inputs && options.inputs[pos]) {
          beforeAwait = performance.now()

          theFunction(options.inputs[pos])
          afterAwait = performance.now()
        } else {
          beforeAwait = performance.now()
          theFunction()
          afterAwait = performance.now()
        }
      }

      rawData.push(afterAwait - beforeAwait)
    } catch (error) {
      afterAwait = performance.now() // incase we expected the error
      if (options.errors && options.errors[pos]) {
        rawData.push(afterAwait - beforeAwait)
      } else {
        countsOfError += 1
        // we're not sure what happened, so let's omit this entry
        if (ERROR_OUT_AT < countsOfError) {
          throw new Error(
            `Cannot collect data: Too many errors. Error:\n${error}`
          )
        }
        i -= 1
      }
    }
  }
  return rawData
}

module.exports = { collectData }
