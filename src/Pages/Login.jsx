import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();

  const {
    signInUser,
    signInWithGoogle,
    
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from || "/";

//  const handleLogin = (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;
//   setError("");
//   setLoading(true);
//   userLogin(email, password)
//     .then((result) => {
//       const user = result.user;
//       user
//         .reload()
//         .then(() => {
//           if (!user.emailVerified) {
//             toast.warn("Please verify your email before logging in.");
//             setError("Your email is not verified. ");
//             if (typeof result.user?.auth?.signOut === "function") {
//               result.user.auth.signOut();
//             }
//             setLoading(false);
//             return;
//           }

//           toast.success("Login successful!");
//           navigate(from, { replace: true });
//         })
       
//     })
//     .catch(() => {

//       setError("Please check your email and password and try again. If you don't have an account, please sign up.");
//       toast.error("Please check your email and password and try again. If you don't have an account, please sign up.");
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };
  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
        event.target.reset();
        navigate(location.state || "/");

      })
      .catch((error) => {
        console.log(error);
      });
  };
    const handleGoogleSignIn = () => {
     signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTogglePasswordShow = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
   <div className="hero  min-h-screen ">
  <div className="hero-content flex-col">
    <div className="text-center">
      <h3 className="text-4xl font-bold text-red-600">Login Now</h3>
    </div>

    <div className=" glass-card w-full max-w-sm shrink-0 shadow-xl rounded-xl backdrop-blur-xl">
      <div className="card-body">
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset ">
          
            <label  className="block font-semibold text-red-700 ">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              ref={emailRef}
              placeholder="Email"
              required
            />

            <label className="block font-semibold text-red-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
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

     
            <div>
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
              className="flex items-center border justify-center gap-3 bg-transparent border-red-700  px-5 py-2 btn w-full font-semibold hover:bg-red-500/10 transition-colors cursor-pointer my-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </fieldset>

          <p className="mt-2 ">
            New to our Website? Please{' '}
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
