// eslint-disable-next-line max-len
const authorizationMiddleware = require('../middlewares/authorization.middleware');
const postsRouter = require('./posts.route');
const usersRouter = require('./users.route');
const v1UnauthorizedRouter = require('./v1.unauthorized-route');

const express = require('express');

const v1 = express();

v1.use(express.json());

v1.use(v1UnauthorizedRouter);

v1.use(authorizationMiddleware);

v1.use('/posts', postsRouter);
v1.use('/users', usersRouter);

module.exports = v1;
