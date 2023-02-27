import { useStatus } from "@hooks/useStatus";
import { Navigate, useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRoutes = () => {
  const { data, error } = useStatus();

  const authenticated = !!data && !error;

  const routes = !authenticated ? publicRoutes : protectedRoutes;

  const common = {
    path: "*",
    element: authenticated ? (
      <Navigate to="/app" />
    ) : (
      <Navigate to="/auth/login/" />
    ),
  };

  const element = useRoutes([...routes, common]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{element}</>;
};
