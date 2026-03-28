const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { getCurrentUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, getCurrentUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;