const express = require('express');
const router = express.Router();
const controller = require('./alerts.controller');

router.get('/', controller.getAllAlerts)
router.post('/', controller.createAlert)
router.patch('/:id', controller.updateAlert)
router.delete('/:id', controller.deleteAlert)

module.exports = router;
