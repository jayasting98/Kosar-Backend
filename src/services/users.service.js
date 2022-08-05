const auth = require('./auth.service');
const db = require('./db.service');
const idUtil = require('../utils/id.util');
const passwordUtil = require('../utils/password.util');

const CREATE_USER_SQL_TEMPLATE =
`INSERT INTO users (
  email_address,
  username,
  password_hash
) VALUES (
  $1,
  $2,
  $3
) RETURNING
  *;`;

const GET_USER_WITH_USERNAME_SQL_TEMPLATE =
`SELECT
  u.uid,
  u.email_address,
  u.username,
  u.password_hash,
  u.date_time_created
FROM
  users u
WHERE
  u.username = $1;`;

const GET_USER_WITH_EMAIL_ADDRESS_SQL_TEMPLATE =
`SELECT
  u.uid,
  u.email_address,
  u.username,
  u.password_hash,
  u.date_time_created
FROM
  users u
WHERE
  u.email_address = $1;`;

const GET_USER_WITH_USER_ID_SQL_TEMPLATE =
`SELECT
  u.uid,
  u.email_address,
  u.username,
  u.password_hash,
  u.date_time_created
FROM
  users u
WHERE
  u.uid = $1;`;

const convertUserRowToUser = (userRow) => {
  const userId = idUtil.convertFromRawId(userRow.uid);
  const user = {
    userId: userId,
    emailAddress: userRow.email_address,
    username: userRow.username,
    passwordHash: userRow.password_hash,
    dateTimeCreated: userRow.date_time_created,
  };
  return user;
};

exports.createUser = async (emailAddress, username, plaintextPassword) => {
  const passwordSalt = await passwordUtil.generateSalt();
  const passwordHash =
      await passwordUtil.generateHash(plaintextPassword, passwordSalt);
  const dbQueryParameters = [emailAddress, username, passwordHash];
  const dbResult = await db.query(CREATE_USER_SQL_TEMPLATE, dbQueryParameters);
  const userRow = dbResult.rows[0];
  const user = convertUserRowToUser(userRow);
  await auth.createUser(user.userId);
  return user;
};

exports.getUserWithUsername = async (username) => {
  const dbResult =
      await db.query(GET_USER_WITH_USERNAME_SQL_TEMPLATE, [username]);
  const userRow = dbResult.rows[0];
  const user = convertUserRowToUser(userRow);
  return user;
};

exports.getUserWithEmailAddress = async (emailAddress) => {
  const dbResult =
      await db.query(GET_USER_WITH_EMAIL_ADDRESS_SQL_TEMPLATE, [emailAddress]);
  const userRow = dbResult.rows[0];
  const user = convertUserRowToUser(userRow);
  return user;
};

exports.getUserWithUserId = async (userId) => {
  const rawUserId = idUtil.convertToRawId(userId);
  const dbResult =
      await db.query(GET_USER_WITH_USER_ID_SQL_TEMPLATE, [rawUserId]);
  const userRow = dbResult.rows[0];
  const user = convertUserRowToUser(userRow);
  return user;
};
