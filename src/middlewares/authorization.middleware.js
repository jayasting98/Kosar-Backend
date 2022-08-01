const auth = require('../services/auth.service');

const BEARER_AUTHORIZATION_PREFIX = 'Bearer ';

module.exports = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const hasBearerAuthorization = authorizationHeader &&
      authorizationHeader.startsWith(BEARER_AUTHORIZATION_PREFIX);
  const hasSessionCookie = req.cookies && req.cookies.__session;
  if (!hasBearerAuthorization && !hasSessionCookie) {
    res.status(403)
        .end();
    return;
  }

  let bearerToken;
  if (hasBearerAuthorization) {
    bearerToken = authorizationHeader.split(BEARER_AUTHORIZATION_PREFIX)[1];
  } else if (hasSessionCookie) {
    bearerToken = req.cookies.__session;
  } else {
    res.status(403)
        .end();
    return;
  }

  try {
    const decodedBearerToken = await auth.decodeBearerToken(bearerToken);
    req.user = decodedBearerToken;
    next();
    return;
  } catch (error) {
    res.status(403)
        .end();
    return;
  }
};
