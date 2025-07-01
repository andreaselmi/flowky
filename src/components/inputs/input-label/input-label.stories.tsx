import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeWrapper from "../../../../.storybook/theme-wrapper";
import InputLabel from "./input-label";

const meta = {
	component: InputLabel,
	title: "Design-System/Forms/InputLabel",
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		htmlFor: "input-label",
		text: "Input Label",
	},
	decorators: [
		Story => (
			<ThemeWrapper theme="light">
				<Story />
			</ThemeWrapper>
		),
	],
};
