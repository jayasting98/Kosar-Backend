const usersController = require('../controllers/users.controller');

const {Router} = require('express');

const router = new Router();

router.post('/', usersController.createUser);

module.exports = router;
