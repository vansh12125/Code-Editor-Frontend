import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/interfaces";

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
    login(state, action) {
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    finishInitialization(state) {
      state.initialized = true;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
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
} = authSlice.actions;
export default authSlice.reducer;
