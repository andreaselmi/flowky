import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Typography from "./typography";

describe("Typography", () => {
	describe("Basic Rendering", () => {
		it("renders text content correctly", () => {
			render(<Typography variant="body">Hello World</Typography>);

			expect(screen.getByText("Hello World")).toBeInTheDocument();
		});

		it("handles empty content gracefully", () => {
			render(<Typography variant="body" />);

			const element = screen.getByText("", { selector: "p" });
			expect(element).toBeInTheDocument();
			expect(element.className).toContain("body");
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
	});

	describe("Variant Mapping to HTML Elements", () => {
		const variantTestCases = [
			{
				variant: "display" as const,
				expectedElement: "h1",
				expectedLevel: 1,
			},
			{ variant: "h1" as const, expectedElement: "h1", expectedLevel: 1 },
			{ variant: "h2" as const, expectedElement: "h2", expectedLevel: 2 },
			{ variant: "h3" as const, expectedElement: "h3", expectedLevel: 3 },
			{ variant: "h4" as const, expectedElement: "h4", expectedLevel: 4 },
			{ variant: "h5" as const, expectedElement: "h5", expectedLevel: 5 },
			{ variant: "h6" as const, expectedElement: "h6", expectedLevel: 6 },
		];

		const bodyVariantTestCases = [
			{ variant: "body" as const, expectedElement: "p" },
			{ variant: "bodyLarge" as const, expectedElement: "p" },
			{ variant: "bodySmall" as const, expectedElement: "p" },
		];

		variantTestCases.forEach(({ variant, expectedLevel }) => {
			it(`renders ${variant} as h${expectedLevel} heading`, () => {
				render(
					<Typography variant={variant}>{variant} Text</Typography>
				);

				const heading = screen.getByRole("heading", {
					level: expectedLevel,
				});
				expect(heading).toBeInTheDocument();
				expect(heading).toHaveTextContent(`${variant} Text`);
			});
		});

		bodyVariantTestCases.forEach(({ variant, expectedElement }) => {
			it(`renders ${variant} as ${expectedElement} element`, () => {
				render(
					<Typography variant={variant}>{variant} Text</Typography>
				);

				const element = screen.getByText(`${variant} Text`);
				expect(element.tagName).toBe(expectedElement.toUpperCase());
			});
		});
	});

	describe("Custom Component Override", () => {
		it("allows custom HTML element override with component prop", () => {
			render(
				<Typography variant="body" component="span">
					Span Content
				</Typography>
			);

			const element = screen.getByText("Span Content");
			expect(element.tagName).toBe("SPAN");
		});

		it("maintains accessibility with custom components and ARIA attributes", () => {
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

		it("supports all native HTML element props when using custom components", () => {
			render(
				<Typography
					variant="body"
					component="section"
					id="custom-section"
					data-testid="custom-typography"
					aria-label="Custom section"
				>
					Section Content
				</Typography>
			);

			const element = screen.getByTestId("custom-typography");
			expect(element.tagName).toBe("SECTION");
			expect(element).toHaveAttribute("id", "custom-section");
			expect(element).toHaveAttribute("aria-label", "Custom section");
		});
	});

	describe("CSS Classes and Styling", () => {
		const allVariants = [
			"display",
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"body",
			"bodyLarge",
			"bodySmall",
		] as const;

		allVariants.forEach(variant => {
			it(`applies correct CSS class for ${variant} variant`, () => {
				render(<Typography variant={variant}>{variant}</Typography>);

				const element = screen.getByText(variant);
				expect(element.className).toContain(variant);
			});
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

			// Each variant should have different CSS classes
			expect(displayElement.className).not.toStrictEqual(
				h1Element.className
			);
			expect(h1Element.className).not.toStrictEqual(
				bodyElement.className
			);
			expect(bodyElement.className).not.toStrictEqual(
				smallElement.className
			);
		});
	});

	describe("HTML Attributes and Props", () => {
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

		it("forwards all valid HTML attributes to the rendered element", () => {
			render(
				<Typography
					variant="body"
					title="Tooltip text"
					lang="en"
					dir="ltr"
					hidden
					data-custom="custom-value"
				>
					Attributed Text
				</Typography>
			);

			const element = screen.getByText("Attributed Text");
			expect(element).toHaveAttribute("title", "Tooltip text");
			expect(element).toHaveAttribute("lang", "en");
			expect(element).toHaveAttribute("dir", "ltr");
			expect(element).toHaveAttribute("hidden");
			expect(element).toHaveAttribute("data-custom", "custom-value");
		});
	});

	describe("Semantic Structure and Accessibility", () => {
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

		it("maintains heading hierarchy semantics", () => {
			render(
				<article>
					<Typography variant="h1">Article Title</Typography>
					<Typography variant="h2">First Section</Typography>
					<Typography variant="body">Section content</Typography>
					<Typography variant="h3">Subsection</Typography>
					<Typography variant="body">Subsection content</Typography>
				</article>
			);

			const h1 = screen.getByRole("heading", { level: 1 });
			const h2 = screen.getByRole("heading", { level: 2 });
			const h3 = screen.getByRole("heading", { level: 3 });

			expect(h1).toHaveTextContent("Article Title");
			expect(h2).toHaveTextContent("First Section");
			expect(h3).toHaveTextContent("Subsection");
		});

		it("supports ARIA attributes for enhanced accessibility", () => {
			render(
				<Typography
					variant="body"
					role="note"
					aria-live="polite"
					aria-label="Status message"
				>
					Important status update
				</Typography>
			);

			const element = screen.getByText("Important status update");
			expect(element).toHaveAttribute("role", "note");
			expect(element.tagName).toBe("P");
			expect(element).toHaveAttribute("aria-label", "Status message");
		});

		it("render output element when role is status", () => {
			render(
				<Typography
					variant="body"
					role="status"
					aria-live="polite"
					aria-label="Status message"
				>
					Important status update
				</Typography>
			);

			const element = screen.getByText("Important status update");
			expect(element).not.toHaveAttribute("role");
			expect(element.tagName).toBe("OUTPUT");
			expect(element).toHaveAttribute("aria-label", "Status message");
		});
	});

	describe("Edge Cases and Error Handling", () => {
		it("handles null children gracefully", () => {
			expect(() => {
				render(<Typography variant="body">{null}</Typography>);
			}).not.toThrow();

			const element = screen.getByText("", { selector: "p" });
			expect(element).toBeInTheDocument();
		});

		it("handles undefined children gracefully", () => {
			expect(() => {
				render(<Typography variant="body">{undefined}</Typography>);
			}).not.toThrow();

			const element = screen.getByText("", { selector: "p" });
			expect(element).toBeInTheDocument();
		});

		it("handles extremely long text content", () => {
			const longText = "A".repeat(1000);
			render(<Typography variant="body">{longText}</Typography>);

			expect(screen.getByText(longText)).toBeInTheDocument();
		});

		it("handles special characters and unicode", () => {
			const specialText = "Hello 世界! 🌍 & < > \" '";
			render(<Typography variant="body">{specialText}</Typography>);

			expect(screen.getByText(specialText)).toBeInTheDocument();
		});
	});

	describe("Component Integration", () => {
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

		it("works correctly in real-world document structure", () => {
			render(
				<main>
					<Typography variant="h1">Page Title</Typography>
					<Typography variant="bodyLarge">
						Page subtitle or introduction
					</Typography>

					<section>
						<Typography variant="h2">Main Section</Typography>
						<Typography variant="body">
							This is the main content of the section with some{" "}
							<strong>emphasis</strong>.
						</Typography>

						<Typography variant="h3">Subsection</Typography>
						<Typography variant="bodySmall">
							Additional details in smaller text.
						</Typography>
					</section>
				</main>
			);

			// All elements should be present and properly structured
			expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
				"Page Title"
			);
			expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
				"Main Section"
			);
			expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
				"Subsection"
			);

			expect(
				screen.getByText("Page subtitle or introduction")
			).toBeInTheDocument();
			expect(
				screen.getByText(/This is the main content/)
			).toBeInTheDocument();
			expect(
				screen.getByText("Additional details in smaller text.")
			).toBeInTheDocument();

			// Emphasis should be preserved
			expect(screen.getByText("emphasis")).toBeInTheDocument();
		});
	});
});
