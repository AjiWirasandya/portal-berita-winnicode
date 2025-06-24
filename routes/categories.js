const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory } = require("../controllers/categoriesController");
const verifyToken = require("../middleware/auth");

router.get("/", getAllCategories);
router.post("/", verifyToken, createCategory);

module.exports = router;
