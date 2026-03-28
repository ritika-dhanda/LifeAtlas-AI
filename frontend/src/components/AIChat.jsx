import { useState } from "react";
import API from "../services/api";

function AIChat() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/chat",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAnswer(res.data.answer);

    } catch (error) {

      setAnswer("AI assistant unavailable.");

    }

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-3">
        💬 Ask LifeAtlas AI
      </h3>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about your productivity..."
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={askAI}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ask AI
      </button>

      {answer && (

        <p className="mt-4 text-gray-700 whitespace-pre-line">
          {answer}
        </p>

      )}

    </div>

  );

}

export default AIChat;