import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {

  const { toggleTheme } = useContext(ThemeContext);

  const logout = () => {

    localStorage.removeItem("token");

    window.location = "/";

  };

  const linkClass =
    "block px-3 py-2 rounded-md text-sm transition";

  const activeClass =
    "bg-blue-500 text-white";

  const normalClass =
    "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        LifeAtlas
      </h1>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : normalClass}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/entries"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : normalClass}`
          }
        >
          Entries
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : normalClass}`
          }
        >
          Profile
        </NavLink>

      </nav>

      <button
        onClick={toggleTheme}
        className="mt-8 w-full bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        🌙 Toggle Theme
      </button>

      <button
        onClick={logout}
        className="mt-4 w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;