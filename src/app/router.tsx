import { createBrowserRouter } from "react-router-dom";
import { authRoutes, publicRoutes,securedRoutes } from "@/routes";

export const router = createBrowserRouter([...authRoutes, ...publicRoutes,...securedRoutes]);
