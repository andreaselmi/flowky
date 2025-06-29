import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Dialog from "./dialog";

// Mock HTMLDialogElement methods for jsdom compatibility
beforeEach(() => {
	// Reset all mocks before each test
	vi.clearAllMocks();

	// Mock showModal to set the open attribute
	HTMLDialogElement.prototype.showModal = vi.fn(function (
		this: HTMLDialogElement
	) {
		this.setAttribute("open", "");
		// Dispatch a custom event to simulate the modal being shown
		this.dispatchEvent(new Event("open"));
	});

	// Mock close to remove the open attribute
	HTMLDialogElement.prototype.close = vi.fn(function (
		this: HTMLDialogElement
	) {
		this.removeAttribute("open");
		// Dispatch a custom event to simulate the modal being closed
		this.dispatchEvent(new Event("close"));
	});

	// Mock the open property getter
	Object.defineProperty(HTMLDialogElement.prototype, "open", {
		get: function (this: HTMLDialogElement) {
			return this.hasAttribute("open");
		},
		configurable: true,
	});
});

describe("Dialog", () => {
	describe("Visibility and Content", () => {
		it("should display dialog content when opened", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Dialog content here</p>
				</Dialog>
			);

			expect(screen.getByRole("dialog")).toBeInTheDocument();
			expect(screen.getByText("Test Dialog")).toBeInTheDocument();
			expect(screen.getByText("Dialog content here")).toBeInTheDocument();
		});

		it("should display dialog title as heading", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="My Dialog Title"
				>
					<p>Content</p>
				</Dialog>
			);

			const heading = screen.getByRole("heading", { level: 2 });
			expect(heading).toHaveTextContent("My Dialog Title");
		});

		it("should render complex content correctly", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Form Dialog"
				>
					<form>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" />
						<button type="submit">Submit</button>
					</form>
				</Dialog>
			);

			expect(screen.getByLabelText("Email")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "Submit" })
			).toBeInTheDocument();
		});
	});

	describe("Close Functionality", () => {
		it("should close dialog when close button is clicked", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button", {
				name: "Close Dialog",
			});
			await user.click(closeButton);

			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should show close button by default", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			expect(
				screen.getByRole("button", { name: "Close Dialog" })
			).toBeInTheDocument();
		});

		it("should hide close button when showCloseIcon is false", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
					showCloseIcon={false}
				>
					<p>Content</p>
				</Dialog>
			);

			expect(
				screen.queryByRole("button", { name: "Close Dialog" })
			).not.toBeInTheDocument();
		});
	});

	describe("User Interactions", () => {
		it("should not close when clicking inside dialog content", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Click me</p>
					<button>Action Button</button>
				</Dialog>
			);

			await user.click(screen.getByText("Click me"));
			await user.click(
				screen.getByRole("button", { name: "Action Button" })
			);

			expect(handleClose).not.toHaveBeenCalled();
		});

		it("should handle form interactions within dialog", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Form Dialog"
				>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username</label>
						<input id="username" type="text" />
						<button type="submit">Submit</button>
					</form>
				</Dialog>
			);

			const input = screen.getByLabelText("Username");
			const submitButton = screen.getByRole("button", { name: "Submit" });

			await user.type(input, "john.doe");
			expect(input).toHaveValue("john.doe");

			await user.click(submitButton);
			expect(handleSubmit).toHaveBeenCalled();
			expect(handleClose).not.toHaveBeenCalled();
		});

		it("should support multiple close button clicks", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button", {
				name: "Close Dialog",
			});

			await user.click(closeButton);
			await user.click(closeButton);
			await user.click(closeButton);

			expect(handleClose).toHaveBeenCalledTimes(3);
			expect(handleClose).toHaveBeenCalledWith(false);
		});
	});

	describe("Keyboard Accessibility", () => {
		it("should support keyboard navigation on close button", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button", {
				name: "Close Dialog",
			});

			await user.tab();
			expect(closeButton).toHaveFocus();

			await user.keyboard("{Enter}");
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should support space key activation on close button", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button", {
				name: "Close Dialog",
			});
			closeButton.focus();

			await user.keyboard(" ");
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should close dialog when Escape key is pressed", async () => {
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");
			fireEvent.keyDown(dialog, {
				key: "Escape",
				code: "Escape",
			});
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should close dialog when Escape key is pressed from any focused element inside", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Form Dialog"
				>
					<form>
						<label htmlFor="username">Username</label>
						<input id="username" type="text" />
						<button type="submit">Submit</button>
					</form>
				</Dialog>
			);

			const input = screen.getByLabelText("Username");
			await user.click(input);

			await user.keyboard("{Escape}");
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should not close dialog on other key presses", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<input type="text" placeholder="Type here" />
				</Dialog>
			);

			const input = screen.getByPlaceholderText("Type here");
			await user.click(input);

			await user.keyboard("{Enter}");
			await user.keyboard("{Tab}");
			await user.keyboard("a");
			await user.keyboard("{Backspace}");

			expect(handleClose).not.toHaveBeenCalled();
		});
	});

	describe("Close on Click Outside", () => {
		it("should close dialog when clicking on backdrop/outside dialog content", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Dialog content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");

			// Click directly on the dialog element (backdrop)
			await user.click(dialog);
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should not close dialog when clicking inside dialog content", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<div>
						<p>Dialog content</p>
						<button>Action</button>
						<input type="text" placeholder="Type here" />
					</div>
				</Dialog>
			);

			// Click on various elements inside the dialog
			await user.click(screen.getByText("Dialog content"));
			await user.click(screen.getByRole("button", { name: "Action" }));
			await user.click(screen.getByPlaceholderText("Type here"));

			expect(handleClose).not.toHaveBeenCalled();
		});

		it("should not close dialog when closeOnClickOutside is false", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
					closeOnClickOutside={false}
				>
					<p>Dialog content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");

			// Click on the backdrop - should not close
			await user.click(dialog);
			expect(handleClose).not.toHaveBeenCalled();
		});

		it("should still close with Escape key when closeOnClickOutside is false", async () => {
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
					closeOnClickOutside={false}
				>
					<p>Dialog content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");
			fireEvent.keyDown(dialog, {
				key: "Escape",
				code: "Escape",
			});
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should handle multiple backdrop clicks correctly", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Dialog content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");

			// Multiple clicks on backdrop
			await user.click(dialog);
			await user.click(dialog);
			await user.click(dialog);

			expect(handleClose).toHaveBeenCalledTimes(3);
			expect(handleClose).toHaveBeenCalledWith(false);
		});

		it("should work correctly in forms with validation errors", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();
			const handleSubmit = vi.fn(e => e.preventDefault());

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Form Dialog"
				>
					<form onSubmit={handleSubmit}>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" required />
						<button type="submit">Submit</button>
						<div role="alert">Email is required</div>
					</form>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");

			// Should still close on backdrop click even with form content and alerts
			await user.click(dialog);
			expect(handleClose).toHaveBeenCalledWith(false);
		});
	});

	describe("Accessibility", () => {
		it("should have proper ARIA attributes", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Accessible Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");
			expect(dialog).toHaveAttribute("aria-modal", "true");
			expect(dialog).toHaveAttribute("aria-labelledby");
		});

		it("should not have aria-labelledby when title is empty", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} setIsOpen={handleClose} title="">
					<p>Content</p>
				</Dialog>
			);

			const dialog = screen.getByRole("dialog");
			expect(dialog).not.toHaveAttribute("aria-labelledby");
		});

		it("should have accessible close button label", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Test Dialog"
				>
					<p>Content</p>
				</Dialog>
			);

			const closeButton = screen.getByRole("button", {
				name: "Close Dialog",
			});
			expect(closeButton).toHaveAccessibleName("Close Dialog");
		});
	});

	describe("Edge Cases", () => {
		it("should handle empty title gracefully", () => {
			const handleClose = vi.fn();
			render(
				<Dialog isOpen={true} setIsOpen={handleClose} title="">
					<p>Content without title</p>
				</Dialog>
			);

			expect(
				screen.getByText("Content without title")
			).toBeInTheDocument();
			expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		});

		it("should handle null children", () => {
			const handleClose = vi.fn();

			expect(() => {
				render(
					<Dialog isOpen={true} setIsOpen={handleClose} title="Test">
						{null}
					</Dialog>
				);
			}).not.toThrow();

			expect(screen.getByText("Test")).toBeInTheDocument();
		});

		it("should handle very long titles", () => {
			const handleClose = vi.fn();
			const longTitle = "A".repeat(100);

			render(
				<Dialog isOpen={true} setIsOpen={handleClose} title={longTitle}>
					<p>Content</p>
				</Dialog>
			);

			const heading = screen.getByRole("heading", { level: 2 });
			expect(heading).toHaveTextContent(longTitle);
		});
	});

	describe("Component Integration", () => {
		it("should work with custom HTML attributes", () => {
			const handleClose = vi.fn();
			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Custom Dialog"
					data-testid="custom-dialog"
					className="custom-class"
				>
					<p>Content</p>
				</Dialog>
			);

			const dialog = screen.getByTestId("custom-dialog");
			expect(dialog).toBeInTheDocument();
			expect(dialog).toHaveClass("custom-class");
		});

		it("should work in realistic usage scenario", async () => {
			const user = userEvent.setup();
			const handleClose = vi.fn();
			const handleSave = vi.fn();

			render(
				<Dialog
					isOpen={true}
					setIsOpen={handleClose}
					title="Save Changes"
				>
					<div>
						<p>Do you want to save your changes?</p>
						<div>
							<button onClick={handleSave}>Save</button>
							<button onClick={() => handleClose(false)}>
								Cancel
							</button>
						</div>
					</div>
				</Dialog>
			);

			expect(
				screen.getByText("Do you want to save your changes?")
			).toBeInTheDocument();

			const saveButton = screen.getByRole("button", { name: "Save" });
			const cancelButton = screen.getByRole("button", { name: "Cancel" });

			await user.click(saveButton);
			expect(handleSave).toHaveBeenCalled();
			expect(handleClose).not.toHaveBeenCalled();

			await user.click(cancelButton);
			expect(handleClose).toHaveBeenCalledWith(false);
		});
	});
});
