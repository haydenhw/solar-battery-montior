const crypto = require('crypto');

exports.generateRandomHash = () => {
  const date = new Date().toISOString();
  const hash = crypto
    .createHash('sha1')
    .update(date, 'utf8')
    .digest('hex');
  return hash;
};
