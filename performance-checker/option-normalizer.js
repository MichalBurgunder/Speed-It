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

  // Option: inputs && numberInputs
  // let's normalize the inputs

  let inputs = []
  if (options.inputs) {
    if (options.inputs.length !== functions.length) {
      throw new Error("You don't the right number of inputs")
    } else {
      // lets normalize number of inputs!
      let numberInputs
      if (options.numberInputs) {
        // validate type
        options.numberInputs.forEach((num) => {
          if (!Number.isInteger(num)) {
            throw new Error('Number given in number inputs is not an integer')
          }
        })
        // validate length
        if (options.numberInputs.length !== functions.length) {
          throw new Error("You don't the right number of numberInputs")
        }
        numberInputs = options.numberInputs
      } else {
        // default is 1 input
        numberInputs = functions.map(() => 1)
      }
      // now we finally push the final inputs
      for (let i = 0; i < numberInputs.length; i++) {
        if (numberInputs[i] > 1) {
          inputs.push(inputs[i])
        } else {
          inputs.push([inputs[i]])
        }
      }
    }
  } else {
    inputs = functions.map(() => [])
  }

  return { functions, names, errors, inputs }
}

module.exports = { normalizeOptions }
