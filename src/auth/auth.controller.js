const { decrypt } = require('../core/password_encrypter');
const User = require('../users/users.model');
const AccountValidation = require('./account_validation.model');
const Establishment = require('../establishment/establishment.model');
const { sign, generateJWTpayload } = require('../core/jwt');
const {
  sendUnauthorizedResponse,
  sendOkResponse
} = require('../core/responses');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user || !(await isValidPassword(password, user.password))) {
    sendUnauthorizedResponse(res);
    return;
  }
  const tokenPayload = generateJWTpayload({
    id: user._id,
    name: user.name
  });

  const access_token = await sign(tokenPayload);
  sendOkResponse(res, {
    access_token
  });
};

exports.loginEstablishment = async (req, res) => {
  const { username, password } = req.body;
  const establishment = await Establishment.findOne({ username: username });
  if (
    !establishment ||
    !(await isValidPassword(password, establishment.password))
  ) {
    sendUnauthorizedResponse(res);
    return;
  }
  const tokenPayload = generateJWTpayload({
    id: establishment._id,
    name: establishment.name
  });

  const access_token = await sign(tokenPayload);
  sendOkResponse(res, {
    access_token
  });
};

exports.establishmentValidation = async (req, res) => {
  const { hash } = req.params;
  const validation = await AccountValidation.findOne({
    hash,
    account_type: 'establishment'
  });
  if (!validation) {
    sendUnauthorizedResponse(res);
  }
  const establishment = await Establishment.findByIdAndUpdate(
    validation.userId,
    { validated: true }
  );
  validation.deleteOne();
  sendOkResponse(res, establishment);
};

exports.facebookRedirect = async (req, res) => {
  const tokenPayload = generateJWTpayload({
    id: req.user._id,
    name: req.user.name
  });
  const access_token = await sign(tokenPayload);

  sendOkResponse(res, {
    access_token
  });
};

exports.googleRedirect = async (req, res) => {
  const tokenPayload = generateJWTpayload({
    id: req.user._id,
    name: req.user.name
  });

  const access_token = await sign(tokenPayload);
  sendOkResponse(res, {
    access_token
  });
};

const isValidPassword = async (plainPassword, hashedPassword) => {
  return await decrypt(plainPassword, hashedPassword);
};
