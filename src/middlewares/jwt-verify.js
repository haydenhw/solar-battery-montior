const {
  sendForbiddenResponse,
  sendUnauthorizedResponse
} = require('../core/responses');
const { verify } = require('../core/jwt');

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') {
      sendForbiddenResponse(res);
      return;
    }
    const bearerToken = bearerHeader.split(' ')[1];
    req.user = verify(bearerToken);
    next();
  } catch (error) {
    sendUnauthorizedResponse(res);
    return;
  }
};
