const pool = require("../db/connection");

const getAllCategories = async (req, res) => {
  const result = await pool.query("SELECT * FROM categories");
  res.json(result.rows);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  res.json(result.rows[0]);
};

module.exports = { getAllCategories, createCategory };
