import { Title } from "@components/Utils";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

export const Dashboard = ({}: Props) => {
  return (
    <div>
      <Title />
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
