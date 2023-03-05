import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Form } from "./Form";
import { TextField } from "./TextField";

export default {
  title: "Forms/Form",
  component: Form,
} as ComponentMeta<"div">;

const BaseTemplate: ComponentStory<"div"> = () => (
  <Form
    onSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    }}
  >
    <TextField label="Label" placeholder="Placeholder" />
    <button type="submit">Submit</button>
  </Form>
);

export const Component = BaseTemplate.bind({});
Component.story = {
  name: "Form",
  args: {},
};
