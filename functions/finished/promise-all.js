// Promise.all vs serial awaits

async function someFunction() {
  return 0
}
async function serialAwait() {
  await someFunction()
}

async function promiseDotAllAwait() {
  await Promise.all([someFunction()])
}

module.exports = {
  serialAwait: { name: 'Serial Await', function: serialAwait },
  promiseDotAllAwait: { name: 'Promise.All', function: promiseDotAllAwait },
}
