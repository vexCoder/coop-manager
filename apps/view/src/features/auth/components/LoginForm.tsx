import { TextField } from "@components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@coop/common";
import { useToast } from "@providers/Toast";
import useLoginMutation from "../hooks/useLogin";
import useStaffName from "../hooks/useStaffName";

type LoginFormValues = {
  password: string;
};

type LoginFormProps = {
  username?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export const LoginForm = ({ username, onSuccess, onError }: LoginFormProps) => {
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { data: fullname } = useStaffName({
    variables: username,
  });

  const { mutateAsync } = useLoginMutation({
    onSuccess() {
      toast.success({
        title: "Login Successful",
        description: "You have successfully logged in",
        timeout: 5000,
      });

      onSuccess?.();
    },
    onError(error) {
      toast.error({
        title: "Login Failed",
        description: error.message,
        timeout: 5000,
      });

      onError?.(error);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ password: data.password });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="prose-sm prose flex w-full min-w-max max-w-xs flex-col gap-1 lg:prose-base prose-headings:leading-normal prose-p:my-0 prose-p:leading-none"
    >
      <article>
        <h1 className="inline">👋</h1>
        <h2 className="mb-0 inline font-extrabold">
          {username ? ` Welcome Back, ` : ` Sign In `}
        </h2>
      </article>
      {username && (
        <p className="font-normal text-neutral-focus ">{fullname}</p>
      )}

      <TextField
        registration={register("password")}
        className="mt-8"
        placeholder="Enter your password"
        error={formState.errors?.password?.message}
        inputProps={{ type: "password" }}
      />
      <button className="btn-primary btn-sm btn mt-8" type="submit">
        Login
      </button>
    </form>
  );
};
