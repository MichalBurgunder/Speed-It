async function asyncThrow() {
  throw new Error()
}
async function syncFuncReturn() {
  return asyncThrow()
}
async function asyncFuncReturnAwait() {
  return await asyncThrow()
}
async function asyncFuncAwait() {
  await asyncThrow()
}

module.exports = {
  returnAwait: {
    dataset: 'Return Await',
    function: asyncFuncReturnAwait,
  },
  simpleReturn: { name: 'Simple Return', function: syncFuncReturn },
  simpleAwait: { name: 'Simple Await', function: asyncFuncAwait },
}
