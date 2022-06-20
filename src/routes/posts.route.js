const postsController = require("../controllers/posts.controller");

const { Router } = require("express");

const router = Router();

router.post("/", postsController.createPost);

router.get("/", postsController.getPosts);

module.exports = router;
