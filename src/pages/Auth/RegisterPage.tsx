import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      <div className="flex min-h-screen items-center justify-center px-4 pb-5 pt-24 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden flex-col justify-between p-8 text-white lg:flex xl:p-9">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              CodeSpace
            </Link>

            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                Start building
              </p>

              <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Turn your ideas
                <br />
                into working
                <br />
                projects.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 xl:text-base">
                Create your workspace, choose your language, and start building
                without worrying about local setup.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/40">
              <span>Code</span>
              <span>·</span>
              <span>Run</span>
              <span>·</span>
              <span>Build</span>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white/95 p-5 sm:p-7">
            <div className="w-full max-w-md">
              <div className="mb-5 lg:hidden">
                <Link
                  to="/"
                  className="text-2xl font-bold tracking-tight text-neutral-900"
                >
                  CodeSpace
                </Link>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                  Create your account
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Set up your workspace and start coding.
                </p>
              </div>

              <form className="mt-5 space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-neutral-800"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="mb-1.5 block text-sm font-medium text-neutral-800"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

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
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-neutral-800"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 pr-20 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 hover:text-neutral-900"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-medium text-neutral-800"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 pr-20 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 hover:text-neutral-900"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-relaxed text-neutral-500"
                  >
                    I agree to the terms of service and privacy policy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 active:scale-[0.99]"
                >
                  Create account
                </button>
              </form>

              <div className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-neutral-200" />

                <span className="text-xs text-neutral-400">OR</span>

                <div className="h-px flex-1 bg-neutral-200" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                <span className="font-bold">G</span>
                Sign up with Google
              </button>

              <p className="mt-4 text-center text-sm text-neutral-500">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-neutral-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
