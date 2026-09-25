import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import api from "../../utils/api";
import { saveSession } from "../../utils/isLoggedIn";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      saveSession(data.token, data.user);
      navigate(location.state?.from || "/gallery", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-shell auth-bg flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <div className="text-center mb-2">
            <div className="text-4xl mb-2">📷</div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-base-content/60">
              Sign in to your PhotoShare account.
            </p>
          </div>
          {error && <div className="alert alert-error mb-2">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <input
                required
                type="email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Password</span>
              <input
                required
                type="password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? <span className="loading loading-spinner" /> : "Login"}
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            Don't have an account?{" "}
            <Link className="link link-primary" to="/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
