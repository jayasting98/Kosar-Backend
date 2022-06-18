const app = require("./app");

const functions = require("firebase-functions");

exports.v1 = functions.https.onRequest(app.v1);
