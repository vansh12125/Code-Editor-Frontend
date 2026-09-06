import type { Languages } from "@/interfaces";

interface Project {
  id: string;
  userId: string;
  name: string;
  language: Languages;
  createdAt: string;
  updatedAt: string;
}

interface CreateProjectRequest {
  projectName: string;
  language: Languages;
}

export type { Project, CreateProjectRequest };
