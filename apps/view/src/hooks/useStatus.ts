import { createQuery } from "@utils/createExposedHook";

// const useStatus = () => {
//   const result = useQuery({
//     queryKey: ["status"],
//     queryFn: window.data.status,
//     retry: false,
//   });

//   return result;
// };
export const useStatus = createQuery(window.data.status, {
  queryKey: ["status"],
  retry: false,
});
