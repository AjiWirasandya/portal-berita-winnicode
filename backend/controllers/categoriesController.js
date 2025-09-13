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

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  const result = await pool.query(
    "DELETE FROM categories WHERE id = $1 RETURNING *",
    [id]
  );
  res.json({ message: "Category sucessfully deleted", category: result.rows[0] }
  );
};

module.exports = { getAllCategories, createCategory, deleteCategory };
