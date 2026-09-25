import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../utils/api";
import { saveSession } from "../../utils/isLoggedIn";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      saveSession(data.token, data.user);
      navigate("/gallery", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-shell auth-bg flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body">
          <div className="text-center mb-2">
            <div className="text-4xl mb-2">✨</div>
            <h1 className="text-3xl font-bold">Create account</h1>
            <p className="text-base-content/60">Start sharing your photos.</p>
          </div>
          {error && <div className="alert alert-error mb-2">{error}</div>}
          <form onSubmit={submit} className="space-y-3">
            <label className="form-control">
              <span className="label-text mb-1">Username</span>
              <input
                required
                className="input input-bordered w-full"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </label>
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
                minLength={6}
                type="password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Confirm password</span>
              <input
                required
                type="password"
                className="input input-bordered w-full"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </label>
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? (
                <span className="loading loading-spinner" />
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <p className="text-center text-sm mt-3">
            Already registered?{" "}
            <Link className="link link-primary" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
