import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  ChevronDown,
  FileCode2,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks";
import type { Project } from "@/interfaces";
import { Languages, LanguageIcons } from "@/interfaces";
import type { Languages as LanguagesType } from "@/interfaces";
import { validateProjectName, CreateProject, formatDateTime } from "@/service";

const LanguageIcon = ({ language }: { language: LanguagesType }) => {
  const Icon = LanguageIcons[language];

  return <Icon size={16} />;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const AVAILABLE_LANGUAGES: ("HTML" | "EXPRESS" | "REACT" | "NEXT")[] =
    Object.values(Languages);

  const projects: Project[] = user?.projects ?? [];
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const [projectName, setProjectName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguagesType>(
    Languages.HTML,
  );
  const [projectNameError, setProjectNameError] = useState<string | null>(null);

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(target)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateProject = async () => {
    const trimmedName = projectName.trim().replace(/\s+/g, "_");
    setErrors("");
    setSuccess("");
    const error = validateProjectName(trimmedName);

    if (error) {
      setProjectNameError(error);
      setProjectName("");
      return;
    }

    setProjectNameError(null);

    const response = await CreateProject({
      projectName: projectName,
      language: selectedLanguage,
    });

    if (!response.success) {
      setErrors(response.errors ?? "Something went wrong");
    } else {
      console.log(response.data);
      setSuccess("Project created successfully");
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleCreateProject();
    }
  };

  const handleFocusNewProject = () => {
    setIsSidebarCollapsed(false);
    setIsMobileSidebarOpen(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  return (
    <div className="flex h-full w-full overflow-hidden">
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setIsMobileSidebarOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/40 text-white backdrop-blur-xl transition hover:bg-black/60 lg:hidden"
      >
        <Menu size={16} />
      </button>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-black/35 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0 ${
          isSidebarCollapsed ? "lg:w-18" : "lg:w-67.5"
        } ${
          isMobileSidebarOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"
        }`}
      >
        <div
          className={`flex h-16 items-center border-b border-white/10 ${
            isSidebarCollapsed ? "justify-center px-2" : "justify-between px-5"
          }`}
        >
          {!isSidebarCollapsed && (
            <div>
              <p className="text-sm font-bold tracking-tight text-white">
                Workspace
              </p>
              <p className="mt-0.5 text-[10px] text-white/50">
                Manage your code
              </p>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              className="hidden h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white lg:flex"
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen size={14} />
              ) : (
                <PanelLeftClose size={14} />
              )}
            </button>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div
          className={`flex h-12 items-center border-b border-white/10 ${
            isSidebarCollapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          {!isSidebarCollapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Projects
            </span>
          )}

          <button
            type="button"
            aria-label="Create new project"
            onClick={handleFocusNewProject}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto p-2.5">
          {projects.map((project) => {
            const isSelected = selectedProjectId === project.id;

            return (
              <button
                key={project.id}
                type="button"
                title={isSidebarCollapsed ? project.name : undefined}
                onClick={() => {
                  setSelectedProjectId(project.id);
                  setIsMobileSidebarOpen(false);
                  navigate(`/ide/${project.id}`);
                }}
                className={`group relative flex w-full rounded-xl text-left transition-all duration-200 ${
                  isSidebarCollapsed
                    ? "h-10 items-center justify-center p-2"
                    : "flex-col p-2.5"
                } ${
                  isSelected
                    ? "border border-white/15 bg-white/15 text-white"
                    : "border border-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-white" />
                )}

                {isSidebarCollapsed ? (
                  <FileCode2 size={17} className="text-white/70" />
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-medium">
                        {project.name}
                      </span>

                      <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50">
                        {project.language}
                      </span>
                    </div>

                    <span className="mt-1 text-[10px] text-white/40">
                      {formatDateTime(project.updatedAt)}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-4 pt-24 pb-12 sm:px-8 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Good afternoon, {user?.name}
            </h1>

            <p className="mt-2 text-sm text-white/60">
              Ready to build something?
            </p>
          </div>

          <section className="rounded-3xl border border-white/15 bg-black/30 p-5 backdrop-blur-xl sm:p-7">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                Create a new project
              </h2>

              <p className="mt-1 text-xs text-white/60">
                Choose a language and start coding in seconds.
              </p>
            </div>

            <div className="mt-6 space-y-4" onKeyDown={handleKeyDown}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="projectNameInput"
                    className="mb-1.5 block text-xs font-medium text-white/75"
                  >
                    Project name
                  </label>

                  <input
                    ref={inputRef}
                    id="projectNameInput"
                    type="text"
                    value={projectName}
                    onChange={(event) =>
                      setProjectName(event.target.value.replace(/\s+/g, "_"))
                    }
                    placeholder="My awesome project"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/30 focus:bg-white/10"
                  />

                  {projectNameError && (
                    <p className="mt-1 text-xs text-red-400">
                      {projectNameError}
                    </p>
                  )}
                </div>

                <div className="relative" ref={langDropdownRef}>
                  <label
                    htmlFor="languageSelect"
                    className="mb-1.5 block text-xs font-medium text-white/75"
                  >
                    Language
                  </label>

                  <button
                    id="languageSelect"
                    type="button"
                    onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <LanguageIcon language={selectedLanguage} />
                      {selectedLanguage}
                    </span>

                    <ChevronDown
                      size={14}
                      className={`text-white/50 transition-transform duration-200 ${
                        isLangDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isLangDropdownOpen && (
                    <ul
                      role="listbox"
                      className="absolute left-0 right-0 top-full z-50 mt-2 max-h-48 overflow-y-auto rounded-2xl border border-white/15 bg-neutral-900/95 p-1.5 backdrop-blur-2xl"
                    >
                      {AVAILABLE_LANGUAGES.map((language) => (
                        <li
                          key={language}
                          role="option"
                          aria-selected={selectedLanguage === language}
                          onClick={() => {
                            setSelectedLanguage(language);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                            selectedLanguage === language
                              ? "bg-white/15 font-medium text-white"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <LanguageIcon language={language} />
                            {language}
                          </span>

                          {selectedLanguage === language && <Check size={12} />}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {errors && (
                <p className="text-sm text-red-400 text-center">{errors}</p>
              )}
              {success && (
                <p className="text-sm text-green-400 text-center">{success}</p>
              )}
              <div className="flex items-center justify-end pt-1">
                <button
                  type="button"
                  onClick={handleCreateProject}
                  disabled={!projectName.trim()}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Create project
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  Recent projects
                </h2>

                <p className="mt-1 text-xs text-white/50">
                  Continue where you left off
                </p>
              </div>

              <span className="text-xs text-white/40">
                {projects.length} projects
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => navigate(`/ide/${project.id}`)}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 text-left backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-black/45"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                      <LanguageIcon language={project.language} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-white">
                        {project.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
                        <span>{project.language}</span>
                        <span>•</span>
                        <span>{formatDateTime(project.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    size={15}
                    className="-rotate-90 shrink-0 text-white/30 transition group-hover:text-white/80"
                  />
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
