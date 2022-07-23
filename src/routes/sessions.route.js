const sessionsController = require('../controllers/sessions.controller');

const {Router} = require('express');

const router = new Router();

router.post('/', sessionsController.createSession);

module.exports = router;
