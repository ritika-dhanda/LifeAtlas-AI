import { useEffect, useState } from "react";
import API from "../services/api";

function AIInsights() {

  const [insight, setInsight] = useState("");

  const fetchInsight = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const entries = res.data;

      if (entries.length === 0) {
        setInsight("Insights appear once activities are logged.");
        return;
      }

      setInsight(
        `You have logged ${entries.length} activities so far. Keep tracking to build productive habits.`
      );

    } catch {

      setInsight("Unable to generate insights right now.");

    }

  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">

      <h3 className="text-lg font-semibold mb-2">
        🤖 AI Insights
      </h3>

      <p className="text-gray-600">
        {insight || "Generating insights..."}
      </p>

    </div>

  );

}

export default AIInsights;