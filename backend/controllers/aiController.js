const OpenAI = require("openai");
const Entry = require("../models/Entry");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.askAI = async (req, res) => {

  try {

    const { question } = req.body;

    const userId = req.user.id;

    const entries = await Entry.find({ userId });

    if (entries.length === 0) {

      return res.json({
        answer: "You haven't logged any activities yet."
      });

    }

    const activitySummary = entries
      .map(e => `${e.title} (${e.category})`)
      .join(", ");

    const prompt = `
User activity history:
${activitySummary}

User question:
${question}

Give productivity advice based on the user's activities.
`;

    const completion = await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: "You are a productivity coach."
        },
        {
          role: "user",
          content: prompt
        }
      ]

    });

    res.json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "AI error"
    });

  }

};