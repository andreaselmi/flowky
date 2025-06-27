import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import ToggleThemeButton from "./toggle-theme-button";

describe("ToggleThemeButton", () => {
	it("renders as a clickable button element", () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toBeEnabled();
	});

	it("displays correct accessible label when in light mode", () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

		const button = screen.getByRole("button");
		expect(button).toHaveAccessibleName("Switch to dark mode");
	});

	it("displays correct accessible label when in dark mode", () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={true} />);

		const button = screen.getByRole("button");
		expect(button).toHaveAccessibleName("Switch to light mode");
	});

	it("displays the theme toggle icon", () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

		const button = screen.getByRole("button");
		// Check that the button contains an SVG (Moon icon from lucide-react)
		const icon = button.querySelector("svg");
		expect(icon).toBeInTheDocument();
	});

	it("displays different icons for light and dark modes", () => {
		const handleClick = vi.fn();

		// Render in light mode (should show Moon icon)
		const { rerender } = render(
			<ToggleThemeButton onClick={handleClick} isDarkMode={false} />
		);

		const button = screen.getByRole("button");
		// get the element and store it as a string
		const lightModeIconHTML = button.querySelector("svg")?.outerHTML;

		// Rerender in dark mode (should show Sun icon)
		rerender(<ToggleThemeButton onClick={handleClick} isDarkMode={true} />);

		const darkModeIconHTML = button.querySelector("svg")?.outerHTML;

		// Verify both icons exist and are different
		expect(lightModeIconHTML).toBeDefined();
		expect(darkModeIconHTML).toBeDefined();
		expect(lightModeIconHTML).not.toBe(darkModeIconHTML);
	});

	it("executes click handler when user clicks the button", async () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("can be clicked multiple times", async () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

		const button = screen.getByRole("button");
		await userEvent.click(button);
		await userEvent.click(button);
		await userEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(3);
	});

	it("is accessible via keyboard navigation", async () => {
		const handleClick = vi.fn();
		render(<ToggleThemeButton onClick={handleClick} isDarkMode={false} />);

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

	it("supports additional button attributes", () => {
		const handleClick = vi.fn();
		render(
			<ToggleThemeButton
				onClick={handleClick}
				disabled
				data-testid="custom-toggle"
				isDarkMode={false}
			/>
		);

		const button = screen.getByTestId("custom-toggle");
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("data-testid", "custom-toggle");
	});

	it("maintains accessibility when disabled", () => {
		const handleClick = vi.fn();
		render(
			<ToggleThemeButton
				onClick={handleClick}
				disabled
				isDarkMode={false}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button).toHaveAccessibleName("Switch to dark mode");
	});

	it("does not execute click handler when disabled", async () => {
		const handleClick = vi.fn();
		render(
			<ToggleThemeButton
				onClick={handleClick}
				disabled
				isDarkMode={false}
			/>
		);

		const button = screen.getByRole("button");
		await userEvent.click(button);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("supports custom className alongside default styling", () => {
		const handleClick = vi.fn();
		render(
			<ToggleThemeButton
				onClick={handleClick}
				className="custom-class"
				isDarkMode={false}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("custom-class");
	});
});
