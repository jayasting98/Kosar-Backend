const db = require('../services/db.service');
const usersService = require('../services/users.service');
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
  u.username,
  u.date_time_created as author_date_time_created,
  p.date_time_created
FROM
  posts p
  JOIN users u ON
    p.author_uid = u.uid;`;

const convertPostRowToPost = (postRow) => {
  const postId = idUtil.convertFromRawId(postRow.pid);
  const authorUserId = idUtil.convertFromRawId(postRow.author_uid);
  const post = {
    postId: postId,
    message: postRow.message,
    author: {
      userId: authorUserId,
      username: postRow.username,
      dateTimeCreated: postRow.author_date_time_created,
    },
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
  const authorUserId = idUtil.convertFromRawId(postRow.author_uid);
  const author = await usersService.getUserWithUserId(authorUserId);
  postRow.username = author.username;
  postRow.author_date_time_created = author.dateTimeCreated;
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
