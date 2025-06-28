import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TextArea from "./text-area";

describe("TextArea", () => {
	it("renders as a textarea element", () => {
		render(<TextArea label="Message" id="message" />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeInTheDocument();
		expect(textarea.tagName).toBe("TEXTAREA");
		expect(textarea).toBeEnabled();
	});

	it("displays the provided label text", () => {
		render(<TextArea label="Your Message" id="user-message" />);

		expect(screen.getByText("Your Message")).toBeInTheDocument();
	});

	it("associates label with textarea for accessibility", () => {
		render(<TextArea label="Comments" id="comments-field" />);

		const textarea = screen.getByRole("textbox");
		const label = screen.getByText("Comments");

		// The label should have htmlFor attribute pointing to textarea id
		expect(label).toHaveAttribute("for", "comments-field");
		expect(textarea).toHaveAttribute("id", "comments-field");

		// The textarea should be labeled by the label text
		expect(textarea).toHaveAccessibleName("Comments");
	});

	it("accepts user input correctly", async () => {
		render(<TextArea label="Description" id="description" />);

		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, "This is a test message");

		expect(textarea).toHaveValue("This is a test message");
	});

	it("supports multiline text input", async () => {
		render(<TextArea label="Notes" id="notes" />);

		const textarea = screen.getByRole("textbox");
		const multilineText = "Line 1\nLine 2\nLine 3";

		await userEvent.type(textarea, multilineText);

		expect(textarea).toHaveValue(multilineText);
	});

	it("can be cleared by user", async () => {
		render(
			<TextArea
				label="Message"
				defaultValue="Initial content"
				id="message"
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("Initial content");

		await userEvent.clear(textarea);
		expect(textarea).toHaveValue("");
	});

	it("supports placeholder text", () => {
		render(
			<TextArea
				label="Feedback"
				id="feedback"
				placeholder="Please share your thoughts..."
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveAttribute(
			"placeholder",
			"Please share your thoughts..."
		);
	});

	it("can be disabled", async () => {
		render(
			<TextArea
				label="Disabled TextArea"
				disabled
				id="disabled-textarea"
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();

		// User should not be able to type in disabled textarea
		await userEvent.type(textarea, "This should not work");
		expect(textarea).toHaveValue("");
	});

	it("can be required", () => {
		render(
			<TextArea label="Required Field" required id="required-field" />
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeRequired();
	});

	it("supports controlled textarea with value prop", async () => {
		const handleChange = vi.fn();
		render(
			<TextArea
				label="Controlled TextArea"
				value="controlled content"
				onChange={handleChange}
				id="controlled-textarea"
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("controlled content");

		await userEvent.type(textarea, "x");
		expect(handleChange).toHaveBeenCalled();
	});

	it("supports uncontrolled textarea with defaultValue", () => {
		render(
			<TextArea
				label="Uncontrolled TextArea"
				defaultValue="default content"
				id="uncontrolled-textarea"
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveValue("default content");
	});

	it("calls onChange handler when user types", async () => {
		const handleChange = vi.fn();
		render(
			<TextArea label="TextArea" onChange={handleChange} id="textarea" />
		);

		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, "test");

		expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
	});

	it("calls onFocus handler when textarea receives focus", async () => {
		const handleFocus = vi.fn();
		render(
			<TextArea label="TextArea" onFocus={handleFocus} id="textarea" />
		);

		const textarea = screen.getByRole("textbox");
		await userEvent.click(textarea);

		expect(handleFocus).toHaveBeenCalledTimes(1);
	});

	it("calls onBlur handler when textarea loses focus", async () => {
		const handleBlur = vi.fn();
		render(
			<div>
				<TextArea label="TextArea" onBlur={handleBlur} id="textarea" />
				<button>Other element</button>
			</div>
		);

		const textarea = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		await userEvent.click(textarea);
		await userEvent.click(button);

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it("supports different resize behaviors", () => {
		const { rerender } = render(
			<TextArea label="Resizable None" id="resize-none" resize="none" />
		);

		let textarea = screen.getByRole("textbox");
		expect(textarea).toHaveStyle({ resize: "none" });

		rerender(
			<TextArea label="Resizable Both" id="resize-both" resize="both" />
		);
		textarea = screen.getByRole("textbox");
		expect(textarea).toHaveStyle({ resize: "both" });

		rerender(
			<TextArea
				label="Resizable Horizontal"
				id="resize-horizontal"
				resize="horizontal"
			/>
		);
		textarea = screen.getByRole("textbox");
		expect(textarea).toHaveStyle({ resize: "horizontal" });

		rerender(
			<TextArea
				label="Resizable Vertical"
				id="resize-vertical"
				resize="vertical"
			/>
		);
		textarea = screen.getByRole("textbox");
		expect(textarea).toHaveStyle({ resize: "vertical" });
	});

	it("defaults to no resize when resize prop is not specified", () => {
		render(<TextArea label="Default Resize" id="default-resize" />);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveStyle({ resize: "none" });
	});

	it("applies custom className to textarea", () => {
		render(
			<TextArea
				label="Custom TextArea"
				id="custom-textarea"
				className="custom-class"
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toHaveClass("custom-class");
	});

	it("applies custom className to label", () => {
		render(
			<TextArea
				label="Custom Label"
				id="custom-label-textarea"
				labelClassName="custom-label-class"
			/>
		);

		const label = screen.getByText("Custom Label");
		expect(label).toHaveClass("custom-label-class");
	});

	it("passes through additional HTML attributes", () => {
		render(
			<TextArea
				label="Attributed TextArea"
				id="attributed-textarea"
				data-testid="textarea-element"
				rows={5}
				cols={40}
				maxLength={500}
			/>
		);

		const textarea = screen.getByTestId("textarea-element");
		expect(textarea).toHaveAttribute("rows", "5");
		expect(textarea).toHaveAttribute("cols", "40");
		expect(textarea).toHaveAttribute("maxlength", "500");
	});

	it("is accessible via keyboard navigation", async () => {
		render(<TextArea label="Keyboard TextArea" id="keyboard-textarea" />);

		const textarea = screen.getByRole("textbox");

		// TextArea can receive focus
		await userEvent.tab();
		expect(textarea).toHaveFocus();

		// User can type when focused
		await userEvent.keyboard("Hello World");
		expect(textarea).toHaveValue("Hello World");
	});

	it("supports all standard textarea functionality", async () => {
		render(
			<TextArea
				label="Full Featured TextArea"
				id="full-textarea"
				placeholder="Enter your text here..."
				rows={4}
				cols={50}
				maxLength={200}
				required
			/>
		);

		const textarea = screen.getByRole("textbox");

		// All attributes should be present
		expect(textarea).toHaveAttribute(
			"placeholder",
			"Enter your text here..."
		);
		expect(textarea).toHaveAttribute("rows", "4");
		expect(textarea).toHaveAttribute("cols", "50");
		expect(textarea).toHaveAttribute("maxlength", "200");
		expect(textarea).toBeRequired();

		// Should accept input
		await userEvent.type(textarea, "This is a comprehensive test");
		expect(textarea).toHaveValue("This is a comprehensive test");
	});

	it("maintains accessibility when disabled", () => {
		render(
			<TextArea
				label="Disabled Accessible TextArea"
				id="disabled-accessible"
				disabled
			/>
		);

		const textarea = screen.getByRole("textbox");
		expect(textarea).toBeDisabled();
		expect(textarea).toHaveAccessibleName("Disabled Accessible TextArea");
	});

	it("integrates label and textarea correctly", () => {
		render(<TextArea label="Integrated TextArea" id="integrated" />);

		const textarea = screen.getByRole("textbox");
		const label = screen.getByText("Integrated TextArea");

		// Both elements should be present and properly connected
		expect(textarea).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(textarea).toHaveAccessibleName("Integrated TextArea");
		expect(label).toHaveAttribute("for", "integrated");
		expect(textarea).toHaveAttribute("id", "integrated");
	});

	it("handles long text content appropriately", async () => {
		const longText =
			"This is a very long text that should be handled properly by the textarea component. ".repeat(
				10
			);

		render(<TextArea label="Long Text" id="long-text" />);

		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, longText);

		expect(textarea).toHaveValue(longText);
	});

	it("supports form integration", () => {
		render(
			<form data-testid="test-form">
				<TextArea
					label="Form TextArea"
					id="form-textarea"
					name="message"
					required
				/>
			</form>
		);

		const form = screen.getByTestId("test-form");
		const textarea = screen.getByRole("textbox");
		const label = screen.getByText("Form TextArea");

		// All elements should be within the form
		expect(form).toContainElement(textarea);
		expect(form).toContainElement(label);

		// Form attributes should be present
		expect(textarea).toHaveAttribute("name", "message");
		expect(textarea).toBeRequired();
	});
});
