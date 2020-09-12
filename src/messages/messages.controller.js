const {
  sendServerError,
  sendCreatedResponse,
  sendBadRequestResponse,
  sendNotFoundResponse,
  sendOkResponse
} = require('../core/responses');
const HistoryModel = require('../history/history.model')

exports.checkForThesholdBreaches = (req, res, next) => {
  console.log('Checking for breaches')
  next()
}

exports.saveMessage = async (req, res) => {
  try {
    const datapoint = new HistoryModel(req.body)
    sendCreatedResponse(res, datapoint)
  } catch(e) {
    sendServerError(res, e)
  }

}




















