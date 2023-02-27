import { createQuery } from "@utils/createExposedHook";

const useStaffName = createQuery(
  (username: string) => window.public.getStaffName(username),
  {
    queryKey: ["staffName"],
    retry: false,
  }
);

export default useStaffName;
