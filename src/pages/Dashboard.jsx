import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome, {user?.name || user?.email}!
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
