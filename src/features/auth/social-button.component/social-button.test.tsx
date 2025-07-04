import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import SocialButton from "./social-button";

const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe("SocialButton", () => {
	describe("Core Functionality", () => {
		it("renders as a button with the provided label and icon", () => {
			render(
				<SocialButton
					onClick={() => null}
					label="Sign in with Google"
					icon={<MockIcon />}
				/>
			);

			const button = screen.getByRole("button", {
				name: /sign in with google/i,
			});
			expect(button).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

			// Both should be within the same button
			expect(button).toContainElement(screen.getByTestId("mock-icon"));
		});

		it("always uses secondary variant (SocialButton specific behavior)", () => {
			render(
				<SocialButton
					onClick={() => null}
					label="Social Button"
					icon={<MockIcon />}
				/>
			);

			const button = screen.getByRole("button");
			expect(button.className).toContain("secondary");
		});

		it("supports different social providers with custom icons", () => {
			const GoogleIcon = () => <span data-testid="google-icon">G</span>;
			const FacebookIcon = () => (
				<span data-testid="facebook-icon">f</span>
			);

			const { rerender } = render(
				<SocialButton
					label="Continue with Google"
					icon={<GoogleIcon />}
					onClick={() => null}
				/>
			);

			expect(
				screen.getByRole("button", { name: /continue with google/i })
			).toBeInTheDocument();
			expect(screen.getByTestId("google-icon")).toBeInTheDocument();

			rerender(
				<SocialButton
					label="Continue with Facebook"
					icon={<FacebookIcon />}
					onClick={() => null}
				/>
			);

			expect(
				screen.getByRole("button", { name: /continue with facebook/i })
			).toBeInTheDocument();
			expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
		});
	});

	describe("Props Integration", () => {
		it("forwards click handler and other props correctly to Button component", async () => {
			const handleClick = vi.fn();
			const user = userEvent.setup();

			render(
				<SocialButton
					label="Clickable Social Button"
					icon={<MockIcon />}
					onClick={handleClick}
					id="social-test"
					data-testid="social-button"
				/>
			);

			const button = screen.getByTestId("social-button");
			expect(button).toHaveAttribute("id", "social-test");

			await user.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("forwards disabled state to underlying Button", () => {
			render(
				<SocialButton
					onClick={() => null}
					label="Disabled Social Button"
					icon={<MockIcon />}
					disabled
				/>
			);

			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
		});
	});

	describe("Component Structure", () => {
		it("maintains proper icon and text relationship", () => {
			render(
				<SocialButton
					onClick={() => null}
					label="Icon Positioning Test"
					icon={<MockIcon />}
				/>
			);

			const button = screen.getByRole("button");
			const icon = screen.getByTestId("mock-icon");
			const text = screen.getByText("Icon Positioning Test");

			// Verify both elements are children of the button
			expect(button).toContainElement(icon);
			expect(button).toContainElement(text);
		});

		it("handles empty label gracefully", () => {
			render(
				<SocialButton
					onClick={() => null}
					label=""
					icon={<MockIcon />}
				/>
			);

			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});
	});
});

// Note: Detailed tests for disabled behavior, keyboard accessibility,
// multiple clicks, and other Button features are covered in button.test.tsx
// This test file focuses only on SocialButton-specific functionality
