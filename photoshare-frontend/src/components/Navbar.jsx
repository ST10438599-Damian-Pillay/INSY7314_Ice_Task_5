import { Link, NavLink, useNavigate } from "react-router";
import { clearSession, getUser, isLoggedIn } from "../utils/isLoggedIn";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();
  const linkClass = ({ isActive }) =>
    `btn btn-ghost btn-sm ${isActive ? "bg-base-200" : ""}`;
  const logout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link
            to={loggedIn ? "/gallery" : "/login"}
            className="text-xl font-extrabold tracking-tight"
          >
            Photo<span className="text-primary">Share</span>
          </Link>
        </div>
        {loggedIn ? (
          <div className="flex items-center gap-1">
            <NavLink to="/gallery" className={linkClass}>
              Gallery
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/users" className={linkClass}>
                Users
              </NavLink>
            )}
            <span className="hidden sm:inline text-sm text-base-content/60 px-2">
              {user?.username}
            </span>
            <button className="btn btn-primary btn-sm" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
