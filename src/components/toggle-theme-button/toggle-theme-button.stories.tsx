import type { Meta, StoryObj } from "@storybook/react-vite";

import ToggleThemeButton from "./toggle-theme-button";

const meta = {
	component: ToggleThemeButton,
	title: "Design-System/Buttons/ToggleThemeButton",
	tags: ["autodocs"],
} satisfies Meta<typeof ToggleThemeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {
		onClick: () => {},
		isDarkMode: false,
	},
	decorators: [
		Story => (
			<div className="light">
				<Story />
			</div>
		),
	],
};

export const Dark: Story = {
	args: {
		onClick: () => {},
		isDarkMode: true,
	},
	decorators: [
		Story => (
			<div className="storybook-dark-container">
				<Story />
			</div>
		),
	],
};
