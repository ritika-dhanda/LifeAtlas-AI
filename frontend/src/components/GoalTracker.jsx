import { useState } from "react";

function GoalTracker(){

const [goal] = useState(5);
const [progress] = useState(2);

return(

<div className="bg-white p-6 rounded-xl shadow">

<h3 className="text-lg font-semibold">
🎯 Weekly Goal
</h3>

<p className="mt-2">
Goal: {goal} activities
</p>

<p>
Progress: {progress}/{goal}
</p>

<div className="w-full bg-gray-200 rounded mt-2">

<div
className="bg-blue-500 h-3 rounded"
style={{width:`${(progress/goal)*100}%`}}
>

</div>

</div>

</div>

);

}

export default GoalTracker;