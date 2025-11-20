import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });

        setUser(res.data.data.user);
        console.log("res", res.data.data.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg border border-gray-200 rounded-2xl p-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">You are logged in ✔</p>

        {user ? (
          <div className="flex flex-col items-center">
            {/* <img
              src={user.photo}
              alt="profile"
              className="w-28 h-28 rounded-full shadow-md mb-4"
            /> */}

            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            <button
              onClick={() => {
                axios
                  .get("/api/auth/logout", { withCredentials: true })
                  .then(() => {
                    window.location.href = "/login";
                  });
              }}
              className="mt-8 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg transition font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading user info...</p>
        )}

        <a
          href="/"
          className="block mt-8 text-gray-600 hover:text-gray-800 underline text-sm"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
