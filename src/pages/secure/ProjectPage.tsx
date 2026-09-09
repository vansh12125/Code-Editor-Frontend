import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  GetProjectTree,
  SaveFileInDb,
  RenameFile,
} from "@/service/projectService";

import type { ProjectTree } from "@/interfaces";

import { CodeEditor, FileTree, IdeNavbar } from "@/components/editor";

import { FileContextMenu } from "@/components/editor/ContextMenu";

import { useAuth, useProject } from "@/hooks";

import {
  clearProject,
  markFileSaved,
  renameNode,
  setProject,
  setSelectedFile,
  updateFileContent,
} from "@/redux/projectSlice";

const ProjectPage = () => {
  const [projectNotFound, setProjectNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [renamePath, setRenamePath] = useState<string | null>(null);

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

  const handleRename = async (node: ProjectTree, newName: string) => {
    if (!projectId) {
      return;
    }

    if (newName === node.name) {
      setRenamePath(null);
      return;
    }

    const oldPath = node.path
      .replace(/\\/g, "/")
      .replace(`projects/${projectId}/`, "");

    const parentPath = oldPath.substring(0, oldPath.lastIndexOf("/"));

    const newPath = parentPath ? `${parentPath}/${newName}` : newName;

    const response = await RenameFile(projectId, oldPath, newPath);

    if (!response.success) {
      console.log(response.errors);
      setRenamePath(null);
      return;
    }

    dispatch(
      renameNode({
        path: node.path,
        newName,
      }),
    );

    setRenamePath(null);
  };

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
      setLoading(true);
      setProjectNotFound(false);

      if (!projectId) {
        setProjectNotFound(true);
        setLoading(false);
        return;
      }

      const response = await GetProjectTree(projectId);

      if (!response.success || !response.data) {
        dispatch(clearProject());
        setProjectNotFound(true);
        setLoading(false);
        return;
      }

      dispatch(
        setProject({
          projectId,
          projectName: response.data.name,
          projectTree: response.data,
        }),
      );

      setLoading(false);
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
    if (!selectedFile) {
      return;
    }

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

  const handleStartRename = (path: string) => {
    setRenamePath(path);
    setContextMenu(null);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading project...
      </div>
    );
  }

  if (projectNotFound) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-semibold">Project Not Found</h1>

        <p className="mt-2 text-sm text-white/50">
          The project you're looking for doesn't exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-6 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

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
              savedContents={savedContents}
              renamePath={renamePath}
              onRename={handleRename}
              onStartRename={handleStartRename}
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
            onRename={handleStartRename}
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
