import { Link } from "react-router";
export default function Home() {
  return (
    <main className="page-shell auth-bg">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-5">📸</div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">
          Share moments.
          <br />
          <span className="text-primary">Keep memories.</span>
        </h1>
        <p className="max-w-xl mx-auto mt-5 text-lg text-base-content/60">
          A simple place to upload, manage and browse your photo collection.
        </p>
        <div className="flex justify-center gap-3 mt-8">
          <Link className="btn btn-primary" to="/register">
            Get started
          </Link>
          <Link className="btn btn-outline" to="/login">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
