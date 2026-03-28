import { useEffect, useState } from "react";
import API from "../services/api";

function StreakTracker() {

  const [streak, setStreak] = useState(0);

  const calculateStreak = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get("/entries", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const entries = res.data;

    const dates = entries.map((entry) =>
      new Date(entry.createdAt).toDateString()
    );

    const uniqueDates = [...new Set(dates)];

    uniqueDates.sort((a, b) => new Date(b) - new Date(a));

    let streakCount = 0;
    let currentDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {

      const date = new Date(uniqueDates[i]);

      const diff =
        Math.floor(
          (currentDate - date) / (1000 * 60 * 60 * 24)
        );

      if (diff === streakCount) {
        streakCount++;
      } else {
        break;
      }

    }

    setStreak(streakCount);

  };

  useEffect(() => {
    calculateStreak();
  }, []);

  return (

    <div className="bg-white p-4 rounded shadow mb-6">

      <h3 className="text-lg font-semibold">
        Productivity Streak
      </h3>

      <p className="text-2xl mt-2">
        🔥 {streak} Day Streak
      </p>

    </div>

  );

}

export default StreakTracker;