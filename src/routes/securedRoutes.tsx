import {
  Dashboard,
  Profile,
  ProjectPage,
  AllProjects,
  PreviewPage,
} from "@/pages/secure";

import type { RouteObject } from "react-router-dom";

import {
  SecuredLayout,
  IdeLayout,
} from "@/components/layout";

import ProtectedRoute from "./components/ProtectedRoute";

export const securedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SecuredLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/projects",
            element: <AllProjects />,
          },
        ],
      },
      {
        element: <IdeLayout />,
        children: [
          {
            path: "/ide/:projectId",
            element: <ProjectPage />,
          },
        ],
      },
      {
        path: "/preview/:projectId",
        element: <PreviewPage />,
      },
    ],
  },
];