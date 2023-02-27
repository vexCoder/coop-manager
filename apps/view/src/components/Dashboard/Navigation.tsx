import {
  IconUsers,
  Icon as IconType,
  IconBuildingBank,
  IconCurrencyPeso,
  IconBackhoe,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Props = {};

type LinkItem = {
  name: string;
  path: string;
  Icon: IconType;
  cs: string;
};

const links: LinkItem[] = [
  {
    name: "Members",
    path: "members",
    Icon: IconUsers,
    cs: "bg-blue-100 hover:bg-blue-200 text-blue-400",
  },
  {
    name: "Loans",
    path: "loans",
    Icon: IconBuildingBank,
    cs: "bg-red-50 hover:bg-red-100 text-red-400",
  },
  {
    name: "Transactions",
    path: "transactions",
    Icon: IconCurrencyPeso,
    cs: "bg-green-100 hover:bg-green-200 text-green-400",
  },
  {
    name: "Staffs",
    path: "staffs",
    Icon: IconBackhoe,
    cs: "bg-yellow-50 hover:bg-yellow-100 text-yellow-400",
  },
];

export const Navigation = ({}: Props) => {
  return (
    <div className="grid min-w-max grid-flow-row auto-rows-max grid-cols-3 gap-4 p-4 sm:grid-cols-4 lg:grid-cols-5">
      {links.map(({ path, Icon, name, cs }) => {
        return (
          <Link
            className="flex min-h-[8rem] min-w-[6rem] flex-col items-center"
            key={path}
            to={path}
          >
            <div
              className={clsx(
                "grid w-full flex-grow place-content-center rounded-lg border border-base-200 transition-colors",
                cs
              )}
            >
              <Icon className="h-12 w-12" />
            </div>
            <p className="mt-2 text-xs text-base-content">{name}</p>
          </Link>
        );
      })}
    </div>
  );
};
