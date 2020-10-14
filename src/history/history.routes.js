const express = require('express');
const router = express.Router();
const controller = require('./history.controller')

router.get('/latest/:numResults', controller.getLatest)

module.exports = router
