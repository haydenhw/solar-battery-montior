const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: [true, 'Alert name is required']},
  threshold: {type: Number, required: [true, 'Threshold is required']},
  triggersBelowThreshold: {type: Boolean, required: [true, 'Alert must be set to trigger either above or below threshold']},
  sensitivityDuration: {type: Number, required: [true, 'Sensitivity duration is required']},
  usesEmailNotification: Boolean,
  usesSMSNotification: Boolean,
  usesDesktopNotification: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema, 'Alert');

