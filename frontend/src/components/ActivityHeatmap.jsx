import { useEffect, useState } from "react";
import API from "../services/api";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function ActivityHeatmap() {

  const [values, setValues] = useState([]);

  const fetchEntries = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get("/entries", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const entries = res.data;

    const counts = {};

    entries.forEach((entry) => {

      const date = new Date(entry.createdAt)
        .toISOString()
        .slice(0, 10);

      counts[date] = (counts[date] || 0) + 1;

    });

    const heatmapData = Object.keys(counts).map((date) => ({
      date,
      count: counts[date]
    }));

    setValues(heatmapData);

  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (

    <div className="bg-white p-6 rounded shadow mb-6">

      <h3 className="text-lg font-semibold mb-4">
        Activity Heatmap
      </h3>

      <CalendarHeatmap
        startDate={
          new Date(new Date().setMonth(new Date().getMonth() - 3))
        }
        endDate={new Date()}
        values={values}
        classForValue={(value) => {

          if (!value) return "color-empty";

          return `color-github-${Math.min(value.count, 4)}`;

        }}
      />

    </div>

  );

}

export default ActivityHeatmap;