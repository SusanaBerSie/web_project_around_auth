import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
