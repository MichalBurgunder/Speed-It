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
