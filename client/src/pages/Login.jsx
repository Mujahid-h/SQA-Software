import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await login(formData);
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-screen font-sans text-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full sm:max-w-screen-sm md:max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black sm:text-5xl">Sign in</h1>
        </div>
        <form
          className="shadow-lg rounded-lg border border-gray-100 p-8 bg-white"
          onSubmit={handleLogin}
        >
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:ring-blue-500 focus:ring outline-none"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:ring-blue-500 focus:ring outline-none"
              id="password"
              type="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              className={`rounded bg-blue-600 py-2 px-8 text-lg font-bold text-white hover:bg-blue-700 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
