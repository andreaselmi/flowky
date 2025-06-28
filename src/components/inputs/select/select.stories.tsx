import type { Meta, StoryObj } from "@storybook/react-vite";

import Select from "./select";

const meta = {
	component: Select,
	title: "Design-System/Forms/Select",
	tags: ["autodocs"],
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
};

export const Disabled: Story = {
	args: {
		label: "Select",
		id: "select",
		options: [{ id: "1", label: "Option 1" }],
		onChange: () => {},
		disabled: true,
	},
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
			<div className="storybook-dark-container">
				<Story />
			</div>
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
			<div className="storybook-dark-container">
				<Story />
			</div>
		),
	],
};
