const express = require ("express");
const router = express.Router();
const { getCommentsByArticleId, postComments } = require ("../controllers/commentsController");
const verifyToken = require ("../middleware/auth");

router.get ("/:article_id", getCommentsByArticleId);
router.post ("/:article_id", verifyToken, postComments);

module.exports = router;