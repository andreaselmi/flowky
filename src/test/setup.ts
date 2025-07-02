import "@testing-library/jest-dom";

import { vi } from "vitest";

vi.mock("firebase/auth", () => ({
	onAuthStateChanged: vi.fn((_, callback) => {
		callback(null);
		return vi.fn();
	}),
	GoogleAuthProvider: vi.fn(),
	getAuth: vi.fn(),
	signInWithPopup: vi.fn(),
}));
