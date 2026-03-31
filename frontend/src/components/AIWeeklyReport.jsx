import { useEffect, useState } from "react";
import API from "../services/api";

function AIWeeklyReport() {

  const [report, setReport] = useState("");

  const generateReport = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const entries = res.data;

      // Get start of current week
      const now = new Date();
      const startOfWeek = new Date();
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0,0,0,0);

      // Filter only this week's entries
      const weeklyEntries = entries.filter(entry =>
        new Date(entry.date) >= startOfWeek
      );

      if (weeklyEntries.length === 0) {
        setReport("No activities logged this week.");
        return;
      }

      const categories = {};

      weeklyEntries.forEach(e => {
        categories[e.category] =
          (categories[e.category] || 0) + 1;
      });

      const mostActive =
        Object.keys(categories).reduce((a, b) =>
          categories[a] > categories[b] ? a : b
        );

      setReport(
        `You logged ${weeklyEntries.length} activities this week.
Your most active category is ${mostActive}.`
      );

    } catch {

      setReport("Unable to generate weekly report.");

    }

  };

  useEffect(() => {
    generateReport();
  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-2">
        📊 Weekly Productivity Report
      </h3>

      <p className="text-gray-600 whitespace-pre-line">
        {report || "Generating report..."}
      </p>

    </div>

  );

}

export default AIWeeklyReport;
