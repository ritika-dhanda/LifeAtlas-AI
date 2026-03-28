import { useState } from "react";
import API from "../services/api";

function EntryForm({ refresh }) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Learning");

  const addEntry = async () => {

    if (!title.trim()) return;

    const token = localStorage.getItem("token");

    await API.post(
      "/entries",
      {
        title,
        category
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setTitle("");
    setCategory("Learning");

    if (refresh) refresh();

  };

  return (

    <div className="bg-white p-4 rounded shadow mb-6">

      <h3 className="text-lg font-semibold mb-4">
        Add New Activity
      </h3>

      <div className="flex gap-3">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you do today?"
          className="border p-2 rounded w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >

          <option value="Learning">Learning</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Personal">Personal</option>

        </select>

        <button
          onClick={addEntry}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>

      </div>

    </div>

  );
}

export default EntryForm;