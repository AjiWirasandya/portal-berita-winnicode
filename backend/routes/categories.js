const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory, deleteCategory } = require("../controllers/categoriesController");
const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.get("/", getAllCategories);
router.post("/", verifyToken, checkRole("admin"), createCategory);
router.delete("/", verifyToken, checkRole("admin"), deleteCategory);

module.exports = router;
