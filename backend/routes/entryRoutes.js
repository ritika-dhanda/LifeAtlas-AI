const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const {
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry
} = require("../controllers/entryController");


router.post("/", authMiddleware, createEntry);

router.get("/", authMiddleware, getEntries);

router.put("/:id", authMiddleware, updateEntry);

router.delete("/:id", authMiddleware, deleteEntry);


module.exports = router;