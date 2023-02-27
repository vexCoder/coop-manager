import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Login } from "./Login";

export default {
  title: "Auth/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Layout = Template.bind({});
Layout.args = {};
