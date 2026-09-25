import { useEffect } from "react";
import { useNavigate } from "react-router";
import { clearSession } from "../../utils/isLoggedIn";
export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    clearSession();
    navigate("/login", { replace: true });
  }, [navigate]);
  return <div className="p-8 text-center">Signing out…</div>;
}
