import Sidebar from "../components/Sidebar";

import OverviewPanel from "../components/OverviewPanel";

import ActivityChart from "../components/ActivityChart";
import CategoryPieChart from "../components/CategoryPieChart";

import AIChat from "../components/AIChat";
import AIWeeklyReport from "../components/AIWeeklyReport";

import ProductivityScore from "../components/ProductivityScore";
import GoalTracker from "../components/GoalTracker";

import AIHabitRecommendation from "../components/AIHabitRecommendation";

import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";

function Dashboard() {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold mb-2">
            LifeAtlas Dashboard
          </h2>

          <p className="text-gray-500 mb-8">
            AI-powered productivity tracking
          </p>

          {/* Overview */}

          <OverviewPanel />

          {/* Charts */}

          <h3 className="text-xl font-semibold mt-10 mb-4">
            Analytics
          </h3>

          <div className="grid grid-cols-2 gap-6">

            <ActivityChart />

            <CategoryPieChart />

          </div>

          {/* AI Assistant */}

          <h3 className="text-xl font-semibold mt-10 mb-4">
            AI Assistant
          </h3>

          <div className="grid grid-cols-2 gap-6">

            <AIChat />

            <AIWeeklyReport />

          </div>

          {/* Productivity */}

          <h3 className="text-xl font-semibold mt-10 mb-4">
            Productivity
          </h3>

          <div className="grid grid-cols-2 gap-6">

            <ProductivityScore />

            <GoalTracker />

          </div>

          {/* Habit Recommendation */}

          <div className="mt-6">

            <AIHabitRecommendation />

          </div>

          {/* Activity Tracker */}

          <h3 className="text-xl font-semibold mt-10 mb-4">
            Activity Tracker
          </h3>

          <div className="mb-6">

            <EntryForm />

          </div>

          <EntryList />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;