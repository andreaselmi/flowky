import type { Meta, StoryObj } from "@storybook/react-vite";

import ToggleThemeButton from "./toggle-theme-button";

const meta = {
	component: ToggleThemeButton,
	title: "ToggleThemeButton",
	tags: ["autodocs"],
} satisfies Meta<typeof ToggleThemeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {
		onClick: () => {},
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
	},
	decorators: [
		Story => (
			<div
				className="dark"
				style={{
					backgroundColor: "rgba(0, 0, 0, 0.9)",
					height: "100px",
					padding: "1rem",
				}}
			>
				<Story args={{ style: { transform: `rotate(180deg)` } }} />
			</div>
		),
	],
};
