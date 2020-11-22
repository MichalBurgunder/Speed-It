const { COUNTS } = require('./globals')

function normalizeOptions(theFunctions, options) {
  const functions =
    theFunctions instanceof Array ? theFunctions : [theFunctions]
  const finalOptions = options ? options : {}
  // Let's name our function to ease display

  // Option: counts
  if (!finalOptions.counts) {
    finalOptions.counts = COUNTS
  }
  // Options: raw
  finalOptions.raw = finalOptions.raw ? finalOptions.raw : false

  // Option: names
  let names
  if (finalOptions.names) {
    if (finalOptions.names instanceof Array) {
      names = finalOptions.names
    } else if (typeof finalOptions.names !== typeof '') {
      throw new Error('Function name must be a string')
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
  } else if (finalOptions.errors === true) {
    for (let i = 0; i < functions.length; i++) {
      errors.push(true)
    }
  } else if (
    finalOptions.errors &&
    finalOptions.errors.length !== functions.length
  ) {
    throw new Error(
      'Inputted errors array is not the same length as the function array'
    )
  }

  finalOptions.errors = errors

  // Option: errorOutAfter
  if (!finalOptions.errorOutAfter) {
    // we default to 0
    finalOptions.errorOutAfter = functions.map(() => 1)
  } else {
    if (
      finalOptions.errorOutAfter.length !== functions.length &&
      functions.length !== 1
    ) {
      throw new Error(
        "You don't have enough errorOutAfter inputs (must be same length as inputted functions)"
      )
    }
    if (typeof finalOptions.errorOutAfter === typeof 99) {
      finalOptions.errorOutAfter = [finalOptions.errorOutAfter]
    }
    finalOptions.errorOutAfter.forEach((num) => {
      if (typeof num !== typeof 8) {
        throw new Error(
          'The inputted errorOutArray contains an element that is ont a number'
        )
      }
    })
  }
  // Option: inputs && multipleInputs
  // let's normalize the inputs

  let inputs = []
  if (finalOptions.inputs) {
    // lets normalize number of inputs
    let multipleInputs
    if (finalOptions.multipleInputs) {
      // validate type
      if (typeof finalOptions.multipleInputs === typeof true) {
        if (functions.length !== 1) {
          throw new Error(
            'You need to input an array of elements for multiple inputs'
          )
        } else if (
          !(finalOptions.inputs instanceof Array) ||
          finalOptions.inputs.length < 2
        ) {
          throw new Error(
            'You set multipleInputs to true, but your input does not have more than one element'
          )
        } else if (
          finalOptions.multipleInputs.filter(
            (mInput) => typeof nInput !== typeof true
          ).length !== 0
        ) {
          throw new Error('No all of your multiple inputs are boolean')
        } else {
          // we set the inputs and multipleInputs to arrays
          finalOptions.multipleInputs = [finalOptions.multipleInputs]
        }
      } else if (!(finalOptions.multipleInputs instanceof Array)) {
        throw new Error(
          'Multiple inputs must accept either a boolean, or an array of booleans'
        )
      } else {
        // it's an array, let's check contents
        finalOptions.multipleInputs.forEach((mInput) => {
          if (typeof mInput !== typeof true) {
            throw new Error('Elements in multiple inputs must be boolean')
          }
        })
      }

      // validate length
      if (finalOptions.multipleInputs.length !== functions.length) {
        throw new Error("You don't the right number of multipleInputs")
      }
      multipleInputs = finalOptions.multipleInputs
    } else {
      // default is 1 input
      multipleInputs = functions.map(() => true)
    }

    // now we finally push the final inputs
    for (let i = 0; i < multipleInputs.length; i++) {
      if (multipleInputs[i] > 1) {
        inputs.push(finalOptions.inputs[i])
      } else {
        inputs.push([finalOptions.inputs[i]])
      }
    }
  } else {
    inputs = functions.map(() => [])
  }

  return { functions, names, errors, inputs, options: finalOptions }
}

module.exports = { normalizeOptions }
