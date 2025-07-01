import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import Dialog from "./dialog";

const meta: Meta<typeof Dialog> = {
	title: "Design-System/Modals/Dialog",
	component: Dialog,
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
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
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
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
