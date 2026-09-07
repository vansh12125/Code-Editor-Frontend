import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User,Project } from "@/interfaces";

interface initialType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
  error: unknown;
}

const initialState: initialType = {
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,
};

const authSlice = createSlice({
  name: "authInfo",
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    finishInitialization(state) {
      state.initialized = true;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    addProject(state, action:PayloadAction<Project>) {
      state.user?.projects.push(action.payload);
    },
    setError(state, action:PayloadAction<unknown>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    removeProject(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.projects = state.user.projects.filter(
          (project) => project.id !== action.payload,
        );
      }
    },
  },
});

export const {
  login,
  logout,
  setLoading,
  updateUser,
  clearError,
  finishInitialization,
  setError,
  addProject,
  removeProject
} = authSlice.actions;
export default authSlice.reducer;
