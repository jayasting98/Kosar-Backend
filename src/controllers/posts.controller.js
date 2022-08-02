const db = require('../services/db.service');

const idUtil = require('../utils/id.util');

const CREATE_POST_SQL_TEMPLATE =
`INSERT INTO posts (
  message,
  author_uid
) VALUES (
  $1,
  $2
) RETURNING *;`;

const GET_POSTS_SQL =
`SELECT
  p.pid,
  p.message,
  p.author_uid,
  p.date_time_created
FROM
  posts p;`;

const convertPostRowToPost = (postRow) => {
  const postId = idUtil.convertFromRawId(postRow.pid);
  const authorUid = idUtil.convertFromRawId(postRow.author_uid);
  const post = {
    postId: postId,
    message: postRow.message,
    authorUid: authorUid,
    dateTimeCreated: postRow.date_time_created,
  };
  return post;
};

exports.createPost = async (req, res) => {
  const message = req.body.message;
  const authorUid = idUtil.convertToRawId(req.user.uid);
  let result;
  try {
    result = await db.query(CREATE_POST_SQL_TEMPLATE, [message, authorUid]);
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
