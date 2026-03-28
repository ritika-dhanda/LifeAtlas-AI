import { useEffect, useState } from "react";
import API from "../services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function ActivityChart() {

  const [data, setData] = useState([]);

  const fetchData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const entries = res.data;

      const counts = {};

      entries.forEach(e => {

        const day = new Date(e.date)
          .toLocaleDateString("en-US", { weekday: "short" });

        counts[day] = (counts[day] || 0) + 1;

      });

      const chartData = Object.keys(counts).map(day => ({
        day,
        activities: counts[day]
      }));

      setData(chartData);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h3 className="text-lg font-semibold mb-4">
        📈 Activity Trend (Last Days)
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="activities"
            stroke="#3b82f6"
            strokeWidth={2}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ActivityChart;