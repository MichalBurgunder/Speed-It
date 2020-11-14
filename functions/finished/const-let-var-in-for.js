// const inside a function vs let
const { COUNTS } = require('../../globals')

function constInLoop(input) {
  for (let i = 0; i < COUNTS; i++) {
    const dataPoint = input
  }
}

function letInLoop(input) {
  for (let i = 0; i < COUNTS; i++) {
    let dataPoint = input
  }
}

function varInLoop(input) {
  for (let i = 0; i < COUNTS; i++) {
    var dataPoint = input
  }
}

module.exports = {
  constInLoop: { name: 'Const In For Loop', function: constInLoop },
  letInLoop: { name: 'Let In For Loop', function: letInLoop },
  varInLoop: { name: 'Var In For Loop', function: varInLoop },
}
