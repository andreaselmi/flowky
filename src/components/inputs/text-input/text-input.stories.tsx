import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import TextInput from "./text-input";

const meta = {
	component: TextInput,
	title: "Design-System/Forms/TextInput",
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
	args: {
		label: "Minuti",
		type: "number",
		id: "text-input",
		placeholder: "Inserisci un valore",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const WithoutLabel: Story = {
	args: {
		id: "text-input",
		placeholder: "Inserisci un valore",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const DarkWithLabel: Story = {
	args: {
		label: "Minuti",
		type: "number",
		id: "text-input",
		placeholder: "Inserisci un valore",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
