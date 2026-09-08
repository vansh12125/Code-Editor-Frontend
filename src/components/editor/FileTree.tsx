import { useState } from "react";
import { ChevronRight, File, FileJson, Folder, FolderOpen,DotIcon } from "lucide-react";
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
      return <PiFileJpg size={15} color="#A074C4" />;

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
}: FileTreeProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  if (node.type === "directory") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onContextMenu={(e) => onContextMenu(e, node)}
          className="flex w-full items-center gap-1.5 rounded-md py-1.5 text-left text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white select-none"
          style={{ paddingLeft: `${level * 16 + 4}px` }}
        >
          <ChevronRight
            size={14}
            className={`shrink-0 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />

          {isOpen ? <FolderOpen size={15} /> : <Folder size={15} />}

          <span className="truncate">
            {level === 0 ? node.projectName : node.name}
          </span>
        </button>

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
    <>
      <button
        type="button"
        onClick={() => onFileSelect(node)}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition select-none ${
          isSelected
            ? "bg-white/15 text-white"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onContextMenu={(e) => onContextMenu(e, node)}
      >
        {getFileIcon(node.extension || node.name)}

        <span className="flex w-full items-center justify-between truncate">
          <span className="truncate">{node.name}</span>
          {isDirty && <span><DotIcon size={18} strokeWidth={5} /></span>}
        </span>
      </button>
    </>
  );
};

export default FileTree;
