import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-2xl border border-white/20 bg-black/20 px-4 py-3 text-white shadow-lg backdrop-blur-xl sm:top-5 sm:px-6 select-none">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight sm:text-2xl">
          CodeSpace
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/contact"
            className="text-sm font-medium text-white/80 transition hover:text-white"
          >
            Contact
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-white/80 transition hover:text-white"
          >
            About
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            to={"/signin"}
          >
            Log in
          </Link>

          <Link to={"/signup"} className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-white transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-80 pt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Contact
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            About
          </Link>

          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
            <Link
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
              to={"/signin"}
            >
              Log in
            </Link>

            <Link 
            to={"/signup"} className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
