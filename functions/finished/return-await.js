// await efficiency?
const { performance } = require('perf_hooks')
const { COUNTS } = require('../../globals')

async function asyncThrow() {
    throw new Error()
}
async function asyncFuncReturn() {
    return asyncThrow()
}
async function asyncFuncReturnAwait() {
    return await asyncThrow()
}
async function asyncFuncAwait() {
    await asyncThrow()
}
async function returnAwait() {
    const simpleReturn = []
    for (let i = 0; i < COUNTS; i++) {
        const beforeReturn = performance.now()
        try {
            await asyncFuncReturn()
        } catch (knownError) {
            const afterReturn = performance.now()
            simpleReturn.push(afterReturn - beforeReturn)
        }
    }

    const simpleAwait = []
    for (let i = 0; i < COUNTS; i++) {
        const beforeAwait = performance.now()
        try {
            await asyncFuncAwait()
        } catch (knownError) {
            const afterAwait = performance.now()
            simpleAwait.push(afterAwait - beforeAwait)
        }
    }

    const returnAwait = []
    for (let i = 0; i < COUNTS; i++) {
        const beforeReturnAwait = performance.now()
        try {
            await asyncFuncReturnAwait()
        } catch (knownError) {
            const afterReturnAwait = performance.now()
            returnAwait.push(afterReturnAwait - beforeReturnAwait)
        }
    }
    return [
        { dataset: 'Return Await', data: simpleReturn },
        { dataset: 'Await Async', data: simpleAwait },
        { dataset: 'Return Await Async', data: returnAwait },
    ]
}
module.exports = { returnAwait }
