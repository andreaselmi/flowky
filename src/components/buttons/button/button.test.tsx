import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./button";

// Mock icon component for testing
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe("Button", () => {
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

	it("displays icon alongside text when icon is provided", () => {
		render(<Button icon={<MockIcon />}>Button with Icon</Button>);

		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		expect(screen.getByText("Button with Icon")).toBeInTheDocument();

		// Both should be within the same button
		const button = screen.getByRole("button");
		expect(button).toContainElement(screen.getByTestId("mock-icon"));
		expect(button).toContainElement(screen.getByText("Button with Icon"));
	});

	it("works without an icon", () => {
		render(<Button>Text Only Button</Button>);

		expect(screen.queryByTestId("mock-icon")).not.toBeInTheDocument();
		expect(screen.getByText("Text Only Button")).toBeInTheDocument();
	});

	it("remains functional when no click handler is provided", () => {
		render(<Button>Static Button</Button>);

		const button = screen.getByRole("button");
		expect(button).toBeEnabled();

		// Should not throw an error when clicked
		expect(() => userEvent.click(button)).not.toThrow();
	});

	it("supports different visual variants", () => {
		render(
			<>
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
			</>
		);
		const primaryButton = screen.getByText("Primary");
		const primaryStyles = primaryButton.className;

		const secondaryButton = screen.getByText("Secondary");
		const secondaryStyles = secondaryButton.className;

		// The buttons should have different visual appearances
		// (This is a behavioral difference that users can observe)
		expect(primaryStyles).not.toStrictEqual(secondaryStyles);
	});

	it("integrates all features together correctly", async () => {
		const handleClick = vi.fn();
		render(
			<Button
				variant="secondary"
				onClick={handleClick}
				icon={<MockIcon />}
			>
				Feature Complete Button
			</Button>
		);

		const button = screen.getByRole("button");

		// User can see all content
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		expect(screen.getByText("Feature Complete Button")).toBeInTheDocument();

		// User can interact with it
		expect(button).toBeEnabled();
		await userEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

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
});
