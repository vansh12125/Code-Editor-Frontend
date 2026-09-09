import type { RouteObject } from "react-router-dom";
import { LoginPage, RegisterPage,OAuthSuccess } from "@/pages/Auth";
import { MainLayout } from "@/components/layout";

export const authRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
      {
        path: "/oauth/success",
        element: <OAuthSuccess />,
      },
    ],
  },
];
