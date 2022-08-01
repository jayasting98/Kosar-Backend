const {getAuth} = require('firebase-admin/auth');

const auth = getAuth();

exports.createUser = async (uid) => {
  const createRequest = {
    uid: uid,
  };
  const userRecord = await auth.createUser(createRequest);
  return userRecord;
};

exports.generateAuthenticationToken = async (uid) => {
  const authenticationToken = await auth.createCustomToken(uid);
  return authenticationToken;
};

exports.decodeBearerToken = async (bearerToken) => {
  const decodedBearerToken = await auth.verifyIdToken(bearerToken);
  return decodedBearerToken;
};
