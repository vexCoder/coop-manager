import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemberForm } from "./MemberForm";

export default {
  title: "Members/MemberForm",
  component: MemberForm,
} as ComponentMeta<typeof MemberForm>;

const BaseTemplate: ComponentStory<typeof MemberForm> = (args) => (
  <MemberForm {...args} />
);

export const Component = BaseTemplate.bind({});
Component.story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "m1",
    },
  },
};
