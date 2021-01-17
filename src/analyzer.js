const {
  min,
  max,
  mean,
  median,
  variance,
  standardDeviation,
} = require('simple-statistics');

function roundResults(results, options, pos) {
  if (typeof results === typeof 7) {
    // round right away
    return results.toPrecision(options.round[pos]);
  } else {
    const keys = Object.keys(results);
    for (let key = 0; key < keys.length; key++) {
      // round each parameter
      results[key] = results[key].toPrecision(options.round[pos]);
    }
    return results;
  }
}
function analyzeData(rawData, options, pos) {
  if (options.raw) {
    return rawData;
  }
  if (rawData.length === 0) {
    throw new Error('No data received for analysis');
  }
  let finalAnalysis = null;
  if (!options.verbose) {
    finalAnalysis = mean(rawData);
  } else {
    finalAnalysis = {
      min: min(rawData),
      max: max(rawData),
      mean: mean(rawData),
      median: median(rawData),
      variance: variance(rawData),
      std: standardDeviation(rawData),
      counts: rawData.length,
    };
  }

  if (options.round) {
    return roundResults(finalAnalysis, options, pos);
  }
  return finalAnalysis;
}

module.exports = { analyzeData };
