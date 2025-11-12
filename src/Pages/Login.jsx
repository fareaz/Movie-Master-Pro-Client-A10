import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogIn = (event) => {
    event.preventDefault();
    setError("");

    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        event.target.reset();

        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Login error:", err);
        const msg =
          (err, "No account found. Please check your email or password./");
        toast.error(msg);
        setError(msg);
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
            toast.success("Login successful!");
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        console.error("Google sign-in error:", err);
        const msg = err?.message || "Google sign-in failed";
        setError(msg);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword((s) => !s);
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-red-600">Login Now</h3>
        </div>

        <div className="glass-card w-full max-w-sm shrink-0 shadow-xl rounded-xl backdrop-blur-xl">
          <div className="card-body">
            <form onSubmit={handleLogIn}>
              <fieldset className="fieldset">
                <label className="block font-semibold text-red-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="input w-full text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  ref={emailRef}
                  placeholder="Email"
                  required
                />

                <label className="block font-semibold text-red-700 mt-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 w-full"
                    placeholder="Password"
                    required
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    type="button"
                    aria-label="Toggle password visibility"
                    aria-pressed={showPassword}
                    className="btn-xs border-0 top-3.5 right-3 absolute text-gray-300 hover:text-red-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-2">
                  <button
                    type="button"
                    className="link link-hover block font-semibold text-red-700 hover:text-red-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full btn border-none hover:opacity-90 bg-gradient-to-r from-[#e11414] to-[#e13333] text-white font-bold"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center border justify-center gap-3 bg-transparent border-red-700 px-5 py-2 btn w-full font-semibold hover:bg-red-500/10 transition-colors cursor-pointer my-2"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              </fieldset>

              <p className="mt-2">
                New to our Website? Please{" "}
                <Link className="text-red-700 underline" to="/register">
                  Signup
                </Link>
              </p>
            </form>

            {error && <p className="text-red-700 mt-2 max-w-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
