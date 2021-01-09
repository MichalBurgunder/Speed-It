const { COUNTS } = require('./globals');

function _normalizeCounts(finalOptions) {
  if (!finalOptions.counts) {
    finalOptions.counts = COUNTS;
  }
}

function _normalizeRaw(finalOptions) {
  finalOptions.raw = finalOptions.raw ? finalOptions.raw : false;
}
function _normalizeNames(finalOptions, functions) {
  if (finalOptions.names) {
    if (finalOptions.names instanceof Array) {
      return finalOptions.names;
    } else if (typeof finalOptions.names !== typeof '') {
      throw new Error('Function name must be a string');
    } else {
      // singular name for singular function
      return [finalOptions.names];
    }
  } else {
    // though an option, we are going to name our function by default
    const names = [];
    for (let i = 0; i < functions.length; i++) {
      names.push(`Function ${i + 1}`);
    }
    return names;
  }
}

function _normalizeErrors(finalOptions, functions) {
  let errors = [];

  if (!finalOptions.errors) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(false);
    }
  } else if (finalOptions.errors === true) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(true);
    }
  } else if (!(finalOptions.errors instanceof Array)) {
    throw new Error('Errors option is not an array');
  } else if (finalOptions.errors.length !== functions.length) {
    throw new Error(
      'Inputted errors array is not the same length as the function array'
    );
    // by now, everything should be in order
  } else {
    for (let i = 0; i < functions.length; i++) {
      errors.push(finalOptions.errors[i]);
    }
  }
  finalOptions.errors = errors;
  return errors;
}

function _normalizeErrorOutAfter(finalOptions, functions) {
  if (!finalOptions.errorOutAfter) {
    // we default to 0
    finalOptions.errorOutAfter = functions.map(() => 1);
  } else {
    if (
      finalOptions.errorOutAfter.length !== functions.length &&
      functions.length !== 1
    ) {
      throw new Error(
        "You don't have the correct number of errorOutAfter inputs (must be same length as inputted functions)"
      );
    }
    if (typeof finalOptions.errorOutAfter === typeof 99) {
      finalOptions.errorOutAfter = [finalOptions.errorOutAfter];
    }
    finalOptions.errorOutAfter.forEach((num) => {
      if (typeof num !== typeof 8) {
        throw new Error(
          'The inputted errorOutArray contains an element that is not a number'
        );
      }
      if (num % 1 !== 0) {
        throw new Error(
          'The inputted errorOutArray contains an element that is not an integer'
        );
      }
    });
  }
}

function _normalizeMultipleInputs(finalOptions, functions) {
  if (finalOptions.multipleInputs !== undefined) {
    // boolean
    if (typeof finalOptions.multipleInputs === typeof true) {
      // we set the inputs and multipleInputs to arrays
      finalOptions.multipleInputs = functions.map(
        () => finalOptions.multipleInputs
      );
    } else if (!(finalOptions.multipleInputs instanceof Array)) {
      throw new Error(
        'Multiple inputs must accept either a boolean, or an array of booleans'
      );
    } else if (finalOptions.multipleInputs.length !== functions.length) {
      throw new Error(
        "You've inputted the wrong amount of multiple input arguments"
      );
    } else {
      // it's an array, we're good. Let's check contents
      finalOptions.multipleInputs.forEach((mInput) => {
        if (typeof mInput !== typeof true) {
          throw new Error('Elements in multiple inputs must be boolean');
        }
      });
    }
  } else {
    finalOptions.multipleInputs = functions.map(() => false);
  }
}

function _normalizeInputs(finalOptions, functions) {
  let inputs = [];
  if (finalOptions.inputs !== undefined) {
    if (!(finalOptions.inputs instanceof Array)) {
      // check if functions length 1, else error
      if (functions.length === 1) {
        finalOptions.inputs = [finalOptions.inputs];
      } else {
        throw new Error(
          'For multiple functions, you need multiple inputs (pass an empty array if you want no inputs)'
        );
      }
    }
    if (finalOptions.inputs.length !== functions.length) {
      throw new Error("You don't the right number of multipleInputs");
    }
    // validation
    for (let i = 0; i < functions.length; i++) {
      if (
        finalOptions.multipleInputs[i] === true &&
        !(finalOptions.inputs[i] instanceof Array)
      ) {
        throw new Error(
          'You claim to be inputting multipleInputs, but you have only provided a single element'
        );
      }
    }

    for (let i = 0; i < functions.length; i++) {
      if (finalOptions.multipleInputs[i] === true) {
        inputs.push(finalOptions.inputs[i]);
      } else {
        inputs.push([finalOptions.inputs[i]]);
      }
    }
    finalOptions.inputs = inputs;
  } else {
    inputs = functions.map(() => []);
  }
  return inputs;
}
function normalizeOptions(theFunctions, options) {
  const functions =
    theFunctions instanceof Array ? theFunctions : [theFunctions];
  const finalOptions = options ? options : {};

  _normalizeCounts(finalOptions);
  _normalizeRaw(finalOptions);
  _normalizeNames(finalOptions, functions);

  const names = _normalizeNames(finalOptions, functions);
  const errors = _normalizeErrors(finalOptions, functions);
  finalOptions.errors = errors;

  _normalizeErrorOutAfter(finalOptions, functions);
  _normalizeMultipleInputs(finalOptions, functions);
  const inputs = _normalizeInputs(finalOptions, functions);

  return {
    functions,
    names,
    errors: finalOptions.errors,
    inputs,
    options: finalOptions,
  };
}

module.exports = { normalizeOptions };
