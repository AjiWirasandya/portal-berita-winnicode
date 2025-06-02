const express = require("express");
const router = express.Router();
const { getAllArticles } = require("../controllers/articlesController");

router.get("/", getAllArticles);

module.exports = router;
