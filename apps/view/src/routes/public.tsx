import { lazyDefault } from "@utils/lazy";
import { Navigate, RouteObject } from "react-router-dom";

const AuthRoutes = lazyDefault(() => import("@features/auth"));

export const publicRoutes: RouteObject[] = [
  {
    path: "*",
    children: [
      {
        path: "auth/*",
        element: <AuthRoutes />,
      },
      {
        path: "*",
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
];
