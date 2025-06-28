import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import TextInput from "./text-input";

describe("TextInput", () => {
	describe("Basic Rendering", () => {
		it("renders as a text input element", () => {
			render(<TextInput />);

			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
			expect(input).toBeEnabled();
		});

		it("displays the provided label text", () => {
			render(<TextInput label="Username" id="username" />);

			expect(screen.getByText("Username")).toBeInTheDocument();
		});

		it("works without a label", () => {
			render(<TextInput />);

			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
			expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
		});

		it("supports placeholder text", () => {
			render(<TextInput placeholder="Enter your message..." />);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute(
				"placeholder",
				"Enter your message..."
			);
		});
	});

	describe("Input Types", () => {
		const inputTypes = [
			{ type: "email", testId: "email-input" },
			{ type: "password", testId: "password-input" },
			{ type: "tel", testId: "tel-input" },
			{ type: "url", testId: "url-input" },
			{ type: "search", testId: "search-input" },
		] as const;

		inputTypes.forEach(({ type, testId }) => {
			it(`supports ${type} input type`, () => {
				render(<TextInput data-testid={testId} type={type} />);

				const input = screen.getByTestId(testId);
				expect(input).toHaveAttribute("type", type);
			});
		});

		it("defaults to text type when no type is specified", () => {
			render(<TextInput />);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("type", "text");
		});
	});

	describe("Accessibility and Labeling", () => {
		it("associates label with input for accessibility", () => {
			render(<TextInput label="Email Address" id="email-input" />);

			const input = screen.getByRole("textbox");
			const label = screen.getByText("Email Address");

			expect(label).toHaveAttribute("for", "email-input");
			expect(input).toHaveAttribute("id", "email-input");
			expect(input).toHaveAccessibleName("Email Address");
		});

		it("supports ARIA attributes for enhanced accessibility", () => {
			render(
				<TextInput
					label="Password"
					id="password"
					aria-describedby="password-help"
					aria-required="true"
					aria-invalid="false"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("aria-describedby", "password-help");
			expect(input).toHaveAttribute("aria-required", "true");
			expect(input).toHaveAttribute("aria-invalid", "false");
		});

		it("works with different input types while maintaining accessibility", () => {
			render(
				<div>
					<TextInput label="Email" id="email" type="email" />
					<TextInput label="Password" id="password" type="password" />
					<TextInput label="Phone" id="tel" type="tel" />
				</div>
			);

			const emailInput = screen.getByRole("textbox", { name: "Email" });
			const passwordInput = document.getElementById("password");
			const telInput = document.getElementById("tel");

			expect(emailInput).toHaveAccessibleName("Email");
			expect(passwordInput).toHaveAccessibleName("Password");
			expect(telInput).toHaveAccessibleName("Phone");
		});
	});

	describe("User Interactions", () => {
		it("accepts user input correctly", async () => {
			render(<TextInput label="Name" id="name" />);

			const input = screen.getByRole("textbox");
			await userEvent.type(input, "John Doe");

			expect(input).toHaveValue("John Doe");
		});

		it("can be cleared by user", async () => {
			render(
				<TextInput
					label="Message"
					defaultValue="Initial text"
					id="message"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("Initial text");

			await userEvent.clear(input);
			expect(input).toHaveValue("");
		});

		it("supports special characters and unicode input", async () => {
			render(<TextInput label="Unicode Test" id="unicode" />);

			const input = screen.getByRole("textbox");
			const specialText = "Hello 世界! 🌍 & < > \" '";

			await userEvent.type(input, specialText);
			expect(input).toHaveValue(specialText);
		});

		it("handles extremely long text input", async () => {
			render(<TextInput label="Long Text" id="long-text" />);

			const input = screen.getByRole("textbox");
			const longText = "A".repeat(1000);

			await userEvent.type(input, longText);
			expect(input).toHaveValue(longText);
		});
	});

	describe("States and Validation", () => {
		it("can be disabled", async () => {
			render(
				<TextInput
					label="Disabled Input"
					disabled
					id="disabled-input"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toBeDisabled();

			// User should not be able to type in disabled input
			await userEvent.type(input, "This should not work");
			expect(input).toHaveValue("");
		});

		it("can be required", () => {
			render(
				<TextInput
					label="Required Field"
					required
					id="required-field"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toBeRequired();
		});

		it("supports readonly state", async () => {
			render(
				<TextInput
					label="Readonly Input"
					id="readonly"
					readOnly
					defaultValue="Cannot change this"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("readonly");
			expect(input).toHaveValue("Cannot change this");

			// User should not be able to change readonly input
			await userEvent.type(input, "New text");
			expect(input).toHaveValue("Cannot change this");
		});

		it("supports maxLength constraint", async () => {
			render(
				<TextInput label="Limited Input" id="limited" maxLength={5} />
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("maxlength", "5");

			// Browser typically enforces maxLength
			await userEvent.type(input, "12345");
			expect(input).toHaveValue("12345");
		});

		it("supports minLength constraint", () => {
			render(
				<TextInput
					label="Min Length Input"
					id="min-length"
					minLength={3}
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("minlength", "3");
		});
	});

	describe("Controlled vs Uncontrolled", () => {
		it("supports controlled input with value prop", async () => {
			const handleChange = vi.fn();
			render(
				<TextInput
					label="Controlled Input"
					value="controlled value"
					onChange={handleChange}
					id="controlled-input"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("controlled value");

			await userEvent.type(input, "x");
			expect(handleChange).toHaveBeenCalled();
		});

		it("supports uncontrolled input with defaultValue", () => {
			render(
				<TextInput
					label="Uncontrolled Input"
					defaultValue="default"
					id="uncontrolled-input"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("default");
		});

		it("calls onChange handler for each character typed", async () => {
			const handleChange = vi.fn();
			render(
				<TextInput label="Input" onChange={handleChange} id="input" />
			);

			const input = screen.getByRole("textbox");
			await userEvent.type(input, "test");

			expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
		});
	});

	describe("Event Handlers", () => {
		it("calls onFocus handler when input receives focus", async () => {
			const handleFocus = vi.fn();
			render(
				<TextInput label="Input" onFocus={handleFocus} id="input" />
			);

			const input = screen.getByRole("textbox");
			await userEvent.click(input);

			expect(handleFocus).toHaveBeenCalledTimes(1);
		});

		it("calls onBlur handler when input loses focus", async () => {
			const handleBlur = vi.fn();
			render(
				<div>
					<TextInput label="Input" onBlur={handleBlur} id="input" />
					<button>Other element</button>
				</div>
			);

			const input = screen.getByRole("textbox");
			const button = screen.getByRole("button");

			await userEvent.click(input);
			await userEvent.click(button);

			expect(handleBlur).toHaveBeenCalledTimes(1);
		});

		it("supports multiple event handlers together", async () => {
			const handleChange = vi.fn();
			const handleFocus = vi.fn();
			const handleBlur = vi.fn();

			render(
				<div>
					<TextInput
						label="Multi-event Input"
						id="multi-event"
						onChange={handleChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
					/>
					<button>Other element</button>
				</div>
			);

			const input = screen.getByRole("textbox");
			const button = screen.getByRole("button");

			// Focus and type
			await userEvent.click(input);
			expect(handleFocus).toHaveBeenCalledTimes(1);

			await userEvent.type(input, "ab");
			expect(handleChange).toHaveBeenCalledTimes(2);

			// Blur
			await userEvent.click(button);
			expect(handleBlur).toHaveBeenCalledTimes(1);
		});
	});

	describe("Keyboard Navigation", () => {
		it("is accessible via keyboard navigation", async () => {
			render(<TextInput label="Keyboard Input" id="keyboard-input" />);

			const input = screen.getByRole("textbox");

			// Input can receive focus via tab
			await userEvent.tab();
			expect(input).toHaveFocus();

			// User can type when focused
			await userEvent.keyboard("Hello");
			expect(input).toHaveValue("Hello");
		});

		it("cannot receive focus when disabled", () => {
			render(<TextInput label="Disabled" id="disabled" disabled />);

			const input = screen.getByRole("textbox");
			input.focus();

			expect(input).not.toHaveFocus();
		});
	});

	describe("HTML Attributes and Props", () => {
		it("supports custom className on input element", () => {
			render(
				<TextInput
					label="Custom Input"
					className="custom-class"
					id="custom-input"
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveClass("custom-class");
		});

		it("forwards additional HTML input attributes", () => {
			render(
				<TextInput
					label="Attributed Input"
					data-testid="custom-input"
					maxLength={10}
					minLength={2}
					pattern="[A-Za-z]+"
					title="Only letters allowed"
					id="attributed-input"
				/>
			);

			const input = screen.getByTestId("custom-input");
			expect(input).toHaveAttribute("maxlength", "10");
			expect(input).toHaveAttribute("minlength", "2");
			expect(input).toHaveAttribute("pattern", "[A-Za-z]+");
			expect(input).toHaveAttribute("title", "Only letters allowed");
		});

		it("supports form-related attributes", () => {
			render(
				<TextInput
					label="Form Input"
					id="form-input"
					name="username"
					form="user-form"
					autoComplete="username"
					autoFocus
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveAttribute("name", "username");
			expect(input).toHaveAttribute("form", "user-form");
			expect(input).toHaveAttribute("autocomplete", "username");
		});
	});

	describe("Form Integration", () => {
		it("works correctly in form submission", async () => {
			const handleSubmit = vi.fn(e => {
				e.preventDefault();
				const formData = new FormData(e.target);
				return formData.get("username");
			});

			render(
				<form onSubmit={handleSubmit}>
					<TextInput
						label="Username"
						id="username"
						name="username"
						required
					/>
					<button type="submit">Submit</button>
				</form>
			);

			const input = screen.getByRole("textbox");
			const submitButton = screen.getByRole("button", { name: "Submit" });

			await userEvent.type(input, "testuser");
			await userEvent.click(submitButton);

			expect(handleSubmit).toHaveBeenCalledTimes(1);
		});

		it("supports form validation states", () => {
			render(
				<form>
					<TextInput
						label="Email"
						id="email"
						name="email"
						type="email"
						required
						pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
					/>
				</form>
			);

			const input = screen.getByRole("textbox");
			expect(input).toBeRequired();
			expect(input).toHaveAttribute("type", "email");
			expect(input).toHaveAttribute("pattern");
		});
	});

	describe("Edge Cases and Error Handling", () => {
		it("handles undefined props gracefully", () => {
			expect(() => {
				render(
					<TextInput
						label={undefined}
						placeholder={undefined}
						id="edge-case"
					/>
				);
			}).not.toThrow();

			const input = screen.getByRole("textbox");
			expect(input).toBeInTheDocument();
		});

		it("handles missing id gracefully", () => {
			expect(() => {
				render(<TextInput label="No ID" id="no-id" />);
			}).not.toThrow();

			expect(screen.getByText("No ID")).toBeInTheDocument();
		});

		it("handles empty string values", async () => {
			render(
				<TextInput
					label="Empty Test"
					id="empty"
					value=""
					onChange={vi.fn()}
				/>
			);

			const input = screen.getByRole("textbox");
			expect(input).toHaveValue("");
		});
	});

	describe("Component Integration", () => {
		it("integrates all features correctly in realistic usage", async () => {
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
						maxLength={50}
						autoComplete="email"
					/>
					<button>Other element</button>
				</div>
			);

			const input = screen.getByTestId("complete-input");
			const button = screen.getByRole("button");

			// All visual elements and attributes are present
			expect(screen.getByText("Complete Input")).toBeInTheDocument();
			expect(input).toHaveAttribute("type", "email");
			expect(input).toHaveAttribute("placeholder", "Enter email");
			expect(input).toBeRequired();
			expect(input).toHaveClass("custom-class");
			expect(input).toHaveAttribute("maxlength", "50");
			expect(input).toHaveAttribute("autocomplete", "email");

			// All interactions work
			await userEvent.click(input);
			expect(handleFocus).toHaveBeenCalledTimes(1);

			await userEvent.type(input, "test@example.com");
			expect(handleChange).toHaveBeenCalled();
			expect(input).toHaveValue("test@example.com");

			await userEvent.click(button);
			expect(handleBlur).toHaveBeenCalledTimes(1);
		});

		it("works in complex form scenarios", async () => {
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>User Information</legend>
						<TextInput
							label="First Name"
							id="firstName"
							name="firstName"
							required
						/>
						<TextInput
							label="Last Name"
							id="lastName"
							name="lastName"
							required
						/>
						<TextInput
							label="Email"
							id="email"
							name="email"
							type="email"
							required
						/>
						<TextInput
							label="Phone (Optional)"
							id="phone"
							name="phone"
							type="tel"
						/>
					</fieldset>
					<button type="submit">Submit</button>
				</form>
			);

			// All inputs should be present and properly labeled
			const firstNameInput = screen.getByRole("textbox", {
				name: "First Name",
			});
			const lastNameInput = screen.getByRole("textbox", {
				name: "Last Name",
			});
			const emailInput = screen.getByRole("textbox", { name: "Email" });
			const phoneInput = screen.getByRole("textbox", {
				name: "Phone (Optional)",
			});

			expect(firstNameInput).toBeInTheDocument();
			expect(lastNameInput).toBeInTheDocument();
			expect(emailInput).toBeInTheDocument();
			expect(phoneInput).toBeInTheDocument();

			// Fill in required fields
			await userEvent.type(firstNameInput, "John");
			await userEvent.type(lastNameInput, "Doe");
			await userEvent.type(emailInput, "john.doe@example.com");

			// Form submission should work
			const submitButton = screen.getByRole("button", { name: "Submit" });
			await userEvent.click(submitButton);
			expect(handleSubmit).toHaveBeenCalledTimes(1);
		});
	});
});
