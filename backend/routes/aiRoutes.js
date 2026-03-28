const express = require("express");
const router = express.Router();

const { askAI } = require("../controllers/aiController");
const auth = require("../middleware/auth");

router.post("/chat", auth, askAI);

module.exports = router;