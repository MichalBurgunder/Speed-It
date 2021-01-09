const { COUNTS } = require('./globals');
const { performance } = require('perf_hooks');
const { errorHandlingProcess } = require('./error-handling');

async function collectData(theFunction, batch, pos) {
  let rawData = [];
  let countsOfError = 0;
  // we measure this function as an async function

  for (let i = 0; i < COUNTS; i++) {
    let beforeAwait;
    let afterAwait;
    const copiedInputs = [...batch.inputs[pos]];
    try {
      if (theFunction[Symbol.toStringTag] === 'AsyncFunction') {
        // we run it asynchronously
        beforeAwait = performance.now();
        await theFunction(...copiedInputs);
        afterAwait = performance.now();
      } else {
        // we run it synchronously
        beforeAwait = performance.now();
        theFunction(...copiedInputs);
        afterAwait = performance.now();
      }

      rawData.push(afterAwait - beforeAwait);
    } catch (error) {
      afterAwait = performance.now(); // in case we expected the error
      const handled = errorHandlingProcess(
        countsOfError,
        batch.options,
        pos,
        error
      );
      if (handled) {
        rawData.push(afterAwait - beforeAwait);
      }
      countsOfError = countsOfError + 1;
    }
  }
  return rawData;
}

module.exports = { collectData };
