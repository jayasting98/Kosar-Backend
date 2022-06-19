const db = require("../services/db.service");

const CREATE_POST_SQL_TEMPLATE =
`INSERT INTO posts (
  message
) VALUES (
  $1
) RETURNING *;`;

exports.createPost = async (req, res) => {
  const message = req.body.message;
  let result;
  try {
    result = await db.query(CREATE_POST_SQL_TEMPLATE, [message]);
  } catch (err) {
    res.status(500).end();
  }
  const postRow = result.rows[0];
  const output = {
    postId: postRow.uuid,
    message: postRow.message,
    dateTimeCreated: postRow.datetime_created
  };
  res.status(201)
    .json(output);
};
