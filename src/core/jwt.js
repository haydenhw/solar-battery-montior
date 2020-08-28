const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'YOU_SHOULD_DEFINE_A_SECRET_KEY';

exports.generateJWTpayload = ({ id, name }) => {
  return {
    id,
    name
  };
};
exports.sign = async payload => {
  return await signPromise(payload);
};

exports.verify = token => {
  return jwt.verify(token, SECRET_KEY);
};

const signPromise = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256' }, function(err, token) {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
