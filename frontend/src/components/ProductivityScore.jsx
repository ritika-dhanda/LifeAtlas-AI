import { useEffect, useState } from "react";
import API from "../services/api";

function ProductivityScore() {

  const [score, setScore] = useState(null);

  const calculateScore = async () => {

    const token = localStorage.getItem("token");

    const res = await API.get("/entries", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const entries = res.data;

    let activityScore = Math.min(entries.length * 5, 50);

    const categories = {};
    entries.forEach(e => {
      categories[e.category] =
        (categories[e.category] || 0) + 1;
    });

    const balanceScore =
      Math.min(Object.keys(categories).length * 10, 50);

    setScore(activityScore + balanceScore);

  };

  useEffect(() => {
    calculateScore();
  }, []);

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-2">
        ⚡ Productivity Score
      </h3>

      <p className="text-gray-600">

        {score !== null
          ? `Your productivity score is ${score}/100`
          : "Calculating..."
        }

      </p>

    </div>

  );

}

export default ProductivityScore;