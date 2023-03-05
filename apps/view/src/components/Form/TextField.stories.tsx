import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextField } from "./TextField";

export default {
  title: "Forms/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

const BaseTemplate: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Component = BaseTemplate.bind({});
Component.story = {
  name: "TextField",
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const ErrorComponent = BaseTemplate.bind({});
ErrorComponent.story = {
  name: "w/error",
  args: {
    label: "Label",
    error: "Error Message",
  },
};
