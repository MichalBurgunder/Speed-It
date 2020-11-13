// push vs direct assign

function pushAssignment(data, element) {
  data.push(element)
}

function directAssignment(data, element) {
  data[data.length] = element
}

module.exports = {
  pushAssignment: {
    name: 'Push Into Array',
    function: directAssignment,
  },
  directAssignment: { name: 'Direct Assignment', function: pushAssignment },
}
