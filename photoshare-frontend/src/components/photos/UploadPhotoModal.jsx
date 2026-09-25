import { useEffect, useRef, useState } from "react";

export default function UploadPhotoModal({ open, onClose, onSubmit, photo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (open) {
      setTitle(photo?.title || "");
      setDescription(photo?.description || "");
      setFile(null);
      setError("");
      dialogRef.current?.showModal();
    } else if (dialogRef.current?.open) dialogRef.current.close();
  }, [open, photo]);
  const close = () => {
    if (!saving) {
      dialogRef.current?.close();
      onClose();
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!photo && !file) {
      setError("Please choose an image.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({ title, description, file });
      dialogRef.current?.close();
      onClose();
    } catch (e) {
      setError(
        e.response?.data?.message || e.message || "Could not save photo.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box max-w-lg">
        <button
          onClick={close}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-xl mb-1">
          {photo ? "Update photo" : "Upload photo"}
        </h3>
        <p className="text-sm text-base-content/60 mb-5">
          {photo
            ? "Update the details or replace the image."
            : "Add a new photo to your gallery."}
        </p>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <label className="form-control">
            <span className="label-text mb-1">Title</span>
            <input
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">Description</span>
            <textarea
              className="textarea textarea-bordered min-h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span className="label-text mb-1">
              Image{" "}
              {photo && (
                <span className="text-base-content/50">
                  (optional when updating)
                </span>
              )}
            </span>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <span className="text-xs text-base-content/50 mt-1">
              Images only, maximum 5 MB.
            </span>
          </label>
          <div className="modal-action">
            <button type="button" className="btn" onClick={close}>
              Cancel
            </button>
            <button disabled={saving} className="btn btn-primary">
              {saving ? (
                <span className="loading loading-spinner" />
              ) : photo ? (
                "Update photo"
              ) : (
                "Upload photo"
              )}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={close}>close</button>
      </form>
    </dialog>
  );
}
