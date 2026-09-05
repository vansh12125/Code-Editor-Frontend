import type { RouteObject } from "react-router-dom";
import { Home, About, Contact } from "@/pages/Landing";
import { MainLayout } from "@/components/layout";
import {NotFoundPage} from "@/pages/error"

export const publicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
