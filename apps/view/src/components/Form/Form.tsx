import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";
import { ToggleButtonsField } from "./ToggleButtonsField";

type Props<T extends FieldValues> = {
  children: React.ReactNode | React.ReactNode[];
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
};

export const Form = <T extends FieldValues>({
  children,
  onSubmit,
  onError,
}: Props<T>) => {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>{children}</form>
    </FormProvider>
  );
};

Form.Text = TextField;
Form.Select = SelectField;
Form.ToggleButtons = ToggleButtonsField;
