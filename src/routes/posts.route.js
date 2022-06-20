const postsController = require('../controllers/posts.controller');

const {Router} = require('express');

const router = new Router();

router.post('/', postsController.createPost);

router.get('/', postsController.getPosts);

module.exports = router;
