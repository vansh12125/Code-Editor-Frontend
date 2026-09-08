import { apiClient } from "@/config";
import type { CreateProjectRequest, Response, Project } from "@/interfaces";
import axios from "axios";

const CreateProject = async (
  projectData: CreateProjectRequest,
): Promise<Response<Project, string | null>> => {
  try {
    const response = await apiClient.post("/projects", projectData);
    return {
      success: true,
      data: response.data.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const GetProjectById = async (projectId: string) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return {
      success: true,
      data: response.data.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const GetProjectTree = async (projectId: string) => {
  try {
    const response = await apiClient.get(`/projects/${projectId}/files`);
    return {
      success: true,
      data: response.data.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const SaveFileInDb = async (
  fileData: { path: string; content: string },
  projectId: string,
) => {
  try {
    const response = await apiClient.patch(
      `/projects/${projectId}/files`,
      fileData,
    );
    return {
      success: true,
      data: response.data.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const DeleteProject = async (
  projectId: string,
): Promise<Response<unknown, string | null>> => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);

    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

const DeleteFile = async (projectId: string, path: string) => {
  try {
    const response = await apiClient.delete(`/projects/${projectId}/files`, {
      data: { path },
    });

    return {
      success: true,
      data: response.data,
      errors: null,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: null,
        errors:
          typeof error.response?.data?.errors === "string"
            ? error.response.data.errors
            : "Something went wrong",
      };
    }

    return {
      success: false,
      data: null,
      errors: "Something went wrong",
    };
  }
};

export {
  CreateProject,
  GetProjectById,
  GetProjectTree,
  SaveFileInDb,
  DeleteProject,
  DeleteFile,
};
