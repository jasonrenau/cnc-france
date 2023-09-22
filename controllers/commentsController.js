const db = require('../db');
const { StatusCodes } = require('http-status-codes');
// pour decoder les caractères spéciaux
const he = require('he');

const createComment = async (req, res) => {
  const { message } = req.body;
  const { userId } = req.user;
  const { id } = req.params;

  const {
    rows: [createdComment],
  } = await db.query(
    'INSERT INTO comments (message,user_id,article_id) VALUES ($1,$2,$3)  RETURNING *',
    [message, userId, id]
  );

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Commentaire ajouté', comment: createdComment });
};

const getAllComments = async (req, res) => {
  const { id } = req.params;

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const query = `
    SELECT comments.*, users.pseudo
    FROM comments
    LEFT JOIN users ON comments.user_id = users.user_id
    WHERE article_id = $1
    ORDER BY comments.created_at DESC
    LIMIT $2
    OFFSET $3
  `;

  const queryParams = [id, limit, offset];

  const { rows: commentsEncoded } = await db.query(query, queryParams);

  // Déséchappez le commentaire avant de les renvoyer au front-end
  const comments = commentsEncoded.map((comment) => ({
    ...comment,
    message: he.decode(comment.message),
  }));

  const countQuery = `
      SELECT COUNT(*) FROM comments
      WHERE article_id = $1
    `;

  const {
    rows: [{ count }],
  } = await db.query(countQuery, [id]);

  const numberOfPages = Math.ceil(count / limit);

  res
    .status(StatusCodes.OK)
    .json({ comments, currentPage: page, numberOfPages });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [deletedComment],
  } = await db.query(
    'DELETE FROM comments WHERE comment_id = $1  RETURNING *',
    [id]
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Commentaire supprimé', comment: deletedComment });
};

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
};
