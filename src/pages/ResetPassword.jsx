import { useEffect, useState } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { Loader2, Lock, Eye, EyeClosed, Info } from "lucide-react";
import { account } from "../appwrite/config";
import { toast } from "sonner";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const expires = searchParams.get("expire");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId || !secret || !expires) {
      toast.error("Invalid reset link.");
      navigate("/");
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoadingButton(true);

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setLoadingButton(false);
      return;
    }

    try {
      await account.updateRecovery(userId, secret, password, confirm);
      toast.success("Password updated successfully!");
      setMessage("Redirecting to login...");
      setLoadingButton(false);
      setPassword("");
      setConfirm("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Reset error:", err);
      toast.error(err.message || "Something went wrong.");
      setMessage(`${err.message}`);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 font-poppins">
      <div className="w-full max-w-md p-6 sm:p-10 bg-transparent sm:bg-white/5 text-white sm:backdrop-blur-md sm:border sm:border-white/10 sm:shadow-xl sm:rounded-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-gray-300">Set your new password below.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
              >
                {showPassword ? (
                  <EyeClosed className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                id="confirm"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
              >
                {showConfirm ? (
                  <EyeClosed className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingButton || !password || !confirm || message}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-md transition-all"
          >
            {loadingButton ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Message */}
          {message && (
            <div className="w-full flex items-center gap-2 border border-blue-500 rounded-md bg-blue-400/20 text-blue-200 px-4 py-2 mt-2">
              <Info className="w-4 h-4 text-blue-300" />
              <p className="text-sm">{message}</p>
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
}

export default ResetPassword;
