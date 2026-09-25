import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Profiles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const load = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load users.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const action = async (id, type) => {
    setBusy(`${type}-${id}`);
    setError("");
    try {
      const path = type === "delete" ? `/users/${id}` : `/users/${id}/${type}`;
      if (type === "delete") await api.delete(path);
      else await api.put(path);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Action failed.");
    } finally {
      setBusy("");
    }
  };
  return (
    <main className="page-shell container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User administration</h1>
        <p className="text-base-content/60">
          Manage registered PhotoShare users.
        </p>
      </div>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {loading ? (
        <div className="text-center p-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-200 shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="font-medium">{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`badge ${u.role === "admin" ? "badge-primary" : "badge-ghost"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {u.role === "admin" ? (
                        <button
                          disabled={!!busy}
                          className="btn btn-xs btn-outline"
                          onClick={() => action(u._id, "demote")}
                        >
                          {busy === `demote-${u._id}` ? "…" : "Demote"}
                        </button>
                      ) : (
                        <button
                          disabled={!!busy}
                          className="btn btn-xs btn-outline"
                          onClick={() => action(u._id, "promote")}
                        >
                          {busy === `promote-${u._id}` ? "…" : "Promote"}
                        </button>
                      )}
                      <button
                        disabled={!!busy}
                        className="btn btn-xs btn-error btn-outline"
                        onClick={() => {
                          if (confirm(`Delete ${u.username}?`))
                            action(u._id, "delete");
                        }}
                      >
                        {busy === `delete-${u._id}` ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
