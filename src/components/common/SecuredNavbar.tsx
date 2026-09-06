import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useLogout, useAuth } from "@/hooks";

export const SecuredNavbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = useLogout();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2">
      <nav className="flex h-14 items-center justify-between rounded-2xl border border-white/15 bg-black/40 px-4 backdrop-blur-xl">
        <Link
          to="/dashboard"
          className="text-base font-bold tracking-tight text-white transition hover:opacity-90"
        >
          CodeSpace
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/15"
          >
            <LayoutDashboard size={14} />
            Dashboard
          </Link>

          <Link
            to="/dashboard"
            className="rounded-xl px-3 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Projects
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1 transition hover:bg-white/10"
            aria-expanded={isDropdownOpen}
            aria-haspopup="menu"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-neutral-950">
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden text-left md:block">
              <p className="max-w-20 truncate text-xs font-medium text-white">
                {user?.name}
              </p>
            </div>

            <ChevronDown
              size={13}
              className={`text-white/60 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/95 p-1.5 backdrop-blur-2xl"
              role="menu"
            >
              <div className="border-b border-white/10 px-3 py-2">
                <p className="truncate text-xs font-medium text-white">
                  {user?.name}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-white/50">
                  {user?.email}
                </p>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/75 transition hover:bg-white/10 hover:text-white"
                  role="menuitem"
                >
                  <User size={15} />
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-white/75 transition hover:bg-white/10 hover:text-white"
                  role="menuitem"
                >
                  <Settings size={15} />
                  Settings
                </button>
              </div>

              <div className="border-t border-white/10 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                  role="menuitem"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default SecuredNavbar;
