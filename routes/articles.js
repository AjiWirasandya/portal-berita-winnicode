const express = require("express");
const router = express.Router();
const { getAllArticles, getArticleById, createArticle, getArticlesByCategory, deleteArticle, updateArticle, searchArticles } = require("../controllers/articlesController");
const verifyToken = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.get("/search", searchArticles);
router.get("/", getAllArticles);
router.get("/category/:category_id", getArticlesByCategory);
router.get("/:id", getArticleById);
router.post("/", verifyToken, checkRole("admin"), createArticle);
router.delete("/", verifyToken, checkRole("admin"), deleteArticle);
router.put("/:id", verifyToken, checkRole("admin"), updateArticle);

module.exports = router;
