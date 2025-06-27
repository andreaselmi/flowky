import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Typography from "./typography";

describe("Typography", () => {
	it("renders text content correctly", () => {
		render(<Typography variant="body">Hello World</Typography>);

		expect(screen.getByText("Hello World")).toBeInTheDocument();
	});

	it("renders with correct default HTML element for each variant", () => {
		const { rerender } = render(
			<Typography variant="display">Display Text</Typography>
		);
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

		rerender(<Typography variant="h1">H1 Text</Typography>);
		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

		rerender(<Typography variant="h2">H2 Text</Typography>);
		expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

		rerender(<Typography variant="h3">H3 Text</Typography>);
		expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();

		rerender(<Typography variant="h4">H4 Text</Typography>);
		expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();

		rerender(<Typography variant="h5">H5 Text</Typography>);
		expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();

		rerender(<Typography variant="h6">H6 Text</Typography>);
		expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument();

		rerender(<Typography variant="body">Body Text</Typography>);
		expect(screen.getByText("Body Text").tagName).toBe("P");

		rerender(<Typography variant="bodyLarge">Body Large Text</Typography>);
		expect(screen.getByText("Body Large Text").tagName).toBe("P");

		rerender(<Typography variant="bodySmall">Body Small Text</Typography>);
		expect(screen.getByText("Body Small Text").tagName).toBe("P");
	});

	it("allows custom HTML element override with component prop", () => {
		render(
			<Typography variant="body" component="span">
				Span Content
			</Typography>
		);

		const element = screen.getByText("Span Content");
		expect(element.tagName).toBe("SPAN");
	});

	it("applies correct CSS classes for different variants", () => {
		const { rerender } = render(
			<Typography variant="display">Display</Typography>
		);
		let element = screen.getByText("Display");
		expect(element.className).toContain("display");

		rerender(<Typography variant="h1">Heading 1</Typography>);
		element = screen.getByText("Heading 1");
		expect(element.className).toContain("h1");

		rerender(<Typography variant="h2">Heading 2</Typography>);
		element = screen.getByText("Heading 2");
		expect(element.className).toContain("h2");

		rerender(<Typography variant="body">Body</Typography>);
		element = screen.getByText("Body");
		expect(element.className).toContain("body");

		rerender(<Typography variant="bodyLarge">Body Large</Typography>);
		element = screen.getByText("Body Large");
		expect(element.className).toContain("bodyLarge");

		rerender(<Typography variant="bodySmall">Body Small</Typography>);
		element = screen.getByText("Body Small");
		expect(element.className).toContain("bodySmall");
	});

	it("merges custom className with variant styles", () => {
		render(
			<Typography variant="body" className="custom-class">
				Custom Styled Text
			</Typography>
		);

		const element = screen.getByText("Custom Styled Text");
		expect(element.className).toContain("body");
		expect(element.className).toContain("custom-class");
	});

	it("passes through HTML attributes correctly", () => {
		render(
			<Typography
				variant="body"
				id="test-typography"
				data-testid="typography-element"
				role="text"
			>
				Attributed Text
			</Typography>
		);

		const element = screen.getByTestId("typography-element");
		expect(element).toHaveAttribute("id", "test-typography");
		expect(element).toHaveAttribute("role", "text");
	});

	it("supports complex children content", () => {
		render(
			<Typography variant="body">
				This is <strong>bold</strong> and <em>italic</em> text
			</Typography>
		);

		expect(screen.getByText(/This is/)).toBeInTheDocument();
		expect(screen.getByText("bold")).toBeInTheDocument();
		expect(screen.getByText("italic")).toBeInTheDocument();
	});

	it("handles empty content gracefully", () => {
		render(<Typography variant="body" />);

		// Component should render without crashing
		const element = screen.getByText("", { selector: "p" });
		expect(element).toBeInTheDocument();
		expect(element.className).toContain("body");
	});

	it("maintains accessibility with custom components", () => {
		render(
			<Typography
				variant="h1"
				component="div"
				role="heading"
				aria-level={1}
			>
				Accessible Custom Heading
			</Typography>
		);

		const element = screen.getByRole("heading", { level: 1 });
		expect(element).toBeInTheDocument();
		expect(element.tagName).toBe("DIV");
		expect(element).toHaveTextContent("Accessible Custom Heading");
	});

	it("preserves semantic meaning when using appropriate variants", () => {
		render(
			<div>
				<Typography variant="h1">Main Title</Typography>
				<Typography variant="h2">Section Title</Typography>
				<Typography variant="body">
					Body content that describes the section
				</Typography>
			</div>
		);

		// Document structure should be semantic
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Main Title"
		);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Section Title"
		);
		expect(
			screen.getByText("Body content that describes the section")
		).toBeInTheDocument();
	});

	it("different variants have visually distinct appearances", () => {
		render(
			<div>
				<Typography variant="display">Display Text</Typography>
				<Typography variant="h1">H1 Text</Typography>
				<Typography variant="body">Body Text</Typography>
				<Typography variant="bodySmall">Small Text</Typography>
			</div>
		);

		const displayElement = screen.getByText("Display Text");
		const h1Element = screen.getByText("H1 Text");
		const bodyElement = screen.getByText("Body Text");
		const smallElement = screen.getByText("Small Text");

		// Each variant should have different CSS classes (indicating different visual styles)
		expect(displayElement.className).not.toStrictEqual(h1Element.className);
		expect(h1Element.className).not.toStrictEqual(bodyElement.className);
		expect(bodyElement.className).not.toStrictEqual(smallElement.className);
	});

	it("supports all native HTML element props when using custom components", () => {
		render(
			<Typography
				variant="body"
				component="button"
				type="button"
				disabled
				onClick={() => {}}
			>
				Button Typography
			</Typography>
		);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("type", "button");
		expect(button).toHaveTextContent("Button Typography");
	});

	it("integrates all features together correctly", () => {
		render(
			<Typography
				variant="h2"
				component="section"
				className="custom-section"
				id="main-section"
				data-testid="integrated-typography"
				role="region"
				aria-labelledby="section-title"
			>
				<span id="section-title">Complete Feature Integration</span>
			</Typography>
		);

		const element = screen.getByTestId("integrated-typography");

		// Should have all the specified attributes
		expect(element).toHaveAttribute("id", "main-section");
		expect(element).toHaveAttribute("role", "region");
		expect(element).toHaveAttribute("aria-labelledby", "section-title");

		// Should be the correct HTML element
		expect(element.tagName).toBe("SECTION");

		// Should have both variant and custom classes
		expect(element.className).toContain("h2");
		expect(element.className).toContain("custom-section");

		// Should contain the child content
		expect(element).toContainElement(
			screen.getByText("Complete Feature Integration")
		);
	});
});
