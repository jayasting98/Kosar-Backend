const db = require('../services/db.service');

const idUtil = require('../utils/id.util');

const CREATE_POST_SQL_TEMPLATE =
`INSERT INTO posts (
  message
) VALUES (
  $1
) RETURNING *;`;

const GET_POSTS_SQL =
`SELECT
  p.uuid,
  p.message,
  p.datetime_created
FROM
  posts p;`;

const convertPostRowToPost = (postRow) => {
  const postId = idUtil.convertFromRawId(postRow.uuid);
  return {
    postId: postId,
    message: postRow.message,
    dateTimeCreated: postRow.datetime_created,
  };
};

exports.createPost = async (req, res) => {
  const message = req.body.message;
  let result;
  try {
    result = await db.query(CREATE_POST_SQL_TEMPLATE, [message]);
  } catch (err) {
    res.status(500)
        .end();
  }
  const postRow = result.rows[0];
  const output = convertPostRowToPost(postRow);
  res.status(201)
      .json(output);
};

exports.getPosts = async (req, res) => {
  let result;
  try {
    result = await db.query(GET_POSTS_SQL, []);
  } catch (err) {
    res.status(500)
        .end();
  }
  const postRows = result.rows;
  const posts = postRows.map(convertPostRowToPost);
  const output = {
    posts: posts,
  };
  res.status(200)
      .json(output);
};
