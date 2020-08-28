const express = require('express');
const router = express.Router();

const controller = require('./users.controller');

router.post('/', controller.signUp);

module.exports = router;
