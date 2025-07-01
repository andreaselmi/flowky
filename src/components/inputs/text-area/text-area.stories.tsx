import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import TextArea from "./text-area";

const meta = {
	component: TextArea,
	title: "Design-System/Forms/TextArea",
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		placeholder: "Inserisci un testo",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const Resizable: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		resize: "both",
		placeholder: "Inserisci un testo",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};

export const Disabled: Story = {
	args: {
		label: "Text Area",
		id: "text-area",
		disabled: true,
		placeholder: "Inserisci un testo",
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
		label: "Text Area",
		id: "text-area",
		placeholder: "Inserisci un testo",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
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
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
