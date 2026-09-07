import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectTree } from "@/service/projectService";
import type { ProjectTree } from "@/interfaces";
import { FileTree, CodeEditor, IdeNavbar } from "@/components/editor";
import { useAuth } from "@/hooks";
import { SaveFileInDb } from "@/service/projectService";

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectTree, setProjectTree] = useState<ProjectTree | null>(null);
  const [selectedFile, setSelectedFile] = useState<ProjectTree | null>(null);
  const [savedContent, setSavedContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjectTree = async () => {
      if (!projectId) return;

      const response = await GetProjectTree(projectId);

      if (!response.success || !response.data) return;

      setProjectTree(response.data);
    };

    fetchProjectTree();
  }, [projectId]);

  const handleFileSelect = (file: ProjectTree) => {
    setSelectedFile(file);
    setSavedContent(file.content ?? "");
  };

  const handleFileChange = (value: string) => {
    if (!selectedFile) {
      return;
    }

    setSelectedFile((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        content: value,
      };
    });

    setProjectTree((prev) => {
      if (!prev) {
        return prev;
      }

      const updateFile = (node: ProjectTree): ProjectTree => {
        if (node.type === "file" && node.path === selectedFile.path) {
          return {
            ...node,
            content: value,
          };
        }

        if (node.type === "directory") {
          return {
            ...node,
            children: node.children.map(updateFile),
          };
        }

        return node;
      };

      return updateFile(prev);
    });
  };

  const isDirty = selectedFile?.content !== savedContent;

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
        content: selectedFile.content ?? "",
      },
      projectId,
    );

    if (!response.success) {
      return;
    }

    setSavedContent(selectedFile.content ?? "");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <>
      <IdeNavbar isDirty={isDirty} onSave={handleSave} />
      <div className="flex h-screen bg-black text-white">
        <aside className="w-64 shrink-0 border-r border-white/10 p-3">
          {projectTree && (
            <FileTree
              node={projectTree}
              onFileSelect={handleFileSelect}
              selectedFilePath={selectedFile?.path}
            />
          )}
        </aside>

        <main className="min-w-0 flex-1 w-screen">
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
    </>
  );
};

export default ProjectPage;
