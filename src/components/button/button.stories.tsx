import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./";

const meta = {
	component: Button,
	title: "Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {
		children: "Light button",
	},
};

export const Dark: Story = {
	args: {
		children: "Dark button",
	},
	decorators: [
		Story => (
			<div className="dark">
				<Story />
			</div>
		),
	],
};
