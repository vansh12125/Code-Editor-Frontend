import { DeleteFile } from "@/service/projectService";
import { useParams } from "react-router-dom";
import { useProject } from "@/hooks";
import { deleteNode } from "@/redux/projectSlice";

type FileContextMenuProps = {
  cordX: number;
  cordY: number;
  path: string;
  name: string;
  type: "file" | "directory";
};

const FileContextMenu = ({
  cordX,
  cordY,
  path,
  name,
  type,
}: FileContextMenuProps) => {
  const { projectId } = useParams();
  const { dispatch } = useProject();

  const handleDeleteFile = async () => {
    if (!projectId || !path) {
      return;
    }
    const response = await DeleteFile(
      projectId,
      path.replace(/\\/g, "/").replace(`projects/${projectId}/`, ""),
    );

    if (!response.success) {
      console.log(response.errors);
      return;
    }
    dispatch(deleteNode(path));
  };

  const handleRenameFile = () => {};

  const copyContent = () => {};

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className="fixed z-50 min-w-52 select-none overflow-hidden rounded-xl border border-zinc-200/80 bg-white/95 p-1 text-sm shadow-xl shadow-zinc-950/10 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/95 dark:shadow-black/40"
      style={{
        left: cordX,
        top: cordY,
      }}
    >
      {name && (
        <div className="truncate px-2.5 py-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
          {name}
        </div>
      )}

      <div className="flex flex-col gap-0.5 text-zinc-700 dark:text-zinc-200">
        <button
          onClick={handleRenameFile}
          className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          <span>Rename</span>
        </button>

        {type === "file" && (
          <button
            onClick={copyContent}
            className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            <span>Copy Content</span>
          </button>
        )}

        <div className="my-1 h-px bg-zinc-200/80 dark:bg-zinc-800/80" />

        <button
          onClick={handleDeleteFile}
          className="group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50 active:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/40 dark:active:bg-red-900/40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-red-500 group-hover:text-red-600 dark:text-red-400 dark:group-hover:text-red-300"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default FileContextMenu;
