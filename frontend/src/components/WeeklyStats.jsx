import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function WeeklyStats() {

  const [data, setData] = useState([]);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const entries = res.data;

      // Calculate start of week
      const now = new Date();
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      // Filter entries from this week only
      const weeklyEntries = entries.filter(entry =>
        new Date(entry.createdAt) >= startOfWeek
      );

      const days = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0
      };

      weeklyEntries.forEach((entry) => {

        const day = new Date(entry.createdAt)
          .toLocaleDateString("en-US", { weekday: "short" });

        if (days[day] !== undefined) {
          days[day]++;
        }

      });

      const chartData = Object.keys(days).map((key) => ({
        day: key,
        value: days[key]
      }));

      setData(chartData);

    } catch (err) {

      console.error("Weekly stats error:", err);

    }

  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (

    <div className="bg-white p-6 rounded shadow mb-6">

      <h3 className="text-lg font-semibold mb-4">
        Weekly Activity
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" fill="#3b82f6" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default WeeklyStats;
