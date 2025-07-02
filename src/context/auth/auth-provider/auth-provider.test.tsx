import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useAuth from "../use-auth";
import AuthProvider from "./auth-provider";

// Use vi.hoisted to define mocks that can be used in vi.mock factories
const { mockOnAuthStateChanged, mockGetAuth } = vi.hoisted(() => ({
	mockOnAuthStateChanged: vi.fn(),
	mockGetAuth: vi.fn(),
}));

vi.mock("@/helpers/firebase", () => ({
	initializeFirebase: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
	onAuthStateChanged: mockOnAuthStateChanged,
	getAuth: mockGetAuth,
}));

// Types for Firebase user object
interface MockFirebaseUser {
	uid: string;
	email: string | null | undefined;
}

type AuthStateCallback = (user: MockFirebaseUser | null) => void;

// Test component to consume auth context
const TestComponent = () => {
	const { user } = useAuth();

	return (
		<div>
			<div data-testid="auth-status">
				{user ? `Authenticated: ${user.email}` : "Not authenticated"}
			</div>
			<div data-testid="user-id">{user?.id || "No user ID"}</div>
		</div>
	);
};

describe("AuthProvider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockGetAuth.mockReturnValue({});
	});

	describe("Loading State", () => {
		it("should show loading state initially", () => {
			// Setup auth state change that doesn't call callback immediately
			mockOnAuthStateChanged.mockImplementation(() => vi.fn());

			render(
				<AuthProvider>
					<div>Test</div>
				</AuthProvider>
			);

			screen.debug();

			expect(screen.getByText("Loading...")).toBeInTheDocument();
		});

		it("should hide loading state after auth state is determined", async () => {
			// Setup auth state change to call callback with null (signed out)
			mockOnAuthStateChanged.mockImplementation((_, callback) => {
				callback(null);
				return vi.fn(); // unsubscribe function
			});

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			await waitFor(() => {
				expect(
					screen.queryByText("Loading...")
				).not.toBeInTheDocument();
			});
		});
	});

	describe("Authentication States", () => {
		it("should provide null user when not authenticated", async () => {
			mockOnAuthStateChanged.mockImplementation((_, callback) => {
				callback(null);
				return vi.fn();
			});

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Not authenticated"
				);
			});

			expect(screen.getByTestId("user-id")).toHaveTextContent(
				"No user ID"
			);
		});

		it("should provide user data when authenticated", async () => {
			const mockUser = {
				uid: "user123",
				email: "test@example.com",
			};

			mockOnAuthStateChanged.mockImplementation((_, callback) => {
				callback(mockUser);
				return vi.fn();
			});

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Authenticated: test@example.com"
				);
			});

			expect(screen.getByTestId("user-id")).toHaveTextContent("user123");
		});

		it("should handle user with null email", async () => {
			const mockUser = {
				uid: "user123",
				email: null,
			};

			mockOnAuthStateChanged.mockImplementation((_, callback) => {
				callback(mockUser);
				return vi.fn();
			});

			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);

			screen.debug();

			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					/authenticated/i
				);
			});

			expect(screen.getByTestId("user-id")).toHaveTextContent("user123");
		});
	});

	describe("Authentication State Changes", () => {
		it("should update user when auth state changes from signed out to signed in", async () => {
			let authCallback: AuthStateCallback | null = null;
			mockOnAuthStateChanged.mockImplementation(
				(_, callback: AuthStateCallback) => {
					authCallback = callback;
					// Start with signed out state
					callback(null);
					return vi.fn();
				}
			);
			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);
			// Initially should be not authenticated
			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Not authenticated"
				);
			});
			// Simulate user signing in
			const mockUser: MockFirebaseUser = {
				uid: "user123",
				email: "test@example.com",
			};

			await act(() => {
				authCallback?.(mockUser);
			});

			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Authenticated: test@example.com"
				);
			});
		});
		it("should update user when auth state changes from signed in to signed out", async () => {
			let authCallback: AuthStateCallback | null = null;
			mockOnAuthStateChanged.mockImplementation(
				(_, callback: AuthStateCallback) => {
					authCallback = callback;
					// Start with signed in state
					callback({
						uid: "user123",
						email: "test@example.com",
					});
					return vi.fn();
				}
			);
			render(
				<AuthProvider>
					<TestComponent />
				</AuthProvider>
			);
			// Initially should be authenticated
			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Authenticated: test@example.com"
				);
			});
			await act(() => {
				authCallback?.(null);
			});
			await waitFor(() => {
				expect(screen.getByTestId("auth-status")).toHaveTextContent(
					"Not authenticated"
				);
			});
		});
	});

	describe("Context Provider Behavior", () => {
		it("should render children when not loading", async () => {
			mockOnAuthStateChanged.mockImplementation((_, callback) => {
				callback(null);
				return vi.fn();
			});

			render(
				<AuthProvider>
					<div data-testid="child-content">Child Component</div>
				</AuthProvider>
			);

			await waitFor(() => {
				expect(screen.getByTestId("child-content")).toBeInTheDocument();
			});
		});
	});
});
