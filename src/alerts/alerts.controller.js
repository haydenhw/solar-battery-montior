const AlertsModel = require('./alerts.model')
const { sendServerError } = require('../core/responses');
const {
  sendCreatedResponse,
  sendBadRequestResponse,
  sendNotFoundResponse,
  sendOkResponse
} = require('../core/responses');

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await AlertsModel.find({})
    sendOkResponse(res, alerts)
  } catch (e) {
    sendServerError(res, e);
  }
}

exports.createAlert = async (req, res) => {
  const alert = new AlertsModel(req.body)

  try {
    await alert.save()
    sendCreatedResponse(res, alert)
  } catch(e) {
     sendServerError(e)
  }
}

exports.updateAlert = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "threshold", "triggersBelowThreshold", "sensitivityDuration", "usesEmailNotification", "usesSMSNotification", "usesDesktopNotification"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return sendBadRequestResponse(res, 'Invalid updates supplied in request body')
  }

  try {
    const alert = await AlertsModel.findOne({ _id: req.params.id })

    if (!alert) {
      return sendNotFoundResponse(res, `No alert with id:${req.params.id} found`)
    }

    updates.forEach((update) => alert[update] = req.body[update])
    await alert.save()
    sendOkResponse(res, alert)
  } catch(e) {
    sendServerError(res, e)
  }
}











