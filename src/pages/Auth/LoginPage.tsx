import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import type{ NavigateFunction} from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import type { LoginUserRequest } from "@/interfaces";
import { LoginUser, GetUserProfile } from "@/service/authService";
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
  const navigate:NavigateFunction=useNavigate();

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

      if (userResponse.success) {
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

                <span className="text-xs text-white/40">OR</span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <span className="font-bold">G</span>
                Continue with Google
              </button>

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
