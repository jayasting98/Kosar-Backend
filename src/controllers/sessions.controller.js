const sessionsService = require('../services/sessions.service');
const {InvalidArgumentError, UnknownCaseError} = require('../utils/error.util');

const Credentials = Object.freeze({
  USERNAME: 'username',
  EMAIL_ADDRESS: 'emailaddress',
});

const createAuthenticationTokenForCredentials = async (
    credentials,
    credentialsType,
) => {
  let authenticationToken;
  switch (credentialsType) {
    case Credentials.USERNAME:
      authenticationToken = await sessionsService.createSessionForUsername(
          credentials.username,
          credentials.password,
      );
      break;
    case Credentials.EMAIL_ADDRESS:
      authenticationToken = await sessionsService.createSessionForEmailAddress(
          credentials.emailAddress,
          credentials.password,
      );
      break;
    default:
      throw new UnknownCaseError();
  }
  return authenticationToken;
};

exports.createSession = async (req, res) => {
  const credentials = req.body;
  const credentialsType = req.query.credentials;
  let authenticationToken;
  try {
    authenticationToken = await createAuthenticationTokenForCredentials(
        credentials,
        credentialsType,
    );
  } catch (error) {
    if (error instanceof InvalidArgumentError) {
      res.status(401)
          .end();
    } else {
      res.status(500)
          .end();
    }
  }
  const responseBody = {
    authenticationToken: authenticationToken,
  };
  res.status(201)
      .json(responseBody);
};
