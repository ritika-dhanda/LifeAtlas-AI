import { useEffect, useState } from "react";
import API from "../services/api";

function AISuggestions() {

  const [suggestions, setSuggestions] = useState("");

  const fetchSuggestions = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const entries = res.data;

      if (entries.length === 0) {
        setSuggestions("Add activities to receive smart suggestions.");
        return;
      }

      const categories = {};

      entries.forEach(e => {
        categories[e.category] =
          (categories[e.category] || 0) + 1;
      });

      const mostActive =
        Object.keys(categories).reduce((a, b) =>
          categories[a] > categories[b] ? a : b
        );

      setSuggestions(
        `You spend most of your time on ${mostActive}. Try balancing with health and personal activities.`
      );

    } catch {

      setSuggestions("Unable to analyze activities right now.");

    }

  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">

      <h3 className="text-lg font-semibold mb-2">
        🤖 Smart Suggestions
      </h3>

      <p className="text-gray-600">
        {suggestions || "Analyzing your activities..."}
      </p>

    </div>

  );

}

export default AISuggestions;