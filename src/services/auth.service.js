const {getAuth} = require('firebase-admin/auth');

const auth = getAuth();

exports.createUser = async (uid) => {
  const createRequest = {
    uid: uid,
  };
  const userRecord = await auth.createUser(createRequest);
  return userRecord;
};
