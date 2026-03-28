import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);

    } catch (error) {

      console.error("Failed to load user", error);

    }

  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (

    <div className="max-w-lg bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Profile
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p className="text-sm text-gray-500">
          Account created:
          {" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>

  );

}

export default Profile;