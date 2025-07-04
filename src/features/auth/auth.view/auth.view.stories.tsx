import type { Meta, StoryObj } from "@storybook/react-vite";

import Providers from "../../../../.storybook/providers";
import AuthView from ".";

const meta = {
	component: AuthView,
	title: "Pages/Auth",
} satisfies Meta<typeof AuthView>;

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
	args: {
		toggleTheme: () => {},
		theme: "light",
		handleGoogleSignIn: () => {},
		handleFacebookSignIn: () => {},
		loading: false,
	},
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
	args: {
		toggleTheme: () => {},
		theme: "dark",
		handleGoogleSignIn: () => {},
		handleFacebookSignIn: () => {},
		loading: false,
	},
};
