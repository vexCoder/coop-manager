import { createInfiniteQuery } from "@utils/createExposedHook";

interface Params {
  page?: number;
  limit: number;
}

const useMembers = createInfiniteQuery(
  (params: Params) => {
    return window.data.members(params);
  },
  {
    queryKey: ["members"],
  }
);

export default useMembers;
