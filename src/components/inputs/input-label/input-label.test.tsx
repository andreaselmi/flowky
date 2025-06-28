import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InputLabel from "./input-label";

describe("InputLabel", () => {
	it("renders as a label element", () => {
		render(<InputLabel htmlFor="test-input" text="Test Label" />);

		const label = screen.getByText("Test Label");
		expect(label).toBeInTheDocument();
		expect(label.tagName).toBe("LABEL");
	});

	it("displays the provided text content", () => {
		render(<InputLabel htmlFor="username" text="Username" />);

		expect(screen.getByText("Username")).toBeInTheDocument();
	});

	it("associates label with form control using htmlFor attribute", () => {
		render(<InputLabel htmlFor="email-input" text="Email Address" />);

		const label = screen.getByText("Email Address");
		expect(label).toHaveAttribute("for", "email-input");
	});

	it("uses default bodySmall variant when no variant is specified", () => {
		render(<InputLabel htmlFor="test" text="Default Label" />);

		const label = screen.getByText("Default Label");
		// The component should apply the bodySmall variant styling
		expect(label.className).toContain("bodySmall");
	});

	it("supports different typography variants", () => {
		const { rerender } = render(
			<InputLabel htmlFor="test1" text="Body Label" variant="body" />
		);

		let label = screen.getByText("Body Label");
		expect(label.className).toContain("body");

		rerender(
			<InputLabel
				htmlFor="test2"
				text="Large Label"
				variant="bodyLarge"
			/>
		);

		label = screen.getByText("Large Label");
		expect(label.className).toContain("bodyLarge");

		rerender(
			<InputLabel
				htmlFor="test3"
				text="Small Label"
				variant="bodySmall"
			/>
		);

		label = screen.getByText("Small Label");
		expect(label.className).toContain("bodySmall");
	});

	it("applies custom className alongside default styling", () => {
		render(
			<InputLabel
				htmlFor="custom-input"
				text="Custom Label"
				className="custom-class"
			/>
		);

		const label = screen.getByText("Custom Label");
		expect(label).toHaveClass("custom-class");
		// Should also have the default label styling
		expect(label.className).toContain("label");
	});

	it("passes through additional HTML attributes", () => {
		render(
			<InputLabel
				htmlFor="test-input"
				text="Attributed Label"
				id="test-label"
				data-testid="label-element"
				title="Help text"
			/>
		);

		const label = screen.getByTestId("label-element");
		expect(label).toHaveAttribute("id", "test-label");
		expect(label).toHaveAttribute("title", "Help text");
		expect(label).toHaveAttribute("for", "test-input");
	});

	it("maintains accessibility with proper label association", () => {
		render(
			<div>
				<InputLabel
					htmlFor="accessible-input"
					text="Accessible Label"
				/>
				<input id="accessible-input" type="text" />
			</div>
		);

		const input = screen.getByRole("textbox");
		const label = screen.getByText("Accessible Label");

		// The input should be accessible by the label text
		expect(input).toHaveAccessibleName("Accessible Label");
		expect(label).toHaveAttribute("for", "accessible-input");
	});

	it("works with different input types", () => {
		render(
			<div>
				<InputLabel htmlFor="email" text="Email" />
				<input id="email" type="email" />

				<InputLabel htmlFor="password" text="Password" />
				<input id="password" type="password" />

				<InputLabel htmlFor="tel" text="Phone" />
				<input id="tel" type="tel" />
			</div>
		);

		const emailInput = screen.getByRole("textbox", { name: "Email" });
		const passwordInput = document.getElementById("password");
		const telInput = document.getElementById("tel");

		expect(emailInput).toHaveAccessibleName("Email");
		expect(passwordInput).toHaveAccessibleName("Password");
		expect(telInput).toHaveAccessibleName("Phone");
	});

	it("supports complex text content", () => {
		render(<InputLabel htmlFor="complex-input" text="Required Field *" />);

		expect(screen.getByText("Required Field *")).toBeInTheDocument();
	});

	it("different variants have visually distinct appearances", () => {
		render(
			<div>
				<InputLabel htmlFor="input1" text="Body Label" variant="body" />
				<InputLabel
					htmlFor="input2"
					text="Large Label"
					variant="bodyLarge"
				/>
				<InputLabel
					htmlFor="input3"
					text="Small Label"
					variant="bodySmall"
				/>
			</div>
		);

		const bodyLabel = screen.getByText("Body Label");
		const largeLabel = screen.getByText("Large Label");
		const smallLabel = screen.getByText("Small Label");

		// Each variant should have different CSS classes (indicating different visual styles)
		expect(bodyLabel.className).not.toStrictEqual(largeLabel.className);
		expect(largeLabel.className).not.toStrictEqual(smallLabel.className);
		expect(bodyLabel.className).not.toStrictEqual(smallLabel.className);
	});
});
