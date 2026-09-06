import type { Languages } from "@/interfaces";

interface RegisterUserRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoginUserRequest {
  username: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  isVerified: boolean;
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  userId: string;
  name: string;
  language: Languages;
  createdAt: string;
  updatedAt: string;
}

export type { RegisterUserRequest, LoginUserRequest, User, Project };
