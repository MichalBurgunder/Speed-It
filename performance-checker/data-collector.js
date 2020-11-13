const { COUNTS, ERROR_OUT_AT } = require('../globals')
const { performance } = require('perf_hooks')
const { errorHandlingProcess } = require('./error-handling')

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
        if (options.inputs && options.inputs[pos]) {
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
      afterAwait = performance.now() // in case we expected the error
      errorHandlingProcess(error, rawData, countsOfError, options, i)
    }
  }
  return rawData
}

module.exports = { collectData }
