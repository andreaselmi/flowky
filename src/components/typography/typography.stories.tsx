import type { Meta, StoryObj } from "@storybook/react-vite";

import Typography from "./typography";

const meta: Meta<typeof Typography> = {
	title: "Typography",
	component: Typography,
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
	args: {
		variant: "h1",
		children: "Typography 1",
	},
};

export const H2: Story = {
	args: {
		variant: "h2",
		children: "Typography 2",
	},
};

export const H3: Story = {
	args: {
		variant: "h3",
		children: "Typography 3",
	},
};

export const H4: Story = {
	args: {
		variant: "h4",
		children: "Typography 4",
	},
};

export const H5: Story = {
	args: {
		variant: "h5",
		children: "Typography 5",
	},
};

export const H6: Story = {
	args: {
		variant: "h6",
		children: "Typography 6",
	},
};

export const Body: Story = {
	args: {
		variant: "body",
		children: "Typography Body",
	},
};

export const BodyLarge: Story = {
	args: {
		variant: "bodyLarge",
		children: "Typography Body Large",
	},
};

export const BodySmall: Story = {
	args: {
		variant: "bodySmall",
		children: "Typography Body Small",
	},
};
