import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Navigation } from "./Navigation";

export default {
  title: "Dashboard/Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const BaseTemplate: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const Nav = BaseTemplate.bind({});
Nav.story = {
  name: "Navigation",
  args: {
    compact: false,
  },
};

export const Compact = BaseTemplate.bind({});
Compact.story = {
  name: "Compact",
  args: {
    compact: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "m1",
    },
  },
};
