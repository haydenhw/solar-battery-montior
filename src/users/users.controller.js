const User = require('./users.model');
const {
  sendServerError,
  sendConflictResponse,
  sendCreatedResponse
} = require('../core/responses');
const { encrypt } = require('../core/password_encrypter');
const MONGOOSE_ERRORS = require('../core/mongoose_errors.enum');

exports.signUp = async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    const hashedPassword = await encrypt(password);
    const newUser = new User();
    newUser.name = name;
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.email = email;
    const user = await newUser.save();
    sendCreatedResponse(res, user);
  } catch (e) {
    e.code && e.code === MONGOOSE_ERRORS.DUPLICATE_KEY
      ? sendConflictResponse(res, `Username ${username} already exists`)
      : sendServerError(res, e);
  }
};
