import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden select-none">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.35)_100%)]" />

      <div className="fixed inset-0 -z-10 bg-black/10" />

      <section className="relative flex min-h-screen items-center justify-center px-5 py-24 text-center">
        <div className="flex max-w-4xl flex-col items-center">
          <div className="mb-6 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md sm:px-5 sm:text-base">
            ⚡ Code from anywhere
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl">
            Write.
            <br className="sm:hidden" />
            Run.
            <br className="hidden sm:block" />
            Build.
          </h1>

          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/90 drop-shadow-md sm:text-lg md:text-xl">
            A powerful online IDE to write, run, and manage your projects
            directly from your browser.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to={"/signup"}
              className="w-full rounded-xl bg-white px-7 py-3.5 font-semibold text-black shadow-xl transition hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
            >
              Get Started →
            </Link>
            <button className="w-full rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto">
              Explore IDE
            </button>
          </div>
          <p className="mt-5 text-xs text-white/70 sm:text-sm">
            Code • Execute • Build • Learn
          </p>
        </div>

        <button
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          className={`
            fixed bottom-8 left-1/2 z-20
            -translate-x-1/2
            rounded-full
            border border-white/10
            bg-black/25
            px-6 py-3
            text-[10px]
            font-semibold
            tracking-[0.35em]
            text-white/70
            backdrop-blur-md
            transition-all duration-500
            hover:bg-black/40
            hover:text-white
            ${
              showScroll
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
            }
          `}
        >
          SCROLL ↓
        </button>
      </section>

      <section
        className="min-h-screen px-5 py-24 sm:px-8 lg:px-16"
        id="features"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Everything you need
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Your development environment, wherever you are.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Write code, manage projects, and execute programs without worrying
              about local setup.
            </p>
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-black/20 p-7 text-white backdrop-blur-md">
              <div className="text-3xl">⌨️</div>
              <h3 className="mt-5 text-xl font-semibold">Powerful Editor</h3>
              <p className="mt-3 text-white/60">
                Write and organize your code inside a modern browser-based
                editor.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-black/20 p-7 text-white backdrop-blur-md">
              <div className="text-3xl">⚡</div>
              <h3 className="mt-5 text-xl font-semibold">Instant Execution</h3>
              <p className="mt-3 text-white/60">
                Run your programs and receive output directly inside your
                development environment.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-black/20 p-7 text-white backdrop-blur-md">
              <div className="text-3xl">📁</div>
              <h3 className="mt-5 text-xl font-semibold">Project Management</h3>
              <p className="mt-3 text-white/60">
                Keep your projects organized and accessible from a single
                workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-24 text-center">
        <div className="max-w-3xl text-white">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Start building today.
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Your next project is just a few lines of code away.
          </p>
          <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90">
            Create Your Project →
          </button>
        </div>
      </section>
    </main>
  );
};
export default Home;
