import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./button";

// Mock icon component for testing
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe("Button", () => {
	describe("Rendering and Content", () => {
		it("renders as a clickable button element", () => {
			render(<Button>Click me</Button>);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toBeEnabled();
		});

		it("displays the provided text content", () => {
			render(<Button>My Button Text</Button>);

			expect(screen.getByText("My Button Text")).toBeInTheDocument();
		});

		it("displays icon alongside text when icon is provided", () => {
			render(<Button icon={<MockIcon />}>Button with Icon</Button>);

			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			expect(screen.getByText("Button with Icon")).toBeInTheDocument();

			// Both should be within the same button
			const button = screen.getByRole("button");
			expect(button).toContainElement(screen.getByTestId("mock-icon"));
			expect(button).toContainElement(
				screen.getByText("Button with Icon")
			);
		});

		it("works without an icon", () => {
			render(<Button>Text Only Button</Button>);

			expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
			expect(screen.getByText("Text Only Button")).toBeInTheDocument();
		});

		it("supports complex children content", () => {
			render(
				<Button>
					<span>Complex</span> <strong>Children</strong>
				</Button>
			);

			expect(screen.getByText("Complex")).toBeInTheDocument();
			expect(screen.getByText("Children")).toBeInTheDocument();
		});
	});

	describe("Visual Variants", () => {
		it("defaults to primary variant when no variant is specified", () => {
			render(<Button>Default Button</Button>);

			const button = screen.getByRole("button");
			expect(button.className).toContain("primary");
		});

		it("supports different visual variants", () => {
			render(
				<>
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
				</>
			);

			const primaryButton = screen.getByText("Primary");
			const secondaryButton = screen.getByText("Secondary");

			// The buttons should have different visual appearances
			expect(primaryButton.className).toContain("primary");
			expect(secondaryButton.className).toContain("secondary");
			expect(primaryButton.className).not.toStrictEqual(
				secondaryButton.className
			);
		});

		it("applies base button class to all variants", () => {
			render(
				<>
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
				</>
			);

			const primaryButton = screen.getByText("Primary");
			const secondaryButton = screen.getByText("Secondary");

			expect(primaryButton.className).toContain("button");
			expect(secondaryButton.className).toContain("button");
		});
	});

	describe("User Interactions", () => {
		it("executes click handler when user clicks the button", async () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Clickable Button</Button>);

			const button = screen.getByRole("button");
			await userEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("can be clicked multiple times", async () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Multi-click Button</Button>);

			const button = screen.getByRole("button");
			await userEvent.click(button);
			await userEvent.click(button);
			await userEvent.click(button);

			expect(handleClick).toHaveBeenCalledTimes(3);
		});

		it("remains functional when no click handler is provided", async () => {
			render(<Button>Static Button</Button>);

			const button = screen.getByRole("button");
			expect(button).toBeEnabled();

			// Should not throw an error when clicked
			await expect(userEvent.click(button)).resolves.not.toThrow();
		});

		it("does not execute click handler when disabled", async () => {
			const handleClick = vi.fn();
			render(
				<Button onClick={handleClick} disabled>
					Disabled Button
				</Button>
			);

			const button = screen.getByRole("button");
			expect(button).toBeDisabled();

			await userEvent.click(button);
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe("Keyboard Accessibility", () => {
		it("is accessible via keyboard navigation", async () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Keyboard Accessible</Button>);

			const button = screen.getByRole("button");
			button.focus();

			expect(button).toHaveFocus();

			// User can activate with Enter key
			await userEvent.keyboard("{Enter}");
			expect(handleClick).toHaveBeenCalledTimes(1);

			// User can activate with Space key
			await userEvent.keyboard(" ");
			expect(handleClick).toHaveBeenCalledTimes(2);
		});

		it("can receive keyboard focus when enabled", async () => {
			render(<Button>Focusable Button</Button>);

			const button = screen.getByRole("button");
			await userEvent.tab();

			expect(button).toHaveFocus();
		});

		it("cannot receive keyboard focus when disabled", () => {
			render(<Button disabled>Disabled Button</Button>);

			const button = screen.getByRole("button");
			button.focus();

			expect(button).not.toHaveFocus();
		});
	});

	describe("HTML Attributes and Props", () => {
		it("forwards additional HTML button attributes", () => {
			render(
				<Button
					id="test-button"
					data-testid="custom-button"
					title="Button tooltip"
					aria-label="Custom accessible label"
				>
					Attributed Button
				</Button>
			);

			const button = screen.getByTestId("custom-button");
			expect(button).toHaveAttribute("id", "test-button");
			expect(button).toHaveAttribute("title", "Button tooltip");
			expect(button).toHaveAttribute(
				"aria-label",
				"Custom accessible label"
			);
		});

		it("supports form attributes", () => {
			render(
				<Button
					type="submit"
					form="test-form"
					name="submit-button"
					value="submit"
				>
					Submit Button
				</Button>
			);

			const button = screen.getByRole("button");
			expect(button).toHaveAttribute("type", "submit");
			expect(button).toHaveAttribute("form", "test-form");
			expect(button).toHaveAttribute("name", "submit-button");
			expect(button).toHaveAttribute("value", "submit");
		});

		it("supports disabled state", () => {
			render(<Button disabled>Disabled Button</Button>);

			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(button).toHaveAttribute("disabled");
		});
	});

	describe("Form Integration", () => {
		it("works correctly as a submit button in forms", async () => {
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<form onSubmit={handleSubmit}>
					<input type="text" defaultValue="test data" />
					<Button type="submit">Submit Form</Button>
				</form>
			);

			const submitButton = screen.getByRole("button", {
				name: "Submit Form",
			});
			await userEvent.click(submitButton);

			expect(handleSubmit).toHaveBeenCalledTimes(1);
		});

		it("works correctly as a reset button in forms", async () => {
			render(
				<form>
					<input
						type="text"
						defaultValue="initial value"
						data-testid="test-input"
					/>
					<Button type="reset">Reset Form</Button>
				</form>
			);

			const input = screen.getByTestId("test-input");
			const resetButton = screen.getByRole("button", {
				name: "Reset Form",
			});

			// Change input value
			await userEvent.clear(input);
			await userEvent.type(input, "changed value");
			expect(input).toHaveValue("changed value");

			// Reset form
			await userEvent.click(resetButton);
			expect(input).toHaveValue("initial value");
		});

		it("works correctly as a regular button in forms", async () => {
			const handleClick = vi.fn();
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<form onSubmit={handleSubmit}>
					<input type="text" />
					<Button type="button" onClick={handleClick}>
						Regular Button
					</Button>
					<Button type="submit">Submit</Button>
				</form>
			);

			const regularButton = screen.getByRole("button", {
				name: "Regular Button",
			});
			await userEvent.click(regularButton);

			// Regular button should execute its handler without submitting form
			expect(handleClick).toHaveBeenCalledTimes(1);
			expect(handleSubmit).not.toHaveBeenCalled();
		});
	});

	describe("Edge Cases and Error Handling", () => {
		it("handles null or undefined children gracefully", () => {
			expect(() => {
				render(<Button>{null}</Button>);
			}).not.toThrow();

			expect(() => {
				render(<Button>{undefined}</Button>);
			}).not.toThrow();
		});

		it("handles undefined icon gracefully", () => {
			expect(() => {
				render(
					<Button icon={undefined}>Button with undefined icon</Button>
				);
			}).not.toThrow();

			expect(
				screen.getByText("Button with undefined icon")
			).toBeInTheDocument();
		});

		it("handles undefined onClick gracefully", async () => {
			render(<Button onClick={undefined}>Button</Button>);

			const button = screen.getByRole("button");
			await expect(userEvent.click(button)).resolves.not.toThrow();
		});

		it("handles extremely long text content", () => {
			const longText = "A".repeat(500);
			render(<Button>{longText}</Button>);

			expect(screen.getByText(longText)).toBeInTheDocument();
		});
	});

	describe("Component Integration", () => {
		it("integrates all features correctly in realistic usage", async () => {
			const handleClick = vi.fn();
			render(
				<Button
					variant="secondary"
					onClick={handleClick}
					icon={<MockIcon />}
					id="integrated-button"
					className="custom-class"
					data-testid="feature-complete-button"
				>
					Feature Complete Button
				</Button>
			);

			const button = screen.getByTestId("feature-complete-button");

			// All visual elements should be present
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
			expect(
				screen.getByText("Feature Complete Button")
			).toBeInTheDocument();

			// All attributes should be applied
			expect(button).toHaveAttribute("id", "integrated-button");
			expect(button.className).toContain("secondary");
			expect(button.className).toContain("custom-class");

			// Functionality should work
			expect(button).toBeEnabled();
			await userEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);

			// Keyboard interaction should work
			button.focus();
			expect(button).toHaveFocus();
			await userEvent.keyboard("{Enter}");
			expect(handleClick).toHaveBeenCalledTimes(2);
		});

		it("works correctly with different variants and icons together", () => {
			render(
				<div>
					<Button variant="primary" icon={<MockIcon />}>
						Primary with Icon
					</Button>
					<Button variant="secondary">Secondary Text Only</Button>
				</div>
			);

			const primaryButton = screen.getByText("Primary with Icon");
			const secondaryButton = screen.getByText("Secondary Text Only");

			// Primary button should have icon
			expect(primaryButton.closest("button")).toContainElement(
				screen.getByTestId("mock-icon")
			);

			// Secondary button should not have icon
			expect(secondaryButton.closest("button")).not.toContainElement(
				screen.getByTestId("mock-icon")
			);

			// Both should have appropriate variant classes
			expect(primaryButton.className).toContain("primary");
			expect(secondaryButton.className).toContain("secondary");
		});
	});
});
