// await efficiency?
const { performance } = require('perf_hooks')
const { COUNTS } = require('../globals')

async function asyncReturn() {
    return 'returned!'
}
function syncReturn() {
    return 'returned!'
}

async function asyncLoopPerformance() {
    const asyncReturnData = []
    for (let i = 0; i < COUNTS; i++) {
        const beforeAsync = performance.now()
        await asyncReturn()
        const afterAsync = performance.now()
        asyncReturnData.push(afterAsync - beforeAsync)
    }
    return asyncReturnData
}

function syncLoopPerformance() {
    const theArr = []

    const syncReturnData = []
    for (let i = 0; i < COUNTS; i++) {
        const beforeAsync = performance.now()
        syncReturn()
        const afterAsync = performance.now()
        syncReturnData.push(afterAsync - beforeAsync)
    }

    return syncReturnData
}

async function awaitSpeed() {
    const syncLoopData = syncLoopPerformance()

    const asyncLoopData = await asyncLoopPerformance()

    return [
        { dataset: 'Sync Loop', data: syncLoopData },
        { dataset: 'Async Loop', data: asyncLoopData },
    ]
}

module.exports = { awaitSpeed }
