// import React, { useState } from "react";
// import { login } from "../api/authApi";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setToken, setUser } from "../redux/slices/userSlice";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError("");
//     try {
//       const response = await login(formData);
//       dispatch(setToken(response.token));
//       dispatch(setUser(response.user));
//       navigate("/");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white w-screen font-sans text-gray-900 min-h-screen flex items-center justify-center">
//       <div className="w-full sm:max-w-screen-sm md:max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-black sm:text-5xl">Sign in</h1>
//         </div>
//         <form
//           className="shadow-lg rounded-lg border border-gray-100 p-8 bg-white"
//           onSubmit={handleLogin}
//         >
//           {error && (
//             <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div className="mb-6">
//             <label className="block text-sm font-bold mb-2" htmlFor="email">
//               E-mail
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:ring-blue-500 focus:ring outline-none"
//               id="email"
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 focus:ring-blue-500 focus:ring outline-none"
//               id="password"
//               type="password"
//               placeholder="*********"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               className={`rounded bg-blue-600 py-2 px-8 text-lg font-bold text-white hover:bg-blue-700 transition ${
//                 isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               type="submit"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Logging in..." : "Login"}
//             </button>
//           </div>
//           <div className="flex  items-center mt-10">
//             <p>Dont have an Account?</p>
//             <Link
//               to={"/signup"}
//               className="rounded ml-2 text-md font-bold text-blue-600 hover:text-blue-700 hover:underline"
//             >
//               Create Account
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/userSlice";
import { Mail, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-2xl p-10 transition-all duration-300 hover:shadow-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <svg
                className="w-6 h-6 mr-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 py-3"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 py-3"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
