const sessionsRouter = require('./sessions.route');
const usersUnauthorizedRouter = require('./users.unauthorized-route');

const {Router} = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/sessions', sessionsRouter);
router.use('/users', usersUnauthorizedRouter);

module.exports = router;
