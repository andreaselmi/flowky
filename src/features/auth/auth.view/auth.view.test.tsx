import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render } from "@/test/renderWithProviders";

import AuthView from "./auth.view";

// Mock the icon components
vi.mock("@/components/icons/facebook", () => ({
	default: () => <span data-testid="facebook-icon">FB</span>,
}));

vi.mock("@/components/icons/google", () => ({
	default: () => <span data-testid="google-icon">G</span>,
}));

const defaultProps = {
	toggleTheme: vi.fn(),
	theme: "light",
	handleGoogleSignIn: vi.fn(),
	handleFacebookSignIn: vi.fn(),
	loading: false,
};

describe("AuthView", () => {
	describe("Loading State", () => {
		it("should display loading message when loading is true", () => {
			render(<AuthView {...defaultProps} loading={true} />);

			expect(screen.getByText("Auth Loading...")).toBeInTheDocument();
		});

		it("should not display main content when loading is true", () => {
			render(<AuthView {...defaultProps} loading={true} />);

			expect(
				screen.queryByRole("heading", { name: "Flowky" })
			).not.toBeInTheDocument();
		});
	});

	describe("Content and Layout", () => {
		it("should display the main page title and subtitle", () => {
			render(<AuthView {...defaultProps} />);

			expect(
				screen.getByRole("heading", { name: "Flowky" })
			).toBeInTheDocument();
			expect(
				screen.getByText("Traccia la tua produttività")
			).toBeInTheDocument();
		});

		it("should display the authentication card with correct heading and description", () => {
			render(<AuthView {...defaultProps} />);

			expect(
				screen.getByRole("heading", { name: "Entra in Flowky" })
			).toBeInTheDocument();
			expect(
				screen.getByText(
					"Usa il tuo account social per iniziare a tracciare le tue attività"
				)
			).toBeInTheDocument();
		});

		it("should show the divider text about security", () => {
			render(<AuthView {...defaultProps} />);

			expect(
				screen.getByText("Semplice, veloce e sicuro")
			).toBeInTheDocument();
		});

		it("should display terms of service and privacy policy text", () => {
			render(<AuthView {...defaultProps} />);

			expect(
				screen.getByText(/Accedendo accetti i nostri/)
			).toBeInTheDocument();
			expect(screen.getByText("Termini di Servizio")).toBeInTheDocument();
			expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
		});

		it("should show the footer copyright text", () => {
			render(<AuthView {...defaultProps} />);

			expect(
				screen.getByText(
					"© 2025 Flowky. Designed with ❤️ for productivity."
				)
			).toBeInTheDocument();
		});
	});

	describe("Social Login Buttons", () => {
		it("should display Google login button with correct label and icon", () => {
			render(<AuthView {...defaultProps} />);

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});
			expect(googleButton).toBeInTheDocument();
			expect(screen.getByTestId("google-icon")).toBeInTheDocument();
		});

		it("should display Facebook login button with correct label and icon", () => {
			render(<AuthView {...defaultProps} />);

			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});
			expect(facebookButton).toBeInTheDocument();
			expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
		});

		it("should call handleGoogleSignIn when Google button is clicked", async () => {
			const user = userEvent.setup();
			const mockHandleGoogleSignIn = vi.fn();

			render(
				<AuthView
					{...defaultProps}
					handleGoogleSignIn={mockHandleGoogleSignIn}
				/>
			);

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});

			await user.click(googleButton);

			expect(mockHandleGoogleSignIn).toHaveBeenCalledOnce();
		});

		it("should call handleFacebookSignIn when Facebook button is clicked", async () => {
			const user = userEvent.setup();
			const mockHandleFacebookSignIn = vi.fn();

			render(
				<AuthView
					{...defaultProps}
					handleFacebookSignIn={mockHandleFacebookSignIn}
				/>
			);

			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});

			await user.click(facebookButton);

			expect(mockHandleFacebookSignIn).toHaveBeenCalledOnce();
		});

		it("should render both social buttons as enabled", () => {
			render(<AuthView {...defaultProps} />);

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});
			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});

			expect(googleButton).toBeEnabled();
			expect(facebookButton).toBeEnabled();
		});
	});

	describe("Accessibility", () => {
		it("should have proper heading hierarchy", () => {
			render(<AuthView {...defaultProps} />);

			const h1 = screen.getByRole("heading", { level: 1 });
			const h2 = screen.getByRole("heading", { level: 2 });

			expect(h1).toHaveTextContent("Flowky");
			expect(h2).toHaveTextContent("Entra in Flowky");
		});

		it("should allow keyboard navigation to social buttons", async () => {
			const user = userEvent.setup();
			render(<AuthView {...defaultProps} />);

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});
			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});

			// Focus the first button
			googleButton.focus();
			expect(googleButton).toHaveFocus();

			// Tab to next button
			await user.tab();
			expect(facebookButton).toHaveFocus();
		});

		it("should be activatable with keyboard", async () => {
			const user = userEvent.setup();
			const mockHandleGoogleSignIn = vi.fn();

			render(
				<AuthView
					{...defaultProps}
					handleGoogleSignIn={mockHandleGoogleSignIn}
				/>
			);

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});

			googleButton.focus();
			await user.keyboard("{Enter}");

			expect(mockHandleGoogleSignIn).toHaveBeenCalledOnce();
		});
	});

	describe("Theme Variations", () => {
		it("should render correctly with light theme", () => {
			render(<AuthView {...defaultProps} theme="light" />);

			expect(
				screen.getByRole("heading", { name: "Flowky" })
			).toBeInTheDocument();
		});

		it("should render correctly with dark theme", () => {
			render(<AuthView {...defaultProps} theme="dark" />);

			expect(
				screen.getByRole("heading", { name: "Flowky" })
			).toBeInTheDocument();
		});
	});
});
