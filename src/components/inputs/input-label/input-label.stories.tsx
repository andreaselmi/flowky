import type { Meta, StoryObj } from "@storybook/react-vite";

import InputLabel from "./input-label";

const meta = {
	component: InputLabel,
	title: "Design-System/Forms/InputLabel",
	tags: ["autodocs"],
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		htmlFor: "input-label",
		text: "Input Label",
	},
};
