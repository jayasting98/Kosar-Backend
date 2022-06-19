const express = require("express");

const v1 = express();

v1.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = v1;
