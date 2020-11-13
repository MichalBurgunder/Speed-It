function normalizeOptions(theFunctions, options) {
  const functions =
    theFunctions instanceof Array ? theFunctions : [theFunctions]

  // Let's name our function to ease display
  // Option: names
  let names
  if (options && options.names) {
    if (options.names instanceof Array) {
      names = options.names
    } else {
      // singular name for singular function
      names = [options.names]
    }
  } else {
    // though an option, we are going to name our function by default
    names = []
    for (let i = 0; i < functions.length; i++) {
      names.push(`Function ${i + 1}`)
    }
  }

  // Options: errors
  let errors = []
  if (!options || !options.errors) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(false)
    }
  } else if (
    options &&
    typeof options.errors === typeof true &&
    functions.length === 1
  ) {
    errors = [options.errors]
  } else if (options && options.errors.length !== functions.length) {
    throw new Error('errors array is not the same length as the function array')
  }

  // Option: inputs
  // let's normalize the inputs
  let inputs
  if (options.inputs) {
    if (options.inputs.length !== functions.length) {
      throw new Error("You don't the right number of inputs")
    }
    inputs = options.inputs
  } else {
    inputs = null
  }

  return { functions, names, errors, inputs }
}

module.exports = { normalizeOptions }
