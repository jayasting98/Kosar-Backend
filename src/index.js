const v1 = require('./routes/v1.route');

const functions = require('firebase-functions');

exports.v1 = functions.https.onRequest(v1);
