import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import type { LoginUserRequest } from "@/interfaces";
import {
  LoginUser,
  GetUserProfile,
  LoginUserByGoogle,
} from "@/service/authService";
import { validateLogin } from "@/service";
import { useAuth } from "@/hooks";
import { login } from "@/redux/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { dispatch } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    responseError?: string;
  }>({});
  const navigate: NavigateFunction = useNavigate();

  const handleFormSubmit = async () => {
    const validationErrors = validateLogin(username, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const response = await LoginUser({
      username,
      password,
    } as LoginUserRequest);

    if (!response.success) {
      setErrors({
        responseError: response.errors ?? "Something went wrong",
      });

      return;
    } else if (response.success) {
      const userResponse = await GetUserProfile();

      if (userResponse.success && userResponse.data != null) {
        dispatch(
          login({
            user: userResponse.data,
          }),
        );

        navigate("/dashboard");
      }
    }
  };

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

      <div className="flex min-h-screen items-center justify-center px-4 pb-6 pt-24 sm:px-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden flex-col justify-between p-8 text-white lg:flex xl:p-10">
            <Link to="/" className="text-2xl font-bold tracking-tight">
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
                Continue building your projects in a powerful online development
                environment designed to keep you focused.
              </p>
            </div>

            <p className="text-sm text-white/40">Write · Run · Build</p>
          </div>

          <div className="flex items-center justify-center border-t border-white/10 p-6 sm:p-8  lg:border-t-0">
            <div className="w-full max-w-md">
              <div className="mb-6 lg:hidden">
                <Link
                  to="/"
                  className="text-2xl font-bold tracking-tight text-white"
                >
                  CodeSpace
                </Link>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>

                <p className="mt-1.5 text-sm text-white/60">
                  Sign in to continue to your workspace.
                </p>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit();
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="mb-1.5 block text-sm font-medium text-white/80"
                  >
                    Username
                  </label>
                  {errors.username && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.username}
                    </p>
                  )}

                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                  />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-white/80"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-white/60 transition hover:text-white"
                    >
                      Forgot password?
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.password}
                    </p>
                  )}

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-white/60 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeClosed size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-white"
                  />

                  <label htmlFor="remember" className="text-sm text-white/60">
                    Remember me
                  </label>
                </div>

                {errors.responseError && (
                  <p className="text-sm text-red-400 text-center">
                    {errors.responseError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition hover:bg-white/90 active:scale-[0.99]"
                >
                  Sign in
                </button>
              </form>

              <div className="my-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-white/40">OR CONTINUE WITH</span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="flex gap-2 flex-col md:flex-row">
                <button
                  type="button"
                  className="flex w-full md:w-1/2 items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  onClick={LoginUserByGoogle}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="flex  w-full md:w-1/2 items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  onClick={LoginUserByGoogle}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48V21.128c0-.236-.009-.866-.014-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    />
                  </svg>
                  Continue with Github
                </button>
              </div>

              <p className="mt-5 text-center text-sm text-white/60">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-white hover:underline"
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
