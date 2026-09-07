import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { validateRegister } from "@/service/";
import { RegisterUserByUsername } from "@/service/authService";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    responseError?: string;
  }>({});
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const validationErrors = validateRegister(
      name,
      username,
      email,
      password,
      confirmPassword,
      terms,
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccess("");
    setLoading(true);

    try {
      const response = await RegisterUserByUsername({
        name,
        username,
        email,
        password,
      });

      if (!response.success) {
        setErrors({
          responseError: response.errors ?? "Something went wrong",
        });

        return;
      }
      setSuccess("Registered Successfully. Redirecting to sign in...");
      setTimeout(() => {
        navigate(`/signin`);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-y-auto select-none">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      <div className="fixed inset-0 -z-10 bg-black/40" />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.45)_100%)]" />

      <div className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 sm:py-20 mt-2">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black/25 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          <div className="hidden flex-col justify-between p-6 text-white lg:flex xl:p-8">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              CodeSpace
            </Link>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-white/50">
                Start building
              </p>

              <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
                Turn your ideas
                <br />
                into working
                <br />
                projects.
              </h1>

              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/65 xl:text-sm">
                Create your workspace, choose your language, and start building
                without worrying about local setup.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/40">
              <span>Code</span>
              <span>·</span>
              <span>Run</span>
              <span>·</span>
              <span>Build</span>
            </div>
          </div>

          <div className="flex items-center justify-center border-t border-white/10 p-5 sm:p-6 lg:border-t-0">
            <div className="w-full max-w-md">
              <div className="mb-4 lg:hidden">
                <Link
                  to="/"
                  className="text-xl font-bold tracking-tight text-white"
                >
                  CodeSpace
                </Link>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Create your account
                </h2>

                <p className="mt-0.5 text-xs text-white/60">
                  Set up your workspace and start coding.
                </p>
              </div>

              <form
                className="mt-4 space-y-2.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs font-medium text-white/80"
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p className="mb-1 text-[11px] text-red-400">
                      {errors.name}
                    </p>
                  )}

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                        responseError: undefined,
                      }));
                    }}
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="mb-1 block text-xs font-medium text-white/80"
                  >
                    Username
                  </label>
                  {errors.username && (
                    <p className="mb-1 text-[11px] text-red-400">
                      {errors.username}
                    </p>
                  )}

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        username: undefined,
                        responseError: undefined,
                      }));
                    }}
                    placeholder="Choose a username"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs font-medium text-white/80"
                  >
                    Email
                  </label>
                  {errors.email && (
                    <p className="mb-1 text-[11px] text-red-400">
                      {errors.email}
                    </p>
                  )}

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        email: undefined,
                        responseError: undefined,
                      }));
                    }}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs font-medium text-white/80"
                  >
                    Password
                  </label>
                  {errors.password && (
                    <p className="mb-1 text-[11px] text-red-400">
                      {errors.password}
                    </p>
                  )}

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          password: undefined,
                          confirmPassword: undefined,
                          responseError: undefined,
                        }));
                      }}
                      placeholder="Create a password"
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 pr-10 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeClosed size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-xs font-medium text-white/80"
                  >
                    Confirm password
                  </label>
                  {errors.confirmPassword && (
                    <p className="mb-1 text-[11px] text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}

                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                          responseError: undefined,
                        }));
                      }}
                      className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 pr-10 text-xs text-white outline-none transition placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:ring-1 focus:ring-white/20 autofill:[transition:background-color_5000000s_ease-in-out_0s] autofill:[-webkit-text-fill-color:white]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeClosed size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-0.5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      setErrors((prev) => ({
                        ...prev,
                        terms: undefined,
                        responseError: undefined,
                      }));
                    }}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-white"
                  />

                  <label
                    htmlFor="terms"
                    className="text-[11px] leading-snug text-white/60"
                  >
                    {errors.terms && (
                      <p className="mb-0.5 text-[11px] text-red-400">
                        {errors.terms}
                      </p>
                    )}
                    I agree to the terms of service and privacy policy.
                  </label>
                </div>

                {errors.responseError && (
                  <p className="text-center text-xs text-red-400">
                    {errors.responseError}
                  </p>
                )}
                {success && (
                  <p className="text-center text-xs text-green-400">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 shadow-lg transition hover:bg-white/90 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              <div className="my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[11px] text-white/40">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
              >
                <span className="font-bold">G</span>
                Sign up with Google
              </button>

              <p className="mt-3 text-center text-xs text-white/60">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-white hover:underline"
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
