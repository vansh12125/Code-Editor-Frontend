import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const LoginPage = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden select-none">

      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      <div className="fixed inset-0 -z-10 bg-black/40" />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]" />

      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-4 pb-6 pt-24 sm:px-6">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

          <div className="hidden flex-col justify-between p-8 text-white lg:flex xl:p-10">

            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              CodeSpace
            </Link>

            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                Your workspace
              </p>

              <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Your code.
                <br />
                Your projects.
                <br />
                Anywhere.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 xl:text-base">
                Continue building your projects in a powerful online
                development environment designed to keep you focused.
              </p>
            </div>

            <p className="text-sm text-white/40">
              Write · Run · Build
            </p>

          </div>

          <div className="flex items-center justify-center bg-white/95 p-6 sm:p-8">

            <div className="w-full max-w-md">

              <div className="mb-6 lg:hidden">
                <Link
                  to="/"
                  className="text-2xl font-bold tracking-tight text-neutral-900"
                >
                  CodeSpace
                </Link>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                  Welcome back
                </h2>

                <p className="mt-1.5 text-sm text-neutral-500">
                  Sign in to continue to your workspace.
                </p>
              </div>

              <form className="mt-6 space-y-4">

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-neutral-800"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-neutral-800"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-neutral-500 transition hover:text-neutral-900"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                  />

                </div>

                <div className="flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-neutral-500"
                  >
                    Remember me
                  </label>

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 active:scale-[0.99]"
                >
                  Sign in
                </button>

              </form>

              <div className="my-5 flex items-center gap-4">

                <div className="h-px flex-1 bg-neutral-200" />

                <span className="text-xs text-neutral-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-neutral-200" />

              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                <span className="font-bold">
                  G
                </span>

                Continue with Google
              </button>

              <p className="mt-5 text-center text-sm text-neutral-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-neutral-900 hover:underline"
                >
                  Create one
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
};

export default LoginPage;