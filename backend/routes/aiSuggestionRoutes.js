const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  getSuggestions
} = require("../controllers/aiSuggestionController");

router.get("/suggestions", authMiddleware, getSuggestions);

module.exports = router;