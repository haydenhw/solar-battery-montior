const {
  sendServerError,
  sendCreatedResponse,
} = require('../core/responses');
const HistoryModel = require('../history/history.model')

exports.checkForThesholdBreaches = (req, res, next) => {
  next()
}

exports.saveMessage = async (req, res) => {
  try {
    const datapoint = new HistoryModel(req.body)
    await datapoint.save()
    console.log('Successfully saved datapoint:', datapoint)
    sendCreatedResponse(res, datapoint)
  } catch(e) {
    sendServerError(res, e)
  }
}




















