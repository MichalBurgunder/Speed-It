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
  simpleReturn: { dataset: 'Simple Return', function: syncFuncReturn },
  simpleAwait: { dataset: 'Simple Await', function: asyncFuncAwait },
}
