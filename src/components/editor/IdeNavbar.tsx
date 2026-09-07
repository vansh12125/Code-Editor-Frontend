import { Link } from "react-router-dom";
import { ArrowLeft, Code2, Play, Save } from "lucide-react";
interface IdeNavbarProps {
  isDirty: boolean;
  onSave: () => void;
}

const IdeNavbar = ({ isDirty, onSave }: IdeNavbarProps) => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-white/10 bg-neutral-950 px-4 text-white">
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <Code2 size={19} />
          CodeSpace
        </Link>

        <div className="h-5 w-px bg-white/10" />

        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!isDirty}
          onClick={onSave}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white/10 enabled:text-white/70 enabled:hover:text-white"
        >
          <Save size={14} />
          Save
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-white/90"
        >
          <Play size={14} />
          Run
        </button>
      </div>
    </header>
  );
};

export default IdeNavbar;