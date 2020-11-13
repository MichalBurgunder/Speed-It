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

  // Options: expectError
  let expectError = []
  if (!options || !options.expectError) {
    for (let i = 0; i < functions.length; i++) {
      expectError.push(false)
    }
  } else if (
    options &&
    typeof options.expectError === typeof true &&
    functions.length === 1
  ) {
    expectError = [options.expectError]
  } else if (options && options.expectError.length !== functions.length) {
    throw new Error(
      'expectError array is not the same length as the function array'
    )
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

  return { functions, names, expectError, inputs }
}

module.exports = { normalizeOptions }
