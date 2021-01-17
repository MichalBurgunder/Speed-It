function errorHandlingProcess(countsOfError, options, pos, error) {
  if (options.errors[pos]) {
    return true;
  } else {
    // we're not sure what happened, so let's omit this entry
    if (countsOfError > options.errorOutAfter[pos]) {
      throw new Error(`Cannot collect data: Too many errors. Error: ${error}`);
    }
  }
}

module.exports = { errorHandlingProcess };
