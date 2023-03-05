import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ToggleButtonsField } from "./ToggleButtonsField";

export default {
  title: "Forms/ToggleButtons",
  component: ToggleButtonsField,
} as ComponentMeta<typeof ToggleButtonsField>;

const BaseTemplate: ComponentStory<typeof ToggleButtonsField> = (args) => (
  <ToggleButtonsField {...args} />
);

export const Component = BaseTemplate.bind({});
Component.story = {
  name: "ToggleButtons",
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
