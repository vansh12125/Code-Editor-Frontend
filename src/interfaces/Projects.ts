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

interface ProjectTree{
  path:string;
  children:ProjectTree[];
  name:string;
  type:"directory"|"file";
  extension?:string;
  content?:string;
  projectName?: string;
}

export type { Project, CreateProjectRequest,ProjectTree };
