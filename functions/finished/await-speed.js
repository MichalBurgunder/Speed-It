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
  simpleSyncReturn: { dataset: 'Sync Simple Return', function: syncReturn },
  simpleAsyncReturn: { dataset: 'Async Simple Return', function: asyncReturn },
}
