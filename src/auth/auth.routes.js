const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('./auth.controller');

router.post('/login/user', controller.login);
router.post('/login/establishment', controller.loginEstablishment);
router.get(
  '/validation/establishment/:hash',
  controller.establishmentValidation
);
router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook'),
  controller.facebookRedirect
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/redirect',
  passport.authenticate('google'),
  controller.googleRedirect
);
module.exports = router;
