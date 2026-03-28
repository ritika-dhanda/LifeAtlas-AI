import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444"];

function CategoryPieChart(){

  const [data,setData] = useState([]);

  const loadData = async ()=>{

    const token = localStorage.getItem("token");

    const res = await API.get("/entries",{
      headers:{Authorization:`Bearer ${token}`}
    });

    const entries = res.data;

    const counts = {};

    entries.forEach(e=>{
      counts[e.category] =
      (counts[e.category] || 0) + 1;
    });

    const chart =
      Object.keys(counts).map(cat=>({
        name:cat,
        value:counts[cat]
      }));

    setData(chart);

  };

  useEffect(()=>{
    loadData();
  },[]);

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-4">
        🥧 Category Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={80}
            label
          >

            {data.map((entry,index)=>(
              <Cell key={index}
                fill={COLORS[index % COLORS.length]}/>
            ))}

          </Pie>

          <Tooltip/>

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default CategoryPieChart;