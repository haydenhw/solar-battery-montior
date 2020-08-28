const express = require('express');
const router = express.Router();

const jwtVerify = require('../middlewares/jwt-verify');
const controller = require('./products.controller');

router.get('/', jwtVerify, controller.getProducts);
router.post('/', jwtVerify, controller.createProduct);
router.delete('/:id', jwtVerify, controller.deleteProduct);
router.get('/:id', jwtVerify, controller.getProduct);
module.exports = router;
