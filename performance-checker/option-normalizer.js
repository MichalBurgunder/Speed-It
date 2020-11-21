function normalizeOptions(theFunctions, options) {
  const functions =
    theFunctions instanceof Array ? theFunctions : [theFunctions]
  const finalOptions = options ? options : {}
  // Let's name our function to ease display

  // Options: raw
  finalOptions.raw = finalOptions.raw ? finalOptions.raw : false

  // Option: names
  let names
  if (finalOptions.names) {
    if (finalOptions.names instanceof Array) {
      names = finalOptions.names
    } else {
      // singular name for singular function
      names = [finalOptions.names]
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
  if (!finalOptions.errors) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(false)
    }
  } else if (typeof finalOptions.errors === typeof true) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(true)
    }
  }
  if (finalOptions.errors.length !== functions.length) {
    throw new Error('errors array is not the same length as the function array')
  }

  // Option: inputs && multipleInputs
  // let's normalize the inputs

  let inputs = []
  if (finalOptions.inputs) {
    if (finalOptions.inputs.length !== functions.length) {
      throw new Error("You don't the right number of inputs")
    } else {
      // lets normalize number of inputs
      let multipleInputs
      if (finalOptions.multipleInputs) {
        // validate type
        finalOptions.multipleInputs.forEach((num) => {
          if (!Number.isInteger(num)) {
            throw new Error('Number given in number inputs is not an integer')
          }
        })
        // validate length
        if (finalOptions.multipleInputs.length !== functions.length) {
          throw new Error("You don't the right number of multipleInputs")
        }
        multipleInputs = finalOptions.multipleInputs
      } else {
        // default is 1 input
        multipleInputs = functions.map(() => 1)
      }
      // now we finally push the final inputs
      for (let i = 0; i < multipleInputs.length; i++) {
        if (multipleInputs[i] > 1) {
          inputs.push(finalOptions.inputs[i])
        } else {
          inputs.push([finalOptions.inputs[i]])
        }
      }
    }
  } else {
    inputs = functions.map(() => [])
  }

  return { functions, names, errors, inputs, options: finalOptions }
}

module.exports = { normalizeOptions }
