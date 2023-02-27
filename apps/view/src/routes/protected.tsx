import { Dashboard, Navigation } from "@components/Dashboard";
import { lazyDefault } from "@utils/lazy";
import { Navigate, RouteObject } from "react-router-dom";

const MemberRoutes = lazyDefault(() => import("@features/members"));

export const protectedRoutes: RouteObject[] = [
  {
    path: "app/*",
    element: <Dashboard />,
    children: [
      {
        path: "members/*",
        element: <MemberRoutes />,
      },
      { path: "", element: <Navigation /> },
      { path: "*", element: <Navigate to="/app" /> },
    ],
  },
];
