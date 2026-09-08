import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectTree } from "@/service/projectService";
import type { ProjectTree } from "@/interfaces";
import { FileTree, CodeEditor, IdeNavbar } from "@/components/editor";
import { useAuth, useProject } from "@/hooks";
import {
  setProject,
  setSelectedFile,
  updateFileContent,
  markFileSaved,
} from "@/redux/projectSlice";
import { SaveFileInDb } from "@/service/projectService";
import { FileContextMenu } from "@/components/editor/ContextMenu";

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projectTree, selectedFile, savedContents, dispatch } = useProject();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    path: string;
    name: string;
    type: "file" | "directory";
  } | null>(null);

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent, node: ProjectTree) => {
    e.preventDefault();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      path: node.path,
      name: node.name,
      type: node.type,
    });
  };

  useEffect(() => {
    const fetchProjectTree = async () => {
      if (!projectId) return;

      const response = await GetProjectTree(projectId);

      if (!response.success || !response.data) return;

      dispatch(
        setProject({
          projectId: projectId,
          projectName: response.data.name,
          projectTree: response.data,
        }),
      );
    };

    fetchProjectTree();
  }, [projectId, dispatch]);

  const handleFileSelect = (file: ProjectTree) => {
    dispatch(
      setSelectedFile({
        path: file.path,
        content: file.content ?? "",
        extension: file.extension ?? file.name,
      }),
    );
  };

  const handleFileChange = (value: string) => {
    if (!selectedFile) return;

    dispatch(
      updateFileContent({
        path: selectedFile.path,
        content: value,
      }),
    );
  };

  const isDirty = selectedFile
    ? selectedFile.content !== savedContents[selectedFile.path]
    : false;

  const handleSave = async () => {
    if (!selectedFile || !isDirty || !projectId) {
      return;
    }

    const filePath = selectedFile.path
      .replace(/\\/g, "/")
      .replace(`projects/${projectId}/`, "");

    const response = await SaveFileInDb(
      {
        path: filePath,
        content: selectedFile.content,
      },
      projectId,
    );

    if (!response.success) {
      return;
    }

    dispatch(
      markFileSaved({
        path: selectedFile.path,
        content: selectedFile.content,
      }),
    );
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen flex-col bg-black text-white">
      <IdeNavbar isDirty={isDirty} onSave={handleSave} />

      <div
        className="flex min-h-0 flex-1"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <aside className="w-64 shrink-0 border-r border-white/10 p-3">
          {projectTree && (
            <FileTree
              node={projectTree}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile?.path}
              onContextMenu={handleContextMenu}
            />
          )}
        </aside>

        {contextMenu && (
          <FileContextMenu
            cordX={contextMenu.x}
            cordY={contextMenu.y}
            path={contextMenu.path}
            name={contextMenu.name}
            type={contextMenu.type}
          />
        )}

        <main className="min-w-0 flex-1">
          {selectedFile ? (
            <CodeEditor
              content={selectedFile.content}
              language={selectedFile.extension ?? ""}
              onChange={handleFileChange}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/40">
              Select a file to start editing
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectPage;
