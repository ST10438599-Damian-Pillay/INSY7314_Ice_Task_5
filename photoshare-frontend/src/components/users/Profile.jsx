import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUser } from "../../utils/isLoggedIn";

export default function Profile() {
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const load = async () => {
    try {
      const { data } = await api.get("/users/me");
      setForm({ username: data.username || "", email: data.email || "" });
    } catch (e) {
      setError(e.response?.data?.message || "Could not load profile.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const { data } = await api.put("/users/me", form);
      localStorage.setItem(
        "photoshare_user",
        JSON.stringify({
          ...getUser(),
          username: data.username,
          email: data.email,
        }),
      );
      setMessage("Profile updated successfully.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };
  if (loading)
    return (
      <div className="p-8 text-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  return (
    <main className="page-shell container mx-auto p-4 md:p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My profile</h1>
        <p className="text-base-content/60">
          View and update your account details.
        </p>
      </div>
      <div className="card bg-base-100 shadow-sm border border-base-200">
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
            <label className="form-control">
              <span className="label-text mb-1">Username</span>
              <input
                required
                className="input input-bordered"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </label>
            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <input
                required
                type="email"
                className="input input-bordered"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <div className="md:col-span-2 flex justify-end">
              <button disabled={saving} className="btn btn-primary">
                {saving ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
