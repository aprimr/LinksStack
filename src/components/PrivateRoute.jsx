import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  return user ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
