import type { Meta, StoryObj } from "@storybook/react-vite";

import Dialog from "./dialog";

const meta: Meta<typeof Dialog> = {
	title: "Design-System/Modals/Dialog",
	component: Dialog,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Light: Story = {
	args: {
		isOpen: true,
		setIsOpen: () => {},
		title: "Dialog Title",
		children: <p>Dialog Content</p>,
	},
	decorators: [
		Story => (
			<div className="storybook-light-container">
				<Story />
			</div>
		),
	],
};

export const Dark: Story = {
	args: {
		isOpen: true,
		setIsOpen: () => {},
		title: "Dialog Title",
		children: <p>Dialog Content</p>,
	},
	decorators: [
		Story => (
			<div className="storybook-dark-container">
				<Story />
			</div>
		),
	],
};
