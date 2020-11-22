const { ERROR_OUT_AT } = require('./globals')

function errorHandlingProcess(countsOfError, options, pos, i) {
  if (options.errors[pos]) {
    return true
  } else {
    // we're not sure what happened, so let's omit this entry
    if (countsOfError > options.errorOutAfter[pos]) {
      throw new Error(`Cannot collect data: Too many errors. Error:\n${error}`)
    }
  }
}

module.exports = { errorHandlingProcess }
