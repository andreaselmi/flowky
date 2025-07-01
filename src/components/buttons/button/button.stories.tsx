import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import Button from ".";

const meta = {
	component: Button,
	title: "Design-System/Buttons/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary light button",
	},
};

export const PrimaryDark: Story = {
	args: {
		children: "Primary dark button",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const Secondary: Story = {
	args: {
		children: "Secondary light button",
		variant: "secondary",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const SecondaryDark: Story = {
	args: {
		children: "Secondary dark button",
		variant: "secondary",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
