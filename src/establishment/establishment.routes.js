const express = require('express');
const router = express.Router();

const controller = require('./establishment.controller');
const jwtVerify = require('../middlewares/jwt-verify');

router.post('/', controller.createEstablishment);
router.delete('/:establishmentId', controller.deleteEstablishment);

router.get('/', jwtVerify, controller.getEstablishments);
router.get('/me', jwtVerify, controller.getMyInfo);
router.get('/myproducts', jwtVerify, controller.getMyProducts);
router.get('/myorders', jwtVerify, controller.getMyOrders);
router.get('/:establishmentId', jwtVerify, controller.getEstablishment);
router.get(
  '/:establishmentId/products',
  jwtVerify,
  controller.getEstablishmentProducts
);
router.get(
  '/:establishmentId/orders',
  jwtVerify,
  controller.getEstablishmentOrders
);

module.exports = router;
