import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Select from "./select";

const mockOptions = [
	{ id: "option1", label: "Option 1" },
	{ id: "option2", label: "Option 2" },
	{ id: "option3", label: "Option 3" },
];

describe("Select", () => {
	it("renders as a select element", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Test Select"
				id="test-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toBeInTheDocument();
		expect(select.tagName).toBe("SELECT");
		expect(select).toBeEnabled();
	});

	it("displays the provided label text", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Choose an option"
				id="option-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		expect(screen.getByText("Choose an option")).toBeInTheDocument();
	});

	it("associates label with select for accessibility", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Category"
				id="category-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		const label = screen.getByText("Category");

		// The label should have htmlFor attribute pointing to select id
		expect(label).toHaveAttribute("for", "category-select");
		expect(select).toHaveAttribute("id", "category-select");

		// The select should be labeled by the label text
		expect(select).toHaveAccessibleName("Category");
	});

	it("renders all provided options", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Test Select"
				id="test-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const options = screen.getAllByRole("option");

		expect(options).toHaveLength(3);
		expect(options[0]).toHaveTextContent("Option 1");
		expect(options[0]).toHaveValue("option1");
		expect(options[1]).toHaveTextContent("Option 2");
		expect(options[1]).toHaveValue("option2");
		expect(options[2]).toHaveTextContent("Option 3");
		expect(options[2]).toHaveValue("option3");
	});

	it("handles user selection correctly", async () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Test Select"
				id="test-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");

		await userEvent.selectOptions(select, "option2");

		expect(handleChange).toHaveBeenCalledWith("option2");
		expect(select).toHaveValue("option2");
	});

	it("calls onChange handler with correct option id", async () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Test Select"
				id="test-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");

		await userEvent.selectOptions(select, "option3");
		expect(handleChange).toHaveBeenCalledWith("option3");

		await userEvent.selectOptions(select, "option1");
		expect(handleChange).toHaveBeenCalledWith("option1");

		expect(handleChange).toHaveBeenCalledTimes(2);
	});

	it("supports controlled select with value prop", async () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Controlled Select"
				id="controlled-select"
				options={mockOptions}
				value="option2"
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toHaveValue("option2");

		await userEvent.selectOptions(select, "option1");
		expect(handleChange).toHaveBeenCalledWith("option1");
	});

	it("supports uncontrolled select with defaultValue", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Uncontrolled Select"
				id="uncontrolled-select"
				options={mockOptions}
				defaultValue="option3"
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toHaveValue("option3");
	});

	it("can be disabled", async () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Disabled Select"
				id="disabled-select"
				options={mockOptions}
				disabled
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toBeDisabled();

		// User should not be able to interact with disabled select
		await userEvent.selectOptions(select, "option2");
		expect(handleChange).not.toHaveBeenCalled();
	});

	it("can be required", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Required Select"
				id="required-select"
				options={mockOptions}
				required
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toBeRequired();
	});

	it("calls onFocus handler when select receives focus", async () => {
		const handleFocus = vi.fn();
		const handleChange = vi.fn();
		render(
			<Select
				label="Focus Test"
				id="focus-select"
				options={mockOptions}
				onFocus={handleFocus}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		await userEvent.click(select);

		expect(handleFocus).toHaveBeenCalledTimes(1);
	});

	it("calls onBlur handler when select loses focus", async () => {
		const handleBlur = vi.fn();
		const handleChange = vi.fn();
		render(
			<div>
				<Select
					label="Blur Test"
					id="blur-select"
					options={mockOptions}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
				<button>Other element</button>
			</div>
		);

		const select = screen.getByRole("combobox");
		const button = screen.getByRole("button");

		await userEvent.click(select);
		await userEvent.click(button);

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it("is accessible via keyboard navigation", async () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Keyboard Test"
				id="keyboard-select"
				options={mockOptions}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");

		// Select can receive focus via keyboard
		await userEvent.tab();
		expect(select).toHaveFocus();

		// Select should be accessible and functional once focused
		// Test that keyboard interaction works by simulating selection
		await userEvent.selectOptions(select, "option2");
		expect(handleChange).toHaveBeenCalledWith("option2");
		expect(select).toHaveValue("option2");
	});

	it("works with empty options array", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Empty Select"
				id="empty-select"
				options={[]}
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		const options = screen.queryAllByRole("option");

		expect(select).toBeInTheDocument();
		expect(options).toHaveLength(0);
	});

	it("works with single option", () => {
		const singleOption = [{ id: "only", label: "Only Option" }];
		const handleChange = vi.fn();
		render(
			<Select
				label="Single Option"
				id="single-select"
				options={singleOption}
				onChange={handleChange}
			/>
		);

		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(1);
		expect(options[0]).toHaveTextContent("Only Option");
		expect(options[0]).toHaveValue("only");
	});

	it("handles options with special characters", () => {
		const specialOptions = [
			{ id: "special1", label: "Option with & ampersand" },
			{ id: "special2", label: "Option with <brackets>" },
			{ id: "special3", label: 'Option with "quotes"' },
		];
		const handleChange = vi.fn();
		render(
			<Select
				label="Special Characters"
				id="special-select"
				options={specialOptions}
				onChange={handleChange}
			/>
		);

		const options = screen.getAllByRole("option");
		expect(options[0]).toHaveTextContent("Option with & ampersand");
		expect(options[1]).toHaveTextContent("Option with <brackets>");
		expect(options[2]).toHaveTextContent('Option with "quotes"');
	});

	it("passes through additional HTML attributes", () => {
		const handleChange = vi.fn();
		render(
			<Select
				label="Attributed Select"
				id="attributed-select"
				options={mockOptions}
				onChange={handleChange}
				data-testid="custom-select"
				title="Help text"
				className="custom-class"
			/>
		);

		const select = screen.getByTestId("custom-select");
		expect(select).toHaveAttribute("title", "Help text");
		expect(select).toHaveClass("custom-class");
	});

	it("maintains correct selection when options change", async () => {
		const handleChange = vi.fn();
		const initialOptions = [
			{ id: "a", label: "Option A" },
			{ id: "b", label: "Option B" },
		];
		const newOptions = [
			{ id: "a", label: "Option A" },
			{ id: "c", label: "Option C" },
		];

		const { rerender } = render(
			<Select
				label="Dynamic Options"
				id="dynamic-select"
				options={initialOptions}
				value="a"
				onChange={handleChange}
			/>
		);

		const select = screen.getByRole("combobox");
		expect(select).toHaveValue("a");

		// Change options but keep the same selected value
		rerender(
			<Select
				label="Dynamic Options"
				id="dynamic-select"
				options={newOptions}
				value="a"
				onChange={handleChange}
			/>
		);

		expect(select).toHaveValue("a");
		expect(screen.getByText("Option A")).toBeInTheDocument();
		expect(screen.getByText("Option C")).toBeInTheDocument();
		expect(screen.queryByText("Option B")).not.toBeInTheDocument();
	});
});
