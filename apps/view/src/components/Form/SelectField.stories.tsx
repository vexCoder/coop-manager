import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectField } from "./SelectField";

export default {
  title: "Forms/SelectField",
  component: SelectField,
} as ComponentMeta<typeof SelectField>;

const BaseTemplate: ComponentStory<typeof SelectField> = (args) => (
  <SelectField {...args} />
);

const defaultOpts = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

export const Component = BaseTemplate.bind({});
Component.story = {
  name: "SelectField",
  args: {
    label: "Label",
    placeholder: "Placeholder",
    options: defaultOpts,
  },
};

export const ErrorComponent = BaseTemplate.bind({});
ErrorComponent.story = {
  name: "w/error",
  args: {
    label: "Label",
    error: "Error Message",
    options: defaultOpts,
  },
};
