const pool = require("../db/connection");

const getAllArticles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM articles ORDER BY published_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllArticles };
