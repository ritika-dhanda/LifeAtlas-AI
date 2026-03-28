import { useEffect, useState } from "react";
import API from "../services/api";

function OverviewPanel() {

  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const fetchStats = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get("/entries", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const entries = res.data;

    setTotal(entries.length);

    let activityScore = Math.min(entries.length * 5, 50);

    const categories = {};
    entries.forEach(e => {
      categories[e.category] =
        (categories[e.category] || 0) + 1;
    });

    const balanceScore =
      Math.min(Object.keys(categories).length * 10, 50);

    setScore(activityScore + balanceScore);

    const days = new Set(
      entries.map(e => new Date(e.date).toDateString())
    );

    setStreak(days.size);

  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (

    <div className="grid grid-cols-3 gap-4 mb-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">
          Activities Logged
        </p>
        <p className="text-2xl font-bold">
          {total}
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">
          Productivity Score
        </p>
        <p className="text-2xl font-bold">
          {score}/100
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500 text-sm">
          Current Streak
        </p>
        <p className="text-2xl font-bold">
          {streak} days
        </p>
      </div>

    </div>

  );

}

export default OverviewPanel;