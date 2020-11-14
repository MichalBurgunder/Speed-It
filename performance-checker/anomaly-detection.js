const { IsolationForest } = require('isolation-forest')

function removeAnomalies(rawData, percentage) {
  const cleanedData = [...rawData]
  const forest = new IsolationForest(10)
  const arrayifiedData = cleanedData.map((point) => [point])
  forest.fit(arrayifiedData) // Type ObjectArray ({}[]);

  const scores = isolationForest.scores().sort().reverse()

  for (let i = scores.length; scores.length > 0; i--) {
    if (scores[i] > percentage) {
      cleanedData[i] = null
    }
  }
  return cleanedData.filter((point) => point !== null)
}

module.exports = { removeAnomalies }
