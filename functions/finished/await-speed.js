// await efficiency?
const { performance } = require('perf_hooks')
const { COUNTS } = require('../../globals')

async function asyncReturn() {
  return 'returned!'
}
function syncReturn() {
  return 'returned!'
}

module.exports = {
  simpleSyncReturn: { name: 'Sync Simple Return', function: syncReturn },
  simpleAsyncReturn: { name: 'Async Simple Return', function: asyncReturn },
}
