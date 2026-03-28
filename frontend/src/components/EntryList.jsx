import { useEffect, useState } from "react";
import API from "../services/api";

function EntryList() {

  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/entries", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEntries(res.data);
      setLoading(false);

    } catch (error) {

      console.error(error);
      setLoading(false);

    }

  };

  const deleteEntry = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchEntries();

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const filteredEntries = entries.filter((entry) => {

    const matchSearch =
      entry.title.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      filter === "All" || entry.category === filter;

    return matchSearch && matchCategory;

  });

  return (
    

    <div className="mt-6">

      <h3 className="text-xl font-semibold mb-4">
        Your Activities
      </h3>
<input
  type="text"
  placeholder="Search activities..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border border-gray-300 p-2 rounded-lg mb-4 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
      {/* <input
        type="text"
        placeholder="Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-64"
      /> */}
<div className="flex gap-2 mb-4 flex-wrap">

{["All","Learning","Work","Health","Entertainment","Personal"].map((cat) => (

<button
  key={cat}
  onClick={() => setFilter(cat)}
  className={`px-3 py-1 rounded-full text-sm ${
    filter === cat
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-gray-700"
  }`}
>
  {cat}
</button>

))}

</div>
      {/* <div className="flex gap-2 mb-4">

        {["All","Learning","Work","Health","Entertainment","Personal"].map((cat) => (

          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            {cat}
          </button>

        ))}

      </div> */}

      {loading && (
        <p className="text-gray-500">
          Loading activities...
        </p>
      )}

      {filteredEntries.map((entry) => (

<div
  key={entry._id}
  className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
>

  <h4 className="text-lg font-semibold text-gray-800">
    {entry.title}
  </h4>

  <p className="text-sm text-gray-500 mt-1">
    Category: {entry.category}
  </p>

  <p className="text-xs text-gray-400 mt-1">
    {new Date(entry.createdAt).toLocaleDateString()}
  </p>

  <button
    className="text-red-500 text-sm mt-3 hover:text-red-600"
    onClick={() => deleteEntry(entry._id)}
  >
    Delete
  </button>

</div>
/*
        <div
          key={entry._id}
          className="bg-white p-4 rounded shadow mb-3"
        >

          <h4 className="text-lg font-bold">
            {entry.title}
          </h4>

          <p className="text-sm text-gray-500">
            Category: {entry.category}
          </p>

          <p className="text-sm text-gray-400">
            {new Date(entry.createdAt).toLocaleDateString()}
          </p>

          <button
            className="text-red-500 mt-2 text-sm"
            onClick={() => deleteEntry(entry._id)}
          >
            Delete
          </button>

        </div>*/

      ))}

      {filteredEntries.length === 0 && !loading && (

        <div className="text-center text-gray-500 mt-6">

          <p className="text-lg">
            No activities yet.
          </p>

          <p className="text-sm">
            Start tracking your day above!
          </p>

        </div>

      )}

    </div>

  );
}

export default EntryList;