import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log("Login failed:", err.response?.data);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        // send code to backend
        const result = await axios.post(
          "http://localhost:5000/api/auth/google",
          { code: authResult.code },
          { withCredentials: true }
        );

        console.log("Google login success:", result.data);

        // redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-1">Sign in to your account</p>
          </div>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.72 1.22 9.22 3.6l6.85-6.85C35.59 2.38 30.17 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.43 17.74 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.98 24.55c0-1.62-.15-3.18-.43-4.68H24v9h13.09c-.57 2.88-2.2 5.32-4.71 6.97l7.43 5.85C43.75 36.79 46.98 30.27 46.98 24.55z"
              />
              <path
                fill="#4A90E2"
                d="M24 48c6.48 0 11.94-2.16 15.92-5.86l-7.43-5.85c-2.01 1.35-4.6 2.14-8.49 2.14-6.26 0-11.57-3.93-13.47-9.52l-7.98 6.2C6.51 42.62 14.62 48 24 48z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.91A14.42 14.42 0 0 1 9.5 24c0-1.72.29-3.38.82-4.91l-7.98-6.2A24.013 24.013 0 0 0 0 24c0 3.87.92 7.52 2.56 10.91l7.97-6z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-3 text-gray-500 text-sm">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused({ ...focused, email: true })}
                onBlur={() => setFocused({ ...focused, email: false })}
                required
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-transparent focus:bg-white focus:border-gray-500 outline-none transition"
                placeholder="Email"
              />
              <label
                className={`absolute left-4 transition-all duration-200 ${
                  focused.email || email
                    ? "-top-2 text-xs text-gray-600 bg-white px-1"
                    : "top-3 text-gray-500"
                }`}
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused({ ...focused, password: true })}
                onBlur={() => setFocused({ ...focused, password: false })}
                required
                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-transparent focus:bg-white focus:border-gray-500 outline-none transition"
                placeholder="Password"
              />
              <label
                className={`absolute left-4 transition-all duration-200 ${
                  focused.password || password
                    ? "-top-2 text-xs text-gray-600 bg-white px-1"
                    : "top-3 text-gray-500"
                }`}
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-gray-900 hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
