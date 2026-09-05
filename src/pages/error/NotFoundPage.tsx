import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black select-none">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/error-bg.jpg')",
        }}
      />

      <div className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/5 text-3xl font-bold text-white shadow-2xl backdrop-blur-xl">
            404
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Page not found
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Looks like you're lost.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/50 sm:text-base">
            The page you're looking for doesn't exist or may have been moved
            somewhere else.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90 active:scale-[0.98]"
            >
              <Home size={17} />
              Back to home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <ArrowLeft size={17} />
              Go back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
