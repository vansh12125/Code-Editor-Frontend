import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectTree } from "@/interfaces";

interface SelectedFile {
  path: string;
  content: string;
  extension: string;
}

interface ProjectState {
  projectId: string | null;
  projectName: string;
  projectTree: ProjectTree | null;
  selectedFile: SelectedFile | null;
  savedContents: Record<string, string>;
}

const initialState: ProjectState = {
  projectId: null,
  projectName: "",
  projectTree: null,
  selectedFile: null,
  savedContents: {},
};

const getSavedContents = (node: ProjectTree): Record<string, string> => {
  if (node.type === "file") {
    return {
      [node.path]: node.content ?? "",
    };
  }

  return node.children.reduce<Record<string, string>>(
    (acc, child) => ({
      ...acc,
      ...getSavedContents(child),
    }),
    {},
  );
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {
    setProject: (
      state,
      action: PayloadAction<{
        projectId: string;
        projectName: string;
        projectTree: ProjectTree;
      }>,
    ) => {
      state.projectId = action.payload.projectId;
      state.projectName = action.payload.projectName;
      state.projectTree = action.payload.projectTree;
      state.savedContents = getSavedContents(action.payload.projectTree);
    },

    setSelectedFile: (state, action: PayloadAction<SelectedFile | null>) => {
      state.selectedFile = action.payload;
    },

    updateFileContent: (
      state,
      action: PayloadAction<{
        path: string;
        content: string;
      }>,
    ) => {
      if (!state.projectTree) return;

      const updateFile = (node: ProjectTree): ProjectTree => {
        if (node.type === "file" && node.path === action.payload.path) {
          return {
            ...node,
            content: action.payload.content,
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

      state.projectTree = updateFile(state.projectTree);

      if (state.selectedFile?.path === action.payload.path) {
        state.selectedFile.content = action.payload.content;
      }
    },

    markFileSaved: (
      state,
      action: PayloadAction<{
        path: string;
        content: string;
      }>,
    ) => {
      state.savedContents[action.payload.path] = action.payload.content;
    },

    clearProject: (state) => {
      state.projectId = null;
      state.projectName = "";
      state.projectTree = null;
      state.selectedFile = null;
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      if (!state.projectTree) return;

      const removeNode = (node: ProjectTree): ProjectTree => {
        if (node.type !== "directory") {
          return node;
        }

        return {
          ...node,
          children: node.children
            .filter((child) => child.path !== action.payload)
            .map((child) => removeNode(child)),
        };
      };

      state.projectTree = removeNode(state.projectTree);

      if (state.selectedFile?.path === action.payload) {
        state.selectedFile = null;
      }
    },
  },
});

export const {
  setProject,
  setSelectedFile,
  updateFileContent,
  clearProject,
  deleteNode,
  markFileSaved,
} = projectSlice.actions;

export default projectSlice.reducer;
