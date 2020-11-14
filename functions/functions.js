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
const {
  constInLoop,
  letInLoop,
  varInLoop,
} = require('./finished/const-let-var-in-for')
const {
  addOneMap,
  addOneFor,
  addOneForEach,
} = require('./finished/map-vs-for-vs-for-each')
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

  // new variable in loop
  constInLoop,
  letInLoop,
  varInLoop,

  // add one for, map, forEach
  addOneMap,
  addOneFor,
  addOneForEach,
}
