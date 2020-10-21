const moment = require('moment')
const HistoryModel = require('./history.model')
const { sendOkResponse } = require('../core/responses');

exports.getHistory = async (req, res) => {

  let graphData = {
    3: [],
    12: [],
    24: [],
  }

  const result = await HistoryModel
    .find({ createdAt: { $gte : new Date(Date.now() - 24 * 60 * 60 * 1000)}})


  result.forEach((element) => {
    const end = moment()
    const start = moment(element.createdAt)
    const hourDifference = Math.floor(moment.duration(end.diff(start)).asHours())

    // console.log(`HOUR DIFFERENCE: ${hourDifference}`)
    // console.log(`START: ${start._d}`)
    // console.log(`END: ${end._d}`)
    // console.log('================================================================')

    const graphElement = {
      y: element.voltage,
      t: moment(element).format("YYYY-MM-DD HH:0")
    }

    if (hourDifference <= 3) {
      graphData[3].push(graphElement)
    } else if (hourDifference <= 12) {
      graphData[12].push(graphElement)
    } else {
      graphData[24].push(graphElement)
    }
  })

  sendOkResponse(res, graphData)
}

exports.getLatest = async (req, res) => {
  const numResults = parseInt(req.params.numResults)
  const sensorData = await HistoryModel
    .find()
    .sort({ createdAt: -1 })
    .limit(numResults)
  sendOkResponse(res, sensorData)
}
