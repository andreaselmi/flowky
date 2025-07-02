import type { Meta, StoryObj } from "@storybook/react-vite";

import Providers from "../../../.storybook/providers";
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
				<Providers theme="light">
					<Story />
				</Providers>
			);
		},
	],
};

// Storia con tema scuro
export const DarkTheme: Story = {
	decorators: [
		Story => {
			return (
				<Providers theme="dark">
					<Story />
				</Providers>
			);
		},
	],
	play: async () => {},
};
