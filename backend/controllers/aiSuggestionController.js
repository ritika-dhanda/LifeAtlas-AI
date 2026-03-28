const OpenAI = require("openai");
const Entry = require("../models/Entry");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getSuggestions = async (req, res) => {

  try {

    const entries = await Entry.find({
      userId: req.user.id
    });

    const activities = entries
      .map(e => `${e.category}: ${e.title}`)
      .join("\n");

    const prompt = `
User activity log:

${activities}

Based on this activity data, give 3 short productivity suggestions 
to help the user improve balance between learning, work, health, 
and personal life.
`;

    const response = await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        { role: "user", content: prompt }
      ]

    });

    res.json({
      suggestions: response.choices[0].message.content
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to generate suggestions"
    });

  }

};