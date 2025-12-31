import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const logout = () => {
    window.location.href = "http://localhost:5000/api/auth/logout";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px 70px",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        {!user ? (
          <>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
              Welcome Back
            </h1>
            <button
              onClick={login}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "0 auto",
                padding: "14px 32px",
                fontSize: "18px",
                background: "white",
                border: "2px solid #ddd",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="https://www.google.com/favicon.ico"
                width="24"
                alt="G"
              />
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <img
              src={user.photo}
              alt="avatar"
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            />
            <h2>Hello, {user.displayName}!</h2>
            <p style={{ color: "#666" }}>{user.email}</p>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              <a
                href="/dashboard"
                style={{
                  padding: "10px 20px",
                  background: "#4285f4",
                  color: "white",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Go to Dashboard
              </a>
              <button
                onClick={logout}
                style={{
                  padding: "10px 20px",
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
