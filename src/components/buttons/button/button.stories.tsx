import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from ".";

const meta = {
	component: Button,
	title: "Button",
	tags: ["autodocs"],
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
			<div className="dark">
				<Story />
			</div>
		),
	],
};

export const Secondary: Story = {
	args: {
		children: "Secondary light button",
		variant: "secondary",
	},
};

export const SecondaryDark: Story = {
	args: {
		children: "Secondary dark button",
		variant: "secondary",
	},
	decorators: [
		Story => (
			<div
				className="dark"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.9)",
					padding: "4rem",
				}}
			>
				<Story />
			</div>
		),
	],
};
