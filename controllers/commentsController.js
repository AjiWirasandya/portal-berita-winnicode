const pool = require("../db/connection");

const getCommentsByArticleId = async (req, res) => {
  const { article_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postComments = async (req, res) => {
  const { article_id } = req.params;
  const { name, content } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comments (article_id, name, content) VALUES ($1, $2, $3) RETURNING *",
      [article_id, name, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCommentsByArticleId, postComments };
