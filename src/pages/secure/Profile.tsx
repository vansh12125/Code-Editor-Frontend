import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AtSign,
  Camera,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks";

interface ProfileErrors {
  name?: string;
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/signin", { replace: true });
      return;
    }
  }, [user, navigate]);

  const [name, setName] = useState(user?.name ?? "");
  const [username, setUsername] = useState(user?.username ?? "");
  const [email] = useState<string>(user?.email ?? "");

  const [showPasswordBox, setShowPasswordBox] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const hasProfileChanges = name !== user?.name || username !== user?.username;

  const hasProfileErrors = Boolean(errors.name) || Boolean(errors.username);

  const validateProfile = (): ProfileErrors => {
    const validationErrors: ProfileErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name cannot be empty";
    }

    if (!username.trim()) {
      validationErrors.username = "Username cannot be empty";
    } else if (username.length < 3 || username.length > 25) {
      validationErrors.username = "Username must be between 3 to 25 characters";
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]{2,24}$/.test(username)) {
      validationErrors.username =
        "Username must start with a letter and contain only letters, numbers, or underscores";
    }

    return validationErrors;
  };

  const validatePassword = (): ProfileErrors => {
    const validationErrors: ProfileErrors = {};

    if (!currentPassword) {
      validationErrors.currentPassword = "Current password cannot be empty";
    } else if (currentPassword.length < 8) {
      validationErrors.currentPassword =
        "Password must be at least 8 characters";
    }

    if (!newPassword) {
      validationErrors.newPassword = "New password cannot be empty";
    } else if (newPassword.length < 8) {
      validationErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm password cannot be empty";
    } else if (confirmPassword.length < 8) {
      validationErrors.confirmPassword =
        "Password must be at least 8 characters";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  const handleSaveProfile = () => {
    const validationErrors = validateProfile();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setName(name.trim());
    setUsername(username.trim());

    setErrors({});
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleChangePassword = () => {
    const validationErrors = validatePassword();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setPasswordChanged(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowPasswordBox(false);

    setTimeout(() => {
      setPasswordChanged(false);
    }, 2000);
  };

  const closePasswordBox = () => {
    setShowPasswordBox(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setErrors({});
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-white">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dashboard-bg.jpg')",
        }}
      />

      <div className="fixed inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-12 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Profile
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/10 backdrop-blur-md">
          <div className="border-b border-white/10 px-5 py-6 sm:px-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-neutral-950">
                  {name.charAt(0).toUpperCase() || "A"}
                </div>

                <button
                  type="button"
                  aria-label="Change profile picture"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white transition hover:bg-neutral-800"
                >
                  <Camera size={13} />
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  {name || "Your name"}
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  @{username || "username"}
                </p>

                <p className="mt-1 text-xs text-white/30">CodeSpace member</p>
              </div>
            </div>
          </div>

          <div className="bg-black/5 p-5 sm:p-7">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white">
                Personal information
              </h3>

              <p className="mt-1 text-xs text-white/40">
                Update the information associated with your account.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium text-white/70"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setSaved(false);
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                    }}
                    className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:bg-white/10 ${
                      errors.name
                        ? "border-red-400/50 focus:border-red-400"
                        : "border-white/10 focus:border-white/25"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-xs font-medium text-white/70"
                >
                  Username
                </label>

                <div className="relative">
                  <AtSign
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setSaved(false);
                      setErrors((prev) => ({
                        ...prev,
                        username: undefined,
                      }));
                    }}
                    className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:bg-white/10 ${
                      errors.username
                        ? "border-red-400/50 focus:border-red-400"
                        : "border-white/10 focus:border-white/25"
                    }`}
                  />
                </div>

                {errors.username && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-white/70"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/3 py-3 pl-10 pr-4 text-sm text-white/40 outline-none"
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-white/25">
                  Email address cannot be changed.
                </p>
              </div>
            </div>

            <div className="my-8 border-t border-white/10" />

            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white">Security</h3>

              <p className="mt-1 text-xs text-white/40">
                Manage your account security.
              </p>
            </div>

            {!showPasswordBox && (
              <button
                type="button"
                onClick={() => {
                  setShowPasswordBox(true);
                  setErrors({});
                  setPasswordChanged(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-left transition hover:border-white/15 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50">
                    <Lock size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/80">
                      Change password
                    </p>

                    <p className="mt-0.5 text-xs text-white/35">
                      Update your account password
                    </p>
                  </div>
                </div>

                <span className="text-xs text-white/40">Change</span>
              </button>
            )}

            {showPasswordBox && (
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Change password
                    </h4>

                    <p className="mt-1 text-xs text-white/40">
                      Enter your current password and choose a new one.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closePasswordBox}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-1.5 block text-xs font-medium text-white/70"
                    >
                      Current password
                    </label>

                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                      />

                      <input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(event) => {
                          setCurrentPassword(event.target.value);
                          setErrors((prev) => ({
                            ...prev,
                            currentPassword: undefined,
                          }));
                        }}
                        className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-11 text-sm text-white outline-none transition focus:bg-white/10 ${
                          errors.currentPassword
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-white/25"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {errors.currentPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-1.5 block text-xs font-medium text-white/70"
                    >
                      New password
                    </label>

                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                      />

                      <input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(event) => {
                          setNewPassword(event.target.value);
                          setErrors((prev) => ({
                            ...prev,
                            newPassword: undefined,
                            confirmPassword: undefined,
                          }));
                        }}
                        className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-11 text-sm text-white outline-none transition focus:bg-white/10 ${
                          errors.newPassword
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-white/25"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        {showNewPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {errors.newPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-xs font-medium text-white/70"
                    >
                      Confirm new password
                    </label>

                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                      />

                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          setErrors((prev) => ({
                            ...prev,
                            confirmPassword: undefined,
                          }));
                        }}
                        className={`w-full rounded-xl border bg-white/5 py-3 pl-10 pr-11 text-sm text-white outline-none transition focus:bg-white/10 ${
                          errors.confirmPassword
                            ? "border-red-400/50 focus:border-red-400"
                            : "border-white/10 focus:border-white/25"
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className="mt-1.5 text-xs text-red-400">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={closePasswordBox}
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99]"
                    >
                      Update password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {passwordChanged && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-300">
                <Check size={14} />
                Password changed successfully.
              </div>
            )}

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={!hasProfileChanges || hasProfileErrors}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
              >
                {saved ? (
                  <>
                    <Check size={14} />
                    Saved
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
