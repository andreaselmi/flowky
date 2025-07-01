import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import Select from "./select";

const meta = {
	component: Select,
	title: "Design-System/Forms/Select",
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Select",
		id: "select",
		options: [
			{ id: "1", label: "Option 1" },
			{ id: "2", label: "Option 2" },
			{ id: "3", label: "Option 3" },
		],
		onChange: () => {},
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
		label: "",
		id: "select",

		options: [
			{
				id: "1",
				label: "Option 1",
			},
			{
				id: "2",
				label: "Option 2",
			},
			{
				id: "3",
				label: "Option 3",
			},
		],
		onChange: () => {},
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
		label: "Select",
		id: "select",
		options: [{ id: "1", label: "Option 1" }],
		onChange: () => {},
		disabled: true,
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
		label: "Select",
		id: "select",
		options: [{ id: "1", label: "Option 1" }],
		onChange: () => {},
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
		label: "Select",
		id: "select",
		options: [{ id: "1", label: "Option 1" }],
		onChange: () => {},
		disabled: true,
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="dark">
				<Story />
			</ThemeWrapper>
		),
	],
};
