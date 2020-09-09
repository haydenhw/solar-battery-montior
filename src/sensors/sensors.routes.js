const express = require('express');
const router = express.Router();
const controller = require('./sensors.controller')

router.post('/', controller.processSensorReading)

module.exports = router
