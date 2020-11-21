const { COUNTS, ERROR_OUT_AT } = require('./globals')

function errorHandlingProcess(countsOfError, options, pos, i) {
  if (options.errors[pos]) {
    return true
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
