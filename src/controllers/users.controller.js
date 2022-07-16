const usersService = require('../services/users.service');

exports.createUser = async (req, res) => {
  const emailAddress = req.body.emailAddress;
  const username = req.body.username;
  const plaintextPassword = req.body.password;
  let user;
  try {
    user = await usersService.createUser(
        emailAddress,
        username,
        plaintextPassword,
    );
  } catch (error) {
    res.status(500)
        .end();
  }
  const response = {
    userId: user.userId,
    emailAddress: user.emailAddress,
    username: user.username,
    dateTimeCreated: user.dateTimeCreated,
  };
  res.status(201)
      .json(response);
};
