const { Pool } = require("pg");

const pool = new Pool();

exports.pool = pool;

exports.getClient = async () => {
  return pool.connect();
};

exports.query = async (text, params) => {
  return pool.query(text, params);
};
