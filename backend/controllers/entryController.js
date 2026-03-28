const Entry = require("../models/Entry");

exports.getEntries = async (req, res) => {
  try {

    const entries = await Entry.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(entries);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message
    });

  }
};

exports.createEntry = async (req, res) => {

  try {

    const entry = await Entry.create({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json(entry);

  } catch (error) {

    res.status(500).json({
      message: "Failed to create activity"
    });

  }
};

exports.updateEntry = async (req, res) => {

  try {

    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(entry);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update activity"
    });

  }
};

exports.deleteEntry = async (req, res) => {

  try {

    await Entry.findByIdAndDelete(req.params.id);

    res.json({
      message: "Activity deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete activity"
    });

  }
};