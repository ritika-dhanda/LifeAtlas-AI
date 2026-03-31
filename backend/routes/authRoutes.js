import { useEffect, useState } from "react";
import API from "../services/api";

function GoalTracker() {

  const [progress, setProgress] = useState(0);

  const goal = 5;

  const fetchProgress = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const entries = res.data;

      // Get start of week
      const now = new Date();
      const startOfWeek = new Date();

      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0,0,0,0);

      // Filter only this week's entries
      const weeklyEntries = entries.filter(entry =>
        new Date(entry.createdAt) >= startOfWeek
      );

      setProgress(weeklyEntries.length);

    } catch (err) {

      console.error("GoalTracker error:", err);

    }

  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const percent = Math.min((progress / goal) * 100, 100);

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-2">
        Weekly Goal
      </h3>

      <p className="text-gray-600 mb-3">
        Complete 5 activities this week
      </p>

      <div className="w-full bg-gray-200 h-3 rounded-full">

        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${percent}%` }}
        />

      </div>

      <p className="mt-2 text-sm text-gray-500">
        {progress}/{goal}
      </p>

    </div>

  );

}

export default GoalTracker;
