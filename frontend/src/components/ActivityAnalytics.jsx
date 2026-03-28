import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6"
];

function ActivityAnalytics() {

  const [data, setData] = useState([]);

  const fetchAnalytics = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get("/entries", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const entries = res.data;

    const counts = {};

    entries.forEach((entry) => {

      counts[entry.category] =
        (counts[entry.category] || 0) + 1;

    });

    const chartData = Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key]
    }));

    setData(chartData);

  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (

    <div className="bg-white p-6 rounded shadow mb-6">

      <h3 className="text-lg font-semibold mb-4">
        Activity Analytics
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}

export default ActivityAnalytics;