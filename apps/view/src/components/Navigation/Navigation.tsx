import {
  IconUsers,
  Icon as IconType,
  IconBuildingBank,
  IconCurrencyPeso,
  IconBackhoe,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

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

type NavigationProps = {
  compact: boolean;
};

export const Navigation = ({ compact }: NavigationProps) => {
  return (
    <div
      className={clsx(
        "grid min-w-max grid-flow-row auto-rows-max gap-4 p-4",
        !compact && " grid-cols-2 sm:grid-cols-4 lg:grid-cols-5",
        compact && "grid-cols-1 md:grid-cols-2"
      )}
    >
      {links.map(({ path, Icon, name, cs }) => {
        return (
          <Link
            className={clsx(
              "flex min-h-[8rem] min-w-[6rem] flex-col items-center",
              compact && "min-h-[0px] min-w-[0px]"
            )}
            key={path}
            to={path}
          >
            <div
              className={clsx(
                "grid w-full flex-grow place-content-center rounded-lg border border-base-200 transition-colors",
                compact && "w-auto p-2",
                cs
              )}
            >
              <Icon
                className={clsx("h-12 w-12", compact && "h-[2rem] w-[2rem]")}
              />
            </div>
            <p className="mt-2 text-xs text-base-content">{name}</p>
          </Link>
        );
      })}
    </div>
  );
};
