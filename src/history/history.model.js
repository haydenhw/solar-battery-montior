const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  batteryId: String,
  voltage: Number
}, { timestamps: { createdAt: true }});

module.exports = mongoose.model('History', historySchema, 'History');
