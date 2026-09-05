import axios from "axios";

const API_VERSION: string = import.meta.env.VITE_API_API_VERSION;
const baseURL: string = import.meta.env.VITE_API_BASE_URL + API_VERSION;

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 600000,
  withCredentials: true,
});

export { baseURL };
export default apiClient;
