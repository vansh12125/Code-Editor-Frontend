import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { GetProjectTree } from "@/service/projectService";
import type { ProjectTree } from "@/interfaces";
import { FileTree } from "@/components/editor";

const ProjectPage = () => {
  const [projectTree, setProjectTree] = useState<ProjectTree | null>(null);

  const { user } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  //   const printProjectTree = (root: ProjectTree) => {
  //     console.log(root);
  //     if (!root.children) {
  //       return;
  //     }
  //     root.children.forEach((node) => {
  //       printProjectTree(node);
  //     });
  //   };

  useEffect(() => {
    const fetchProjectTree = async () => {
      if (typeof projectId !== "string") {
        return;
      }

      const response = await GetProjectTree(projectId);

      if (!response.success) {
        console.log("Not Found");
        return;
      }
      setProjectTree(response.data);
    };

    fetchProjectTree();
  }, [projectId]);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-black/30">
        <div className="flex h-12 items-center border-b border-white/10 px-4">
          <span className="text-sm font-semibold">Explorer</span>
        </div>

        <div className="overflow-y-auto p-2">
          {projectTree && (
            <FileTree
              node={projectTree}
              onFileSelect={(file) => {
                console.log(file.content);
              }}
            />
          )}
        </div>
      </aside>

      <main className="min-w-0 flex-1"></main>
    </div>
  );
};

export default ProjectPage;
