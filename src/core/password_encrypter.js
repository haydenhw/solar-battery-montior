const bcrypt = require('bcrypt');

exports.encrypt = async password => {
  return await bcrypt.hash(password, 10);
};

exports.decrypt = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
