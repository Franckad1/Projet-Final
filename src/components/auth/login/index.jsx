import {
  doSignInWithEmailAndPassword,
  // doSignWithGoogle,
} from "../../..//Providers/authProviders";
import { useState } from "react";
import { useAuth } from "../../../contexts/auth";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password).catch((error) => {
        setIsSigningIn(false);
        setErrorMessage("Vous n'avez pas renseigné les bonnes informations");
      });
    }
  };
  // const onGoogleSignIn = (e) => {
  //   e.preventDefault();
  //   if (!isSigningIn) {
  //     setIsSigningIn(true);
  //     doSignWithGoogle()
  //       .then((result) => {
  //         console.log("Google sign-in success:", result.user);
  //       })
  //       .catch((error) => {
  //         console.error("Google sign-in error:", error.code, error.message);
  //       });
  //   }
  // };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main
        className="min-h-screen flex items-center justify-center npm run dev
 px-4"
      >
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h3>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-600 hover:text-blue-300 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errorMessage && (
              <span className="block text-sm text-red-600">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>

            {/* <p className="text-sm text-gray-600 text-center">
              Don't you have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p> */}

            {/* <button
              type="button"
              disabled={isSigningIn}
              onClick={(e) => onGoogleSignIn(e)}
              className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200 disabled:opacity-50"
            >
              {isSigningIn ? "Signing In..." : "Continue With Google"}
            </button> */}
          </form>
        </div>
      </main>
    </>
  );
};
export default Login;
