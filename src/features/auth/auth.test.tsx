import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuthProvider from "@/context/auth/auth-provider/auth-provider";
import ThemeProvider from "@/context/theme/theme-provider/theme-provider";

import Auth from "./auth";

vi.mock("firebase/auth", () => ({
	onAuthStateChanged: vi.fn((_, callback) => {
		callback(null);
		return vi.fn();
	}),
	GoogleAuthProvider: vi.fn(),
	getAuth: vi.fn(),
	signInWithPopup: vi.fn(),
}));

// Mock the icon components
vi.mock("@/components/icons/facebook", () => ({
	default: () => <span data-testid="facebook-icon">FB</span>,
}));

vi.mock("@/components/icons/google", () => ({
	default: () => <span data-testid="google-icon">G</span>,
}));

// Custom render with theme provider
const renderWithProviders = ({ element }: { element: React.ReactNode }) => {
	return render(
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>{element}</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
};

// Mock localStorage for theme functionality
const mockLocalStorage = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
	value: mockLocalStorage,
});

describe("Auth", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockLocalStorage.getItem.mockReturnValue(null);

		// Mock document.documentElement.classList
		Object.defineProperty(document.documentElement, "classList", {
			value: {
				add: vi.fn(),
				remove: vi.fn(),
			},
			writable: true,
		});
	});

	describe("Content and Layout", () => {
		it("displays the main page title and subtitle", async () => {
			renderWithProviders({ element: <Auth /> });

			await waitFor(() => {
				expect(
					screen.getByRole("heading", { name: "Flowky" })
				).toBeInTheDocument();
				expect(
					screen.getByText("Traccia la tua produttività")
				).toBeInTheDocument();
			});
		});

		it("displays the authentication card with correct heading and description", () => {
			renderWithProviders({ element: <Auth /> });

			expect(
				screen.getByRole("heading", { name: "Entra in Flowky" })
			).toBeInTheDocument();
			expect(
				screen.getByText(
					"Usa il tuo account social per iniziare a tracciare le tue attività"
				)
			).toBeInTheDocument();
		});

		it("shows the divider text about security", () => {
			renderWithProviders({ element: <Auth /> });

			expect(
				screen.getByText("Semplice, veloce e sicuro")
			).toBeInTheDocument();
		});

		it("displays terms of service and privacy policy text", () => {
			renderWithProviders({ element: <Auth /> });

			expect(
				screen.getByText(/Accedendo accetti i nostri/)
			).toBeInTheDocument();
			expect(screen.getByText("Termini di Servizio")).toBeInTheDocument();
			expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
		});

		it("shows the footer copyright text", () => {
			renderWithProviders({ element: <Auth /> });

			expect(
				screen.getByText(
					"© 2025 Flowky. Designed with ❤️ for productivity."
				)
			).toBeInTheDocument();
		});
	});

	describe("Social Login Buttons", () => {
		it("displays Google login button with correct label and icon", () => {
			renderWithProviders({ element: <Auth /> });

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});
			expect(googleButton).toBeInTheDocument();
			expect(screen.getByTestId("google-icon")).toBeInTheDocument();
		});

		it("displays Facebook login button with correct label and icon", () => {
			renderWithProviders({ element: <Auth /> });

			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});
			expect(facebookButton).toBeInTheDocument();
			expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
		});

		it("social buttons are clickable", async () => {
			const user = userEvent.setup();
			renderWithProviders({ element: <Auth /> });

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});
			const facebookButton = screen.getByRole("button", {
				name: /continua con facebook/i,
			});

			expect(googleButton).toBeEnabled();
			expect(facebookButton).toBeEnabled();

			await expect(user.click(googleButton)).resolves.not.toThrow();
			await expect(user.click(facebookButton)).resolves.not.toThrow();
		});
	});

	describe("Accessibility", () => {
		it("has proper heading hierarchy", () => {
			renderWithProviders({ element: <Auth /> });

			const h1 = screen.getByRole("heading", { level: 1 });
			const h2 = screen.getByRole("heading", { level: 2 });

			expect(h1).toHaveTextContent("Flowky");
			expect(h2).toHaveTextContent("Entra in Flowky");
		});

		it("social buttons are accessible via keyboard", async () => {
			const user = userEvent.setup();
			renderWithProviders({ element: <Auth /> });

			const googleButton = screen.getByRole("button", {
				name: /continua con google/i,
			});

			// Focus the button
			googleButton.focus();
			expect(googleButton).toHaveFocus();

			// Should be activatable with Enter
			await user.keyboard("{Enter}");
			expect(googleButton).toBeInTheDocument();
		});
	});
});
