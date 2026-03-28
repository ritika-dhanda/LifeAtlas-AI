import { useEffect, useState } from "react";
import API from "../services/api";

function AIHabitRecommendation(){

  const [suggestion,setSuggestion] = useState("");

  const generateSuggestion = async () => {

    try{

      const token = localStorage.getItem("token");

      const res = await API.get("/entries",{
        headers:{Authorization:`Bearer ${token}`}
      });

      const entries = res.data;

      if(entries.length === 0){

        setSuggestion(
          "Start logging activities so AI can analyze your productivity patterns."
        );

        return;

      }

      const categories = {};

      entries.forEach(e => {

        categories[e.category] =
          (categories[e.category] || 0) + 1;

      });

      const categoryNames = Object.keys(categories);

      const mostActive =
        categoryNames.reduce((a,b)=>
          categories[a] > categories[b] ? a : b
        );

      const leastActive =
        categoryNames.reduce((a,b)=>
          categories[a] < categories[b] ? a : b
        );

      const allCategories = [
        "Learning",
        "Health",
        "Work",
        "Personal"
      ];

      const missingCategory =
        allCategories.find(c => !categories[c]);

      // recommendation logic

      if(entries.length < 5){

        setSuggestion(
          "Try logging activities more consistently to build a productive routine."
        );

      }

      else if(missingCategory){

        setSuggestion(
          `You haven't logged any ${missingCategory} activities yet. Adding this area could improve life balance.`
        );

      }

      else if(categories[mostActive] > categories[leastActive] * 2){

        setSuggestion(
          `You spend a lot of time on ${mostActive}. Consider improving ${leastActive} to balance your productivity.`
        );

      }

      else{

        setSuggestion(
          `Your activities are fairly balanced. Keep maintaining consistency across categories.`
        );

      }

    }

    catch(error){

      setSuggestion("Unable to generate recommendation.");

    }

  };

  useEffect(()=>{
    generateSuggestion();
  },[]);

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="text-lg font-semibold mb-2">
        🧠 AI Habit Recommendation
      </h3>

      <p className="text-gray-600">
        {suggestion || "Analyzing your activities..."}
      </p>

    </div>

  );

}

export default AIHabitRecommendation;