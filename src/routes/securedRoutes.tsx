import { Dashboard, Profile, ProjectPage } from "@/pages/secure";
import type { RouteObject } from "react-router-dom";
import { SecuredLayout,IdeLayout } from "@/components/layout";

export const securedRoutes: RouteObject[] = [
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
    ],
  },
  {
    element: <IdeLayout />,
    children: [{ path: "/ide/:projectId", element: <ProjectPage /> }],
  },
];
