import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError("Password must include uppercase and lowercase(min 6 chars).");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        return updateUserProfile(displayName, photoURL)
          .then(() => {
            const newUser = {
              name: displayName || user.displayName || "",
              email: user.email,
              photoURL: photoURL || user.photoURL || "",
            };
            return axios.post(
              "https://movie-master-server-theta.vercel.app/users",
              newUser
            );
          })
          .then(() => {
            toast.success("User created successfully!", { id: "create-user" });
            setSuccess(true);
            setError("");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setError(error.message || "Registration failed");
        setSuccess(false);
        toast.error(error.message || "Registration failed", {
          id: "create-user",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        axios
          .post("https://movie-master-server-theta.vercel.app/users", newUser)
          .then(() => {
            toast.success("Signin successful");
            navigate(location?.state || "/");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero bg-transparent min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-red-600">Register Now!</h1>
        </div>

        <div className="card rounded-xl glass-card w-full max-w-sm shrink-0 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="block font-semibold text-red-700">Name</label>
                <input
                  type="text"
                  name="displayName"
                  className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 w-full"
                  placeholder="Your Name"
                  required
                />

                <label className="block font-semibold text-red-700">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 w-full"
                  placeholder="Photo URL"
                />

                <label className="block font-semibold text-red-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 w-full"
                  placeholder="Email Address"
                  required
                />

                <label className="block font-semibold text-red-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input text-gray-600  rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 w-full"
                    placeholder="Password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn-xs border-0 top-4 right-3 absolute"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full btn border-none hover:opacity-90 bg-gradient-to-r from-[#e11414] to-[#e13333] text-white font-bold"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center border justify-center gap-3 bg-transparent border-red-700  px-5 py-2 btn w-full font-semibold hover:bg-red-500/10 transition-colors cursor-pointer my-2"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                {success && (
                  <p className="text-red-600 text-center mt-2 max-w-70">
                    Account created successfully. Please verify your email.
                  </p>
                )}
                {error && (
                  <p className="text-red-500 text-center mt-2 max-w-70">
                    {error}
                  </p>
                )}
              </fieldset>
            </form>

            <p className=" text-center">
              Already have an account?{" "}
              <Link className="text-red-700 underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
