import { Navigate, Outlet, useLocation } from "react-router";
import { isLoggedIn } from "./isLoggedIn";

export default function ProtectedRoute({ adminOnly = false }) {
  const location = useLocation();
  if (!isLoggedIn())
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (adminOnly) {
    try {
      const user = JSON.parse(
        localStorage.getItem("photoshare_user") || "null",
      );
      if (user?.role !== "admin") return <Navigate to="/gallery" replace />;
    } catch {
      return <Navigate to="/gallery" replace />;
    }
  }
  return <Outlet />;
}
