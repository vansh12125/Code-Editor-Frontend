import { createBrowserRouter } from "react-router-dom";
import { authRoutes, publicRoutes } from "@/routes";

export const router = createBrowserRouter([...authRoutes, ...publicRoutes]);
