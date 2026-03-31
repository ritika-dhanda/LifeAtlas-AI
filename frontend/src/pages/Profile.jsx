import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [user, setUser] = useState(null);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {

    return (

      <div className="p-8">
        <h2 className="text-xl">Loading profile...</h2>
      </div>

    );

  }

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-4">
        Profile
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">

        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>

  );

}

export default Profile;
