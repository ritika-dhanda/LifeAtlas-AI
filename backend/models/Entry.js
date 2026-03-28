const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  category: {
    type: String,
    required: true
  },

  subcategory: {
    type: String
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  tags: [String],

  progress: {
    type: Number
  },

  rating: {
    type: Number
  },

  date: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Entry", EntrySchema);