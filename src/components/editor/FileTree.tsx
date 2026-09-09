import { useEffect, useRef, useState } from "react";

import {
  ChevronRight,
  File,
  FileJson,
  Folder,
  FolderOpen,
  DotIcon,
} from "lucide-react";

import {
  DiHtml5,
  DiJavascript1,
  DiCss3,
  DiReact,
  DiNodejsSmall,
} from "react-icons/di";

import { GiSettingsKnobs } from "react-icons/gi";

import { PiFileSvg, PiFilePng, PiFileJpg, PiFileMd } from "react-icons/pi";

import type { ProjectTree } from "@/interfaces";

interface FileTreeProps {
  node: ProjectTree;
  level?: number;
  selectedFile?: string;
  onFileSelect: (file: ProjectTree) => void;
  onContextMenu: (e: React.MouseEvent, node: ProjectTree) => void;
  savedContents: Record<string, string>;
  onRename: (node: ProjectTree, newName: string) => void;
  onStartRename: (path: string) => void;
  renamePath: string | null;
}

const getFileIcon = (extension?: string) => {
  switch (extension) {
    case ".html":
      return <DiHtml5 size={17} color="#E34F26" />;

    case ".js":
      return <DiJavascript1 size={17} color="#F7DF1E" />;

    case ".css":
      return <DiCss3 size={17} color="#1572B6" />;

    case ".jsx":
    case ".tsx":
      return <DiReact size={17} color="#61DAFB" />;

    case ".json":
      return <FileJson size={15} color="#F7DF1E" />;

    case ".ts":
      return <DiJavascript1 size={17} color="#3178C6" />;

    case ".node":
      return <DiNodejsSmall size={17} color="#339933" />;

    case ".env":
      return <GiSettingsKnobs size={15} color="#E5C07B" />;

    case ".svg":
      return <PiFileSvg size={15} color="#FFB13B" />;

    case ".png":
      return <PiFilePng size={15} color="#A074C4" />;

    case ".jpg":
    case ".jpeg":
      return <PiFileJpg size={15} color="#A074C4" />;

    case ".md":
      return <PiFileMd size={15} color="#519ABA" />;

    default:
      return <File size={15} className="text-white/50" />;
  }
};

const FileTree = ({
  node,
  level = 0,
  selectedFile,
  onFileSelect,
  onContextMenu,
  savedContents,
  onRename,
  renamePath,
  onStartRename,
}: FileTreeProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleRenameKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitRename();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onRename(node, node.name);
    }
  };

  const getFileNameWithoutExtension = (name: string) => {
    const lastDot = name.lastIndexOf(".");

    if (lastDot <= 0) {
      return name;
    }

    return name.slice(0, lastDot);
  };

  const getExtension = (name: string) => {
    const lastDot = name.lastIndexOf(".");

    if (lastDot <= 0) {
      return "";
    }

    return name.slice(lastDot);
  };

  const [newName, setNewName] = useState(node.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const isRenaming = renamePath === node.path;

  useEffect(() => {
    if (!isRenaming) {
      return;
    }

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [isRenaming]);

  const startRename = () => {
    if (node.type === "file") {
      setNewName(getFileNameWithoutExtension(node.name));
    } else {
      setNewName(node.name);
    }

    onStartRename(node.path);
  };

  const submitRename = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      onRename(node, node.name);
      return;
    }

    if (node.type === "file") {
      const extension = getExtension(node.name);
      onRename(node, `${trimmedName}${extension}`);
      return;
    }

    onRename(node, trimmedName);
  };

  if (node.type === "directory") {
    return (
      <div>
        <div
          className="flex w-full select-none items-center gap-1.5 rounded-md py-1.5 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
          style={{
            paddingLeft: `${level * 16 + 4}px`,
          }}
          onContextMenu={(e) => onContextMenu(e, node)}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1.5"
          >
            <ChevronRight
              size={14}
              className={`shrink-0 transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
            />

            {isOpen ? <FolderOpen size={15} /> : <Folder size={15} />}
          </button>

          {isRenaming ? (
            <span className="flex min-w-0 flex-1 items-center">
              <input
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleRenameKeyDown}
                onBlur={submitRename}
                onClick={(e) => e.stopPropagation()}
                className="min-w-0 flex-1 bg-transparent text-white outline-none"
              />

              <span className="shrink-0 text-white/50">
                {getExtension(node.name)}
              </span>
            </span>
          ) : (
            <span
              className="truncate"
              onDoubleClick={(e) => {
                e.stopPropagation();
                startRename();
              }}
            >
              {node.name}
            </span>
          )}
        </div>

        {isOpen && node.children?.length > 0 && (
          <div>
            {[...node.children]
              .sort((a, b) => {
                if (a.type === b.type) {
                  return a.name.localeCompare(b.name);
                }

                return a.type === "directory" ? -1 : 1;
              })
              .map((child) => (
                <FileTree
                  key={child.path}
                  node={child}
                  level={level + 1}
                  selectedFile={selectedFile}
                  onFileSelect={onFileSelect}
                  onContextMenu={onContextMenu}
                  savedContents={savedContents}
                  onRename={onRename}
                  renamePath={renamePath}
                  onStartRename={onStartRename}
                />
              ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = selectedFile === node.path;
  const isDirty = node.content !== savedContents[node.path];

  return (
    <div onContextMenu={(e) => onContextMenu(e, node)} className="w-full">
      <button
        type="button"
        onClick={() => {
          if (!isRenaming) {
            onFileSelect(node);
          }
        }}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs select-none ${
          isSelected
            ? "bg-white/15 text-white"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`}
        style={{
          paddingLeft: `${level * 16 + 8}px`,
        }}
      >
        {getFileIcon(node.extension || node.name)}

        <span className="flex w-full min-w-0 items-center justify-between">
          {isRenaming ? (
            <span className="flex min-w-0 flex-1 items-center">
              <input
                ref={inputRef}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleRenameKeyDown}
                onBlur={submitRename}
                onClick={(e) => e.stopPropagation()}
                className="min-w-0 flex-1 bg-transparent text-white outline-none"
              />

              {getExtension(node.name) && (
                <span className="shrink-0 text-white/50">
                  {getExtension(node.name)}
                </span>
              )}
            </span>
          ) : (
            <span
              className="truncate"
              onDoubleClick={(e) => {
                e.stopPropagation();
                startRename();
              }}
            >
              {node.name}
            </span>
          )}

          {isDirty && (
            <span className="shrink-0">
              <DotIcon size={18} strokeWidth={5} />
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default FileTree;
