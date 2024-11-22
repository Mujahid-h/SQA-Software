import React, { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const response = await signup(formData);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-screen font-sans text-gray-900">
      <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="mx-2 py-12 text-center md:mx-auto md:w-2/3 md:py-20">
          <h1 className="text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
            Sign up
          </h1>
        </div>
      </div>
      <div className="md:w-2/3 mx-auto w-full pb-16 lg:w-1/3">
        <form
          className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8"
          onSubmit={handleSignup}
        >
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
              id="phone"
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
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
              {isSubmitting ? "Signing up..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
