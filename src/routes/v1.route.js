const postsRouter = require('./posts.route');
const sessionsRouter = require('./sessions.route');
const usersRouter = require('./users.route');

const express = require('express');

const v1 = express();

v1.use(express.json());

v1.get('/', (req, res) => {
  res.send('Hello World!');
});

v1.use('/posts', postsRouter);
v1.use('/sessions', sessionsRouter);
v1.use('/users', usersRouter);

module.exports = v1;
