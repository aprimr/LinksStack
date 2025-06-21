import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ID, account } from "../appwrite/config";
import db from "../appwrite/databases";
import useAuthStore from "../store/authStore";
import { useNavigate, NavLink } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      setLoadingButton(false);
      return;
    }

    try {
      const res = await signup(email, password, name);
      if (!res.success) {
        navigate("/");
      }
      setLoadingButton(false);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Signup failed");
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4 font-poppins">
      <div className="w-full h-full sm:h-auto sm:max-w-md sm:p-10 p-4 bg-transparent sm:bg-white dark:sm:bg-white/5 text-white sm:text-gray-900 dark:sm:text-white sm:backdrop-blur-md sm:border sm:border-white/10 sm:shadow-xl sm:rounded-2xl space-y-6 flex flex-col justify-center">
        {/* Branding */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1">
            Create an Account
          </h1>
          <p className="text-sm text-gray-300">
            Please enter your details to sign up.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 bg-white/80 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            {loadingButton ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-400 pt-2">
          <span>Already have an account? </span>
          <NavLink to="/login" className="hover:underline text-blue-500">
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
