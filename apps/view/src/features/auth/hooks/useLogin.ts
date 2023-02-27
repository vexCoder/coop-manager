import { createMutation } from "@utils/createExposedHook";

type LoginParams = Parameters<typeof window.public.login>[0];

const useLoginMutation = createMutation(async (p: LoginParams) => {
  return window.public.login(p);
}, {});

export default useLoginMutation;
