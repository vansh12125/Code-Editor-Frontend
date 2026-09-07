import { useState } from "react";
import {
  Code2,
  Folder,
  MoreVertical,
  Trash2,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteProject } from "@/service/projectService";
import { useAuth } from "@/hooks";
import { removeProject } from "@/redux/authSlice";
import type { Project } from "@/interfaces";
import { formatDateTime } from "@/service/dateTimeService";

const AllProjects = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const projects = user?.projects ?? [];
  const [error, setErrors] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleConfirmDelete = async () => {
    if (!projectToDelete) {
      return;
    }

    setErrors("");
    setSuccess("");
    setIsDeleting(true);

    try {
      const response = await DeleteProject(projectToDelete.id);

      if (!response.success) {
        setErrors(response.errors ?? "Failed to delete project");
        return;
      }

      dispatch(removeProject(projectToDelete.id));
      setProjectToDelete(null);
      setSuccess("Project deleted successfully");
    } catch {
      setErrors("Something went wrong while deleting the project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full px-4 pb-16 pt-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Workspace
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Your Projects
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Manage and continue working on your codebases.
              </p>
            </div>
            <div className="self-start rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md sm:self-auto">
              {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="flex min-h-65 flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2 px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Code2 size={24} className="text-white/50" />
              </div>
              <h2 className="text-base font-medium text-white">
                No projects found
              </h2>
              <p className="mt-1 max-w-sm text-xs text-white/50">
                Create your first project and start building.
              </p>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="mt-5 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-400 text-center">{success}</p>
              )}
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/ide/${project.id}`)}
                  className="group relative flex flex-col gap-3 rounded-xl border border-white/10 bg-white/3 p-3.5 transition duration-200 hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition group-hover:bg-white/10 group-hover:text-white">
                      <Folder size={18} />
                    </div>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <h2 className="truncate text-sm font-medium text-white">
                        {project.name}
                      </h2>
                      <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {project.language}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/45 sm:ml-auto sm:mr-4">
                    <span>
                      Created:{" "}
                      <span className="text-white/70">
                        {formatDateTime(project.createdAt)}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-2.5 sm:border-t-0 sm:pt-0">
                    <span className="flex items-center gap-1 text-xs text-white/40 transition group-hover:text-white/90">
                      Open <ArrowUpRight size={14} />
                    </span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenMenu(
                            openMenu === project.id ? null : project.id,
                          );
                        }}
                        className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenu === project.id && (
                        <div
                          onClick={(event) => event.stopPropagation()}
                          className="absolute right-0 top-8 z-40 w-36 rounded-xl border border-white/10 bg-neutral-950/95 p-1 shadow-2xl backdrop-blur-xl"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setProjectToDelete(project);
                              setOpenMenu(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-red-400 transition hover:bg-red-500/10"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {projectToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!isDeleting) setProjectToDelete(null);
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-950/90 p-5 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">
              <AlertTriangle size={18} />
            </div>
            <h3 className="text-base font-semibold text-white">
              Delete Project
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                "{projectToDelete.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
