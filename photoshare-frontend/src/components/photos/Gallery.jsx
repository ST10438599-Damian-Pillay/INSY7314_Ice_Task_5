import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import { getUser } from "../../utils/isLoggedIn";
import UploadPhotoModal from "./UploadPhotoModal";

export default function Gallery() {
  const user = getUser();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState("");
  const load = async () => {
    try {
      const { data } = await api.get("/photos");
      setPhotos(data);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load gallery.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const mine = useMemo(
    () => photos.filter((p) => p.owner?._id === user?._id),
    [photos, user?._id],
  );
  const save = async ({ title, description, file }) => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (file) data.append("image", file);
    if (editing) {
      await api.put(`/photos/${editing._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/photos", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    await load();
  };
  const deletePhoto = async (photo) => {
    if (!confirm(`Delete “${photo.title}”?`)) return;
    setBusy(photo._id);
    setError("");
    try {
      await api.delete(`/photos/${photo._id}`);
      setPhotos((prev) => prev.filter((p) => p._id !== photo._id));
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete photo.");
    } finally {
      setBusy("");
    }
  };
  const canEdit = (p) => p.owner?._id === user?._id || user?.role === "admin";
  return (
    <main className="page-shell container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <p className="text-primary font-semibold">Your photo space</p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Photo gallery
          </h1>
          <p className="text-base-content/60 mt-1">
            View, upload, update and delete photos.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          ＋ Upload photo
        </button>
      </div>
      {error && <div className="alert alert-error mb-5">{error}</div>}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-72 rounded-2xl" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="hero bg-base-100 rounded-3xl border border-dashed border-base-300 min-h-80">
          <div className="hero-content text-center">
            <div>
              <div className="text-6xl mb-3">🖼️</div>
              <h2 className="text-2xl font-bold">Your gallery is empty</h2>
              <p className="text-base-content/60 mb-5">
                Upload your first photo to get started.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
              >
                Upload a photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {photos.map((photo) => (
            <article
              key={photo._id}
              className="photo-card card bg-base-100 border border-base-200 shadow-sm overflow-hidden"
            >
              <figure className="aspect-[4/3] bg-base-200">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-lg line-clamp-1">
                    {photo.title}
                  </h2>
                  {photo.owner?.username === user?.username && (
                    <span className="badge badge-primary badge-sm">Mine</span>
                  )}
                </div>
                {photo.description && (
                  <p className="text-sm text-base-content/65 line-clamp-2 min-h-10">
                    {photo.description}
                  </p>
                )}
                <p className="text-xs text-base-content/45">
                  By {photo.owner?.username || "Unknown"}
                </p>
                {canEdit(photo) && (
                  <div className="card-actions justify-end mt-1">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setEditing(photo);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      disabled={busy === photo._id}
                      className="btn btn-sm btn-error btn-outline"
                      onClick={() => deletePhoto(photo)}
                    >
                      {busy === photo._id ? "…" : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      <UploadPhotoModal
        open={modalOpen}
        photo={editing}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={save}
      />
      <div className="mt-8 text-sm text-base-content/50">
        Showing {photos.length} photo{photos.length === 1 ? "" : "s"} ·{" "}
        {mine.length} uploaded by you
      </div>
    </main>
  );
}
