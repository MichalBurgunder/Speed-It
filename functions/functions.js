const {
  simpleAsyncReturn,
  simpleSyncReturn,
} = require('./finished/await-speed')
const {
  returnAwait,
  simpleReturn,
  simpleAwait,
} = require('./finished/return-await')
const { pushAssignment, directAssignment } = require('./finished/array-assign')
const { serialAwait, promiseDotAllAwait } = require('./finished/promise-all')

module.exports = {
  // async time length
  simpleAsyncReturn,
  simpleSyncReturn,

  // returning async operations
  returnAwait,
  simpleReturn,
  simpleAwait,

  // array assginment
  pushAssignment,
  directAssignment,

  // promise.all vs simple await
  serialAwait,
  promiseDotAllAwait,
}
