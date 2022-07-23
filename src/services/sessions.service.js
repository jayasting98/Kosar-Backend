const auth = require('../services/auth.service');
const usersService = require('./users.service');
const {InvalidArgumentError} = require('../utils/error.util');
const passwordUtil = require('../utils/password.util');

const INVALID_USERNAME_PASSWORD_ERROR_MESSAGE = 'Invalid username or password.';
const INVALID_EMAIL_ADDRESS_PASSWORD_ERROR_MESSAGE = 'Invalid email address ' +
    'or password.';

exports.createSessionForUsername = async (username, plaintextPassword) => {
  const user = await usersService.getUserWithUsername(username);
  const isMatching = await passwordUtil.isMatchingPassword(
      plaintextPassword,
      user.passwordHash,
  );
  if (!isMatching) {
    throw new InvalidArgumentError(INVALID_USERNAME_PASSWORD_ERROR_MESSAGE);
  }
  const authenticationToken = auth.generateAuthenticationToken(user.userId);
  return authenticationToken;
};

exports.createSessionForEmailAddress = async (
    emailAddress,
    plaintextPassword,
) => {
  const user = await usersService.getUserWithEmailAddress(emailAddress);
  const isMatching = await passwordUtil.isMatchingPassword(
      plaintextPassword,
      user.passwordHash,
  );
  if (!isMatching) {
    throw new InvalidArgumentError(
        INVALID_EMAIL_ADDRESS_PASSWORD_ERROR_MESSAGE,
    );
  }
  const authenticationToken = auth.generateAuthenticationToken(user.userId);
  return authenticationToken;
};
