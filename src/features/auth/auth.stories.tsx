import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../.storybook/theme-wrapper";
import Auth from ".";

const meta = {
	component: Auth,
	title: "Pages/Auth",
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia di default - tema chiaro
export const Default: Story = {
	name: "Light Theme",
	decorators: [
		Story => {
			return (
				<ThemeWrapper theme="light">
					<Story />
				</ThemeWrapper>
			);
		},
	],
};

// Storia con tema scuro
export const DarkTheme: Story = {
	decorators: [
		Story => {
			return (
				<ThemeWrapper theme="dark">
					<Story />
				</ThemeWrapper>
			);
		},
	],
	play: async () => {},
};
