import type { Meta, StoryObj } from "@storybook/react-vite";

import TextInput from "./text-input";

const meta = {
	component: TextInput,
	title: "Design-System/Forms/TextInput",
	tags: ["autodocs"],
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
};

export const WithoutLabel: Story = {
	args: {
		id: "text-input",
		placeholder: "Inserisci un valore",
	},
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
			<div
				className="storybook-dark-container"
				style={{
					backgroundColor: "var(--color-background-primary)",
					height: "100px",
					padding: "1rem",
				}}
			>
				<Story />
			</div>
		),
	],
};
