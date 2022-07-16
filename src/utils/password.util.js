const bcrypt = require('bcrypt');

const DEFAULT_NUM_SALT_ROUNDS = 10;

exports.generateSalt = async () => {
  const salt = await bcrypt.genSalt(DEFAULT_NUM_SALT_ROUNDS);
  return salt;
};

exports.generateHash = async (plaintextPassword, salt) => {
  const hash = await bcrypt.hash(plaintextPassword, salt);
  return hash;
};

exports.isMatchingPassword = async (plaintextPassword, passwordHash) => {
  const isMatching = await bcrypt.compare(plaintextPassword, passwordHash);
  return isMatching;
};
