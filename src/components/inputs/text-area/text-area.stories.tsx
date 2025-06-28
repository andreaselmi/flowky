import type { Meta, StoryObj } from "@storybook/react-vite";

import TextArea from "./text-area";

const meta = {
	component: TextArea,
	title: "Design-System/Forms/TextArea",
	tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		placeholder: "Inserisci un testo",
	},
};

export const Resizable: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		resize: "both",
		placeholder: "Inserisci un testo",
	},
};

export const Disabled: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		disabled: true,
		placeholder: "Inserisci un testo",
	},
};

export const Dark: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		placeholder: "Inserisci un testo",
	},
	decorators: [
		Story => (
			<div className="storybook-dark-container">
				<Story />
			</div>
		),
	],
};

export const DarkDisabled: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		disabled: true,
		placeholder: "Inserisci un testo",
	},
	decorators: [
		Story => (
			<div className="storybook-dark-container">
				<Story />
			</div>
		),
	],
};
