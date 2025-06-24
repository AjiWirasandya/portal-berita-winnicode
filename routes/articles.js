const express = require("express");
const router = express.Router();
const { getAllArticles, getArticleById, createArticle } = require("../controllers/articlesController");
const verifyToken = require("../middleware/auth");

router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/", verifyToken, createArticle);

module.exports = router;
