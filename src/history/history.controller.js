const HistoryModel = require('./history.model')
const { sendOkResponse } = require('../core/responses');

exports.getLatest = async (req, res) => {
  const numResults = parseInt(req.params.numResults)
  const sensorData = await HistoryModel
    .find()
    .sort({ createdAt: -1 })
    .limit(numResults)
  sendOkResponse(res, sensorData)
}
