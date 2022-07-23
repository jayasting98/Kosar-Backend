/**
 * Error for when a function receives an invalid argument.
 */
class InvalidArgumentError extends Error {
  /**
   * @param {...any} args Arguments for Error.
   */
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidArgumentError);
    }
    this.name = 'InvalidArgumentError';
  }
}

/**
 * Error for when an unknown case is encountered.
 * This is usually used with unknown enum values.
 */
class UnknownCaseError extends Error {
  /**
   * @param {...any} args Arguments for Error.
   */
  constructor(...args) {
    super(...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownCaseError);
    }
    this.name = 'UnknownCaseError';
  }
}

module.exports = {
  InvalidArgumentError,
  UnknownCaseError,
};
