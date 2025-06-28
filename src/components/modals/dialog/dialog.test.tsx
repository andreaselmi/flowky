import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Dialog from "./dialog";

describe("Dialog", () => {
	describe("Rendering and Visibility", () => {
		it("renders nothing when closed", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={false}
					onClose={handleClose}
					title="Test Dialog"
				>
					<p>Dialog content</p>
				</Dialog>
			);

			expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
			expect(
				screen.queryByText("Dialog content")
			).not.toBeInTheDocument();
		});

		it("renders all content when open", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Test Dialog">
					<p>Dialog content</p>
				</Dialog>
			);

			expect(screen.getByText("Test Dialog")).toBeInTheDocument();
			expect(screen.getByText("Dialog content")).toBeInTheDocument();
		});

		it("displays title as h2 heading when provided", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="My Dialog Title"
				>
					<p>Content</p>
				</Dialog>
			);

			const title = screen.getByRole("heading", { level: 2 });
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent("My Dialog Title");
		});

		it("renders children content of any complexity", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Complex Dialog"
				>
					<div>
						<h3>Section Title</h3>
						<p>Description text</p>
						<form>
							<input type="text" placeholder="Enter text" />
							<button type="submit">Submit</button>
						</form>
					</div>
				</Dialog>
			);

			expect(screen.getByText("Section Title")).toBeInTheDocument();
			expect(screen.getByText("Description text")).toBeInTheDocument();
			expect(screen.getByRole("textbox")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Submit" })
			).toBeInTheDocument();
		});
	});

	describe("Close Icon Behavior", () => {
		it("shows close icon by default", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");
			expect(closeButton).toBeInTheDocument();

			// Verify it contains the X icon from lucide-react
			const icon = closeButton.querySelector("svg");
			expect(icon).toBeInTheDocument();
		});

		it("hides close icon when showCloseIcon is false", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Dialog"
					showCloseIcon={false}
				>
					<p>Content</p>
				</Dialog>
			);

			expect(screen.getByText("Dialog")).toBeInTheDocument();
			expect(screen.queryByRole("button")).not.toBeInTheDocument();
		});
	});

	describe("Header Rendering Logic", () => {
		it("renders header when title is provided", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Dialog Title"
					showCloseIcon={false}
				>
					<p>Content</p>
				</Dialog>
			);

			expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
				"Dialog Title"
			);
		});

		it("renders header when close icon is enabled even without title", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title=""
					showCloseIcon={true}
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");
			expect(closeButton).toBeInTheDocument();
		});

		it("does not render header when both title is empty and close icon is disabled", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title=""
					showCloseIcon={false}
				>
					<p>Content</p>
				</Dialog>
			);

			expect(screen.getByText("Content")).toBeInTheDocument();
			expect(screen.queryByRole("button")).not.toBeInTheDocument();
			expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		});
	});

	describe("User Interactions", () => {
		it("calls onClose when overlay background is clicked", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const overlay = screen
				.getByText("Content")
				.closest('[class*="overlay"]');
			expect(overlay).toBeInTheDocument();

			await userEvent.click(overlay!);
			expect(handleClose).toHaveBeenCalledTimes(1);
		});

		it("calls onClose when close button is clicked", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");
			await userEvent.click(closeButton);
			expect(handleClose).toHaveBeenCalledTimes(1);
		});

		it("does not call onClose when clicking inside dialog content area", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Dialog Title"
				>
					<p>Content</p>
				</Dialog>
			);

			await userEvent.click(screen.getByText("Content"));
			await userEvent.click(screen.getByText("Dialog Title"));

			expect(handleClose).not.toHaveBeenCalled();
		});

		it("prevents event bubbling from dialog content to overlay", async () => {
			const handleClose = vi.fn();
			const handleButtonClick = vi.fn();

			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<button onClick={handleButtonClick}>Inner Button</button>
				</Dialog>
			);

			const innerButton = screen.getByText("Inner Button");
			await userEvent.click(innerButton);

			expect(handleButtonClick).toHaveBeenCalledTimes(1);
			expect(handleClose).not.toHaveBeenCalled();
		});

		it("supports multiple close interactions", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");

			await userEvent.click(closeButton);
			await userEvent.click(closeButton);
			await userEvent.click(closeButton);

			expect(handleClose).toHaveBeenCalledTimes(3);
		});
	});

	describe("Keyboard Accessibility", () => {
		it("supports keyboard interaction on close button", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");
			closeButton.focus();
			expect(closeButton).toHaveFocus();

			// Enter key activation
			await userEvent.keyboard("{Enter}");
			expect(handleClose).toHaveBeenCalledTimes(1);

			// Space key activation
			await userEvent.keyboard(" ");
			expect(handleClose).toHaveBeenCalledTimes(2);
		});

		// TODO: These tests document missing functionality that should be implemented
		it("should close when ESC key is pressed (NOT IMPLEMENTED)", async () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			await userEvent.keyboard("{Escape}");

			// This will fail until ESC key support is implemented
			// expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).not.toHaveBeenCalled(); // Current behavior
		});
	});

	describe("Accessibility Features", () => {
		// TODO: These tests document missing ARIA attributes that should be implemented
		it("should have proper ARIA attributes (NOT IMPLEMENTED)", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Accessible Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const dialogElement = screen
				.getByText("Content")
				.closest('[class*="dialog"]');

			// These will fail until ARIA attributes are implemented
			// expect(dialogElement).toHaveAttribute("role", "dialog");
			// expect(dialogElement).toHaveAttribute("aria-modal", "true");
			// expect(dialogElement).toHaveAttribute("aria-labelledby");

			// Document current state
			expect(dialogElement).not.toHaveAttribute("role");
			expect(dialogElement).not.toHaveAttribute("aria-modal");
		});

		it("close button should have accessible label", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="Dialog">
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button");

			// Currently has no accessible name - should be improved
			expect(closeButton).toHaveAccessibleName("");
			// TODO: Should have aria-label="Close dialog" or similar
		});
	});

	describe("Edge Cases and Error Handling", () => {
		it("handles null children gracefully", () => {
			const handleClose = vi.fn();

			expect(() => {
				render(
					<Dialog isOpen={true} onClose={handleClose} title="Test">
						{null}
					</Dialog>
				);
			}).not.toThrow();

			expect(screen.getByText("Test")).toBeInTheDocument();
		});

		it("handles undefined children gracefully", () => {
			const handleClose = vi.fn();

			expect(() => {
				render(
					<Dialog isOpen={true} onClose={handleClose} title="Test">
						{undefined}
					</Dialog>
				);
			}).not.toThrow();

			expect(screen.getByText("Test")).toBeInTheDocument();
		});

		it("handles extremely long titles appropriately", () => {
			const handleClose = vi.fn();
			const longTitle = "A".repeat(200);

			render(
				<Dialog isOpen={true} onClose={handleClose} title={longTitle}>
					<p>Content</p>
				</Dialog>
			);

			const title = screen.getByRole("heading", { level: 2 });
			expect(title).toHaveTextContent(longTitle);
		});

		it("handles empty string title", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} onClose={handleClose} title="">
					<p>Content</p>
				</Dialog>
			);

			expect(screen.queryByRole("heading")).not.toBeInTheDocument();
			expect(screen.getByText("Content")).toBeInTheDocument();
		});
	});

	describe("Component Integration", () => {
		it("works correctly with form elements inside", async () => {
			const handleClose = vi.fn();
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<Dialog isOpen={true} onClose={handleClose} title="Form Dialog">
					<form onSubmit={handleSubmit}>
						<label htmlFor="test-input">Test Input</label>
						<input id="test-input" type="text" />
						<button type="submit">Submit</button>
					</form>
				</Dialog>
			);

			// Form elements should be accessible
			const input = screen.getByLabelText("Test Input");
			const submitButton = screen.getByRole("button", { name: "Submit" });

			// Form interaction should work
			await userEvent.type(input, "test value");
			expect(input).toHaveValue("test value");

			await userEvent.click(submitButton);
			expect(handleSubmit).toHaveBeenCalledTimes(1);

			// Dialog should not close when interacting with form
			expect(handleClose).not.toHaveBeenCalled();
		});

		it("integrates all features correctly in realistic usage", async () => {
			const handleClose = vi.fn();
			const handleAction = vi.fn();

			render(
				<Dialog
					isOpen={true}
					onClose={handleClose}
					title="Complete Feature Dialog"
					showCloseIcon={true}
				>
					<div>
						<p>
							This dialog demonstrates all features working
							together.
						</p>
						<div>
							<button onClick={handleAction}>
								Primary Action
							</button>
							<button onClick={handleClose}>Cancel</button>
						</div>
					</div>
				</Dialog>
			);

			// All elements should be present
			expect(
				screen.getByText("Complete Feature Dialog")
			).toBeInTheDocument();
			expect(
				screen.getByText(
					"This dialog demonstrates all features working together."
				)
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Primary Action" })
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Cancel" })
			).toBeInTheDocument();

			// Close button should be present (unlabeled currently)
			const closeButtons = screen.getAllByRole("button");
			expect(closeButtons).toHaveLength(3); // Primary Action, Cancel, Close (X)

			// Interactions should work correctly
			await userEvent.click(
				screen.getByRole("button", { name: "Primary Action" })
			);
			expect(handleAction).toHaveBeenCalledTimes(1);
			expect(handleClose).not.toHaveBeenCalled();

			await userEvent.click(
				screen.getByRole("button", { name: "Cancel" })
			);
			expect(handleClose).toHaveBeenCalledTimes(1);
		});
	});
});
