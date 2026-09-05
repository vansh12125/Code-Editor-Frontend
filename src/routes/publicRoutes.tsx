import type { RouteObject } from "react-router-dom";
import { Home } from "@/pages/Landing";
import { MainLayout } from "@/components/layout";

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
