const express = require('express');
const router = express.Router();

const controller = require('./alerts.controller');

router.get('/', controller.getAllAlerts)
router.post('/', controller.createAlert);
router.patch('/:id', controller.updateAlert);
// router.get('/', jwtVerify, controller.getProducts);
// router.delete('/:id', jwtVerify, controller.deleteProduct);
// router.get('/:id', jwtVerify, controller.getProduct);
module.exports = router;
