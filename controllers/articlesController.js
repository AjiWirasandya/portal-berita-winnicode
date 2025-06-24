const pool = require("../db/connection");

const getAllArticles = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, c.name AS category 
       FROM articles a 
       LEFT JOIN categories c ON a.category_id = c.id 
       ORDER BY published_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
  res.json(result.rows[0]);
};

const createArticle = async (req, res) => {
  const { title, content, category_id } = req.body;
  const result = await pool.query(
    "INSERT INTO articles (title, content, category_id) VALUES ($1, $2, $3) RETURNING *",
    [title, content, category_id]
  );
  res.json(result.rows[0]);
};

module.exports = { getAllArticles, getArticleById, createArticle };
