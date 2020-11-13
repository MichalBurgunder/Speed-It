const { COUNTS, ERROR_OUT_AT } = require('../globals')

function errorHandlingProcess(error, rawData, countsOfError, options, i) {
  if (options.errors && options.errors[pos]) {
    rawData.push(afterAwait - beforeAwait)
  } else {
    countsOfError += 1
    // we're not sure what happened, so let's omit this entry
    if (ERROR_OUT_AT < countsOfError) {
      throw new Error(`Cannot collect data: Too many errors. Error:\n${error}`)
    }
    i -= 1
  }
}

module.exports = { errorHandlingProcess }
