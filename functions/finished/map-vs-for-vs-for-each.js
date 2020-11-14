// map vs for vs forEach add 1
function addOneMap(input) {
  return input.map((point) => point++)
}

function addOneFor(input) {
  for (let i = 0; i < input.length; i++) {
    input[i]++
  }
  return input
}

function addOneForEach(input) {
  input.forEach((point) => point++)
  return input
}

module.exports = {
  addOneMap: { name: 'Add One Map', function: addOneMap },
  addOneFor: { name: 'Add One For', function: addOneFor },
  addOneForEach: { name: 'Add One For Each', function: addOneForEach },
}
