const express = require('express');
const router = express.Router();
const controller = require('./messages.controller')

router.post('/', controller.checkForThesholdBreaches, controller.saveMessage)

module.exports = router
