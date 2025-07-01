import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../.storybook/theme-wrapper";
import ToggleThemeButton from "./toggle-theme-button";

const meta = {
	component: ToggleThemeButton,
	title: "Design-System/Buttons/ToggleThemeButton",
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
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
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
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
