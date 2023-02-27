import { Fragment, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { MemberListItem } from "../components/MemberListItem";
import useMembers from "../hooks/useMembers";

type Props = {};
export const MemberList = ({}: Props) => {
  const intersectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  const { data, status, fetchNextPage, isFetchingNextPage } = useMembers({
    variables: {
      limit: 2,
    },
  });

  const visible = intersection?.isIntersecting;

  useEffect(() => {
    if (visible && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [visible, intersection?.time, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-[30vh] border-b border-base-200">test</div>
      <div className="flex max-h-fit flex-col pb-4 pt-2">
        <div className="flex border-b border-base-200 px-4 pb-2">
          <p className="flex-grow text-xs">Members</p>
          <p className="flex-shrink-0 text-xs">Transactions</p>
        </div>
        {data?.pages.map((page, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              {page?.members.map((v) => {
                return <MemberListItem key={v.id} member={v} />;
              })}
            </Fragment>
          );
        })}
      </div>
      <div ref={intersectionRef} className="h-4" />
    </div>
  );
};
