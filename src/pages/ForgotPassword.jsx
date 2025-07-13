import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Info, Loader2 } from "lucide-react";
import { account } from "../appwrite/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
    setMessage("");

    if (!email) {
      setMessage("Please enter your email");
      setLoadingButton(false);
      return;
    }

    try {
      await account.createRecovery(
        email,
        `${import.meta.env.VITE_FRONTEND_URL}/reset-password`
      );
      setMessage("Password reset link sent to your email");
      setEmail("");
      setLoadingButton(false);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 font-poppins">
      <div className="w-full max-w-md p-6 sm:p-10 bg-transparent sm:bg-white/5 text-white sm:backdrop-blur-md sm:border sm:border-white/10 sm:shadow-xl sm:rounded-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-300">
            Enter your email to receive reset instructions.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loadingButton}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-md transition-all"
          >
            {loadingButton ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {message && (
            <div className="w-full flex items-center gap-2 border border-gray-600 rounded-md bg-gray-400/20 text-gray-200 px-4 py-2 mt-2">
              <Info className="w-4 h-4 text-gray-300" />
              <p className="text-xs">{message}</p>
            </div>
          )}
        </form>

        {/* Back to Login */}
        <div className="text-center pt-2">
          <NavLink
            to="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
