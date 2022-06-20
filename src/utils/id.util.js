const short = require('short-uuid');

const translator = short();

exports.convertFromRawId = translator.fromUUID;

exports.convertToRawId = translator.toUUID;
