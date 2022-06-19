const postsRouter = require("./posts.route");

const express = require("express");

const v1 = express();

v1.use(express.json());

v1.get("/", (req, res) => {
  res.send("Hello World!");
});

v1.use("/posts", postsRouter);

module.exports = v1;
