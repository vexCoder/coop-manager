import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LoginForm } from "./LoginForm";

export default {
  title: "Auth/Form",
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Form = Template.bind({});
Form.args = {};

export const FormWithUsername = Template.bind({});
FormWithUsername.args = {
  username: "test-username",
};
