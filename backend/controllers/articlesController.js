const pool = require("../db/connection");
const { SummarizerManager } = require("node-summarizer");

function getSummary(content, sentenceCount = 2) {
  if (!content) return "";
  try {
    const summarizer = new SummarizerManager(content, sentenceCount);
    const summaryObject = summarizer.getSummaryByRank();
    // node-summarizer kadang return null/undefined jika gagal
    return summaryObject && summaryObject.summary
      ? summaryObject.summary
      : content.split(". ").slice(0, sentenceCount).join(". ") + ".";
  } catch (err) {
    // fallback jika error
    return content.split(". ").slice(0, sentenceCount).join(". ") + ".";
  }
}

const getAllArticles = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT a.*, c.name AS category 
       FROM articles a 
       LEFT JOIN categories c ON a.category_id = c.id 
       ORDER BY published_at DESC`
    );
    // Tambahkan summary ke setiap artikel
    const articlesWithSummary = result.rows.map((article) => ({
      ...article,
      summary: getSummary(article.content, 2),
    }));
    res.json(articlesWithSummary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchArticles = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await pool.query(
      `SELECT a.*, c.name AS category
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.title ILIKE $1 OR a.content ILIKE $1
       ORDER BY published_at DESC`,
      [`%${q}%`]
    );
    // Tambahkan summary ke setiap artikel
    const articlesWithSummary = result.rows.map((article) => ({
      ...article,
      summary: getSummary(article.content, 2),
    }));
    res.json(articlesWithSummary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticleById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM articles WHERE id = $1", [id]);
  const article = result.rows[0];
  if (article) {
    article.summary = getSummary(article.content, 2);
  }
  res.json(article);
};

const createArticle = async (req, res) => {
  const { title, content, category, image_url } = req.body;
  try {
    // cari id dari nama kategori
    const catResult = await pool.query(
      "SELECT id FROM categories WHERE name = $1",
      [category]
    );

    if (catResult.rows.length === 0) {
      return res.status(400).json({ error: "Kategori tidak ditemukan." });
    }

    const category_id = catResult.rows[0].id;

    const result = await pool.query(
      "INSERT INTO articles (title, content, category_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, category_id, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error:
        "You need to provide title, content, category, and image_url to create an article.",
    });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.body;
  const result = await pool.query(
    "DELETE FROM articles WHERE id = $1 RETURNING *",
    [id]
  );
  res.json({
    message: "Article succesfully deleted",
    article: result.rows[0],
  });
};

const updateArticle = async (req, res) => {
  const { title, content, image_url, category } = req.body;
  const { id } = req.params;
  try {
    // cari id dari nama kategori
    const catResult = await pool.query(
      "SELECT id FROM categories WHERE name = $1",
      [category]
    );

    if (catResult.rows.length === 0) {
      return res.status(400).json({ error: "Kategori tidak ditemukan." });
    }

    const category_id = catResult.rows[0].id;

    const result = await pool.query(
      "UPDATE articles SET title = $1, content = $2, image_url = $3, category_id = $4 WHERE id = $5 RETURNING *",
      [title, content, image_url, category_id, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error:
        "Provide an update for the title, content, image_url, and category of the article.",
    });
  }
};

const getArticlesByCategory = async (req, res) => {
  const { category_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT a.*, c.name AS category 
       FROM articles a 
       JOIN categories c ON a.category_id = c.id 
       WHERE a.category_id = $1
       ORDER BY published_at DESC`,
      [category_id]
    );
    // Tambahkan summary ke setiap artikel
    const articlesWithSummary = result.rows.map((article) => ({
      ...article,
      summary: getSummary(article.content, 2),
    }));
    res.json(articlesWithSummary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  getArticlesByCategory,
  deleteArticle,
  updateArticle,
  searchArticles,
};
