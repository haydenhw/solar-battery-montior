const express = require('express');
const router = express.Router();

const controller = require('./tags.controller');
const jwtVerify = require('../middlewares/jwt-verify');

router.get('/', jwtVerify, controller.getTags);
router.post('/', jwtVerify, controller.createTag);
router.delete('/:id', jwtVerify, controller.deleteTag);

module.exports = router;
