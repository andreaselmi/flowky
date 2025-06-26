import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TextInput from "./text-input";

describe("TextInput", () => {
	it("renders as a text input element", () => {
		render(<TextInput />);

		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
		expect(input).toBeEnabled();
	});

	it("displays the provided label text", () => {
		render(<TextInput label="Username" />);

		expect(screen.getByText("Username")).toBeInTheDocument();
	});

	it("associates label with input for accessibility", () => {
		render(<TextInput label="Email Address" id="email-input" />);

		const input = screen.getByRole("textbox");
		const label = screen.getByText("Email Address");

		expect(input).toHaveAccessibleName("Email Address");
		expect(label.closest("label")).toContainElement(input);
	});

	it("works without a label", () => {
		render(<TextInput placeholder="Enter text here" />);

		const input = screen.getByRole("textbox");
		expect(input).toBeInTheDocument();
		expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
	});

	it("accepts user input correctly", async () => {
		render(<TextInput label="Name" />);

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "John Doe");

		expect(input).toHaveValue("John Doe");
	});

	it("can be cleared by user", async () => {
		render(<TextInput label="Message" defaultValue="Initial text" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveValue("Initial text");

		await userEvent.clear(input);
		expect(input).toHaveValue("");
	});

	it("supports different input types", () => {
		render(<TextInput data-testid="email-input" type="email" />);
		let input = screen.getByTestId("email-input");
		expect(input).toHaveAttribute("type", "email");

		render(<TextInput data-testid="password-input" type="password" />);
		input = screen.getByTestId("password-input");
		screen.debug(input);
		expect(input).toHaveAttribute("type", "password");

		render(<TextInput data-testid="tel-input" type="tel" />);
		input = screen.getByTestId("tel-input");
		expect(input).toHaveAttribute("type", "tel");
	});

	it("defaults to text type when no type is specified", () => {
		render(<TextInput />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("type", "text");
	});

	it("supports placeholder text", () => {
		render(<TextInput placeholder="Enter your message..." />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveAttribute("placeholder", "Enter your message...");
	});

	it("can be disabled", async () => {
		render(<TextInput label="Disabled Input" disabled />);

		const input = screen.getByRole("textbox");
		expect(input).toBeDisabled();

		// User should not be able to type in disabled input
		await userEvent.type(input, "This should not work");
		expect(input).toHaveValue("");
	});

	it("can be required", () => {
		render(<TextInput label="Required Field" required />);

		const input = screen.getByRole("textbox");
		expect(input).toBeRequired();
	});

	it("supports controlled input with value prop", async () => {
		const handleChange = vi.fn();
		render(
			<TextInput
				label="Controlled Input"
				value="controlled value"
				onChange={handleChange}
			/>
		);

		const input = screen.getByRole("textbox");
		expect(input).toHaveValue("controlled value");

		await userEvent.type(input, "x");
		expect(handleChange).toHaveBeenCalled();
	});

	it("supports uncontrolled input with defaultValue", () => {
		render(<TextInput label="Uncontrolled Input" defaultValue="default" />);

		const input = screen.getByRole("textbox");
		expect(input).toHaveValue("default");
	});

	it("calls onChange handler when user types", async () => {
		const handleChange = vi.fn();
		render(<TextInput label="Input" onChange={handleChange} />);

		const input = screen.getByRole("textbox");
		await userEvent.type(input, "test");

		expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
	});

	it("calls onFocus handler when input receives focus", async () => {
		const handleFocus = vi.fn();
		render(<TextInput label="Input" onFocus={handleFocus} />);

		const input = screen.getByRole("textbox");
		await userEvent.click(input);

		expect(handleFocus).toHaveBeenCalledTimes(1);
	});

	it("calls onBlur handler when input loses focus", async () => {
		const handleBlur = vi.fn();
		render(
			<div>
				<TextInput label="Input" onBlur={handleBlur} />
				<button>Other element</button>
			</div>
		);

		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button");

		await userEvent.click(input);
		await userEvent.click(button);

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	it("is accessible via keyboard navigation", async () => {
		render(<TextInput label="Keyboard Input" />);

		const input = screen.getByRole("textbox");

		// Input can receive focus
		await userEvent.tab();
		expect(input).toHaveFocus();

		// User can type when focused
		await userEvent.keyboard("Hello");
		expect(input).toHaveValue("Hello");
	});

	it("supports custom className alongside default styling", () => {
		render(<TextInput label="Custom Input" className="custom-class" />);

		const label = screen.getByText("Custom Input").closest("label");
		expect(label).toHaveClass("custom-class");
	});

	it("forwards additional HTML input attributes", () => {
		render(
			<TextInput
				label="Attributed Input"
				data-testid="custom-input"
				maxLength={10}
				minLength={2}
			/>
		);

		const input = screen.getByTestId("custom-input");
		expect(input).toHaveAttribute("maxlength", "10");
		expect(input).toHaveAttribute("minlength", "2");
	});

	it("maintains accessibility when using custom id", () => {
		render(<TextInput label="Custom ID Input" id="custom-id" />);

		const input = screen.getByRole("textbox");
		const label = screen.getByText("Custom ID Input");

		expect(input).toHaveAttribute("id", "custom-id");
		expect(label.closest("label")).toHaveAttribute("for", "custom-id");
	});

	it("integrates all features together correctly", async () => {
		const handleChange = vi.fn();
		const handleFocus = vi.fn();
		const handleBlur = vi.fn();

		render(
			<div>
				<TextInput
					label="Complete Input"
					type="email"
					placeholder="Enter email"
					required
					className="custom-class"
					id="complete-input"
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					data-testid="complete-input"
				/>
				<button>Other element</button>
			</div>
		);

		const input = screen.getByTestId("complete-input");
		const button = screen.getByRole("button");

		// All visual elements are present
		expect(screen.getByText("Complete Input")).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "email");
		expect(input).toHaveAttribute("placeholder", "Enter email");
		expect(input).toBeRequired();
		expect(input).toHaveAccessibleName("Complete Input");

		// All interactions work
		await userEvent.click(input);
		expect(handleFocus).toHaveBeenCalledTimes(1);

		await userEvent.type(input, "test@example.com");
		expect(handleChange).toHaveBeenCalled();
		expect(input).toHaveValue("test@example.com");

		await userEvent.click(button);
		expect(handleBlur).toHaveBeenCalledTimes(1);
	});
});
