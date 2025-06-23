import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/home");
    }
  }, [user, loading]);

  if (loading) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingButton(true);

    if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoadingButton(false);
      return;
    }

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate("/home");
        setLoadingButton(false);
      } else {
        toast.error(res.message);
        setLoadingButton(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed");
      setLoadingButton(false);
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
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300">
            Please enter your credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Forgot Password Link */}
            <div className="text-right mt-1">
              <NavLink
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingButton}
            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            {loadingButton ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center text-sm text-gray-400 pt-2">
          <span>Don't have an account? </span>
          <NavLink to="/signup" className="hover:underline text-blue-500">
            Create one
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
