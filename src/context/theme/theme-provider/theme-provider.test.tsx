import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ThemeProvider from './theme-provider';
import ThemeContext from '../theme-context';

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

// Mock document.documentElement
const documentElementMock = {
	classList: {
		add: vi.fn(),
		remove: vi.fn(),
	},
};

// Test component to consume the context
const TestComponent = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div>
			<span data-testid="current-theme">{theme}</span>
			<button data-testid="toggle-button" onClick={toggleTheme}>
				Toggle Theme
			</button>
		</div>
	);
};

describe('ThemeProvider', () => {
	beforeEach(() => {
		// Reset all mocks
		vi.clearAllMocks();

		// Mock localStorage
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock,
			writable: true,
		});

		// Mock document.documentElement
		Object.defineProperty(document, 'documentElement', {
			value: documentElementMock,
			writable: true,
		});
	});

	describe('Initial theme loading', () => {
		it('should start with light theme when no saved theme exists', () => {
			localStorageMock.getItem.mockReturnValue(null);

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
			expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
		});

		it('should load saved light theme from localStorage', () => {
			localStorageMock.getItem.mockReturnValue('light');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('light');
		});

		it('should load saved dark theme from localStorage', () => {
			localStorageMock.getItem.mockReturnValue('dark');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('dark');
		});
	});

	describe('Theme toggling', () => {
		it('should toggle from light to dark theme', async () => {
			localStorageMock.getItem.mockReturnValue('light');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

			await userEvent.click(screen.getByTestId('toggle-button'));

			expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
			expect(documentElementMock.classList.remove).toHaveBeenCalledWith('light');
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('dark');
		});

		it('should toggle from dark to light theme', async () => {
			localStorageMock.getItem.mockReturnValue('dark');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

			await userEvent.click(screen.getByTestId('toggle-button'));

			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
			expect(documentElementMock.classList.remove).toHaveBeenCalledWith('dark');
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('light');
		});

		it('should handle multiple theme toggles correctly', async () => {
			localStorageMock.getItem.mockReturnValue('light');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			// Start with light theme
			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

			// Toggle to dark
			await userEvent.click(screen.getByTestId('toggle-button'));
			expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

			// Toggle back to light
			await userEvent.click(screen.getByTestId('toggle-button'));
			expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

			// Verify localStorage was called correctly
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
			expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
		});
	});

	describe('DOM manipulation', () => {
		it('should not add class to documentElement when no saved theme', () => {
			localStorageMock.getItem.mockReturnValue(null);

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(documentElementMock.classList.add).not.toHaveBeenCalled();
		});

		it('should correctly manage CSS classes during theme changes', async () => {
			localStorageMock.getItem.mockReturnValue('light');

			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			// Initial theme should add light class
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('light');

			// Toggle to dark
			await userEvent.click(screen.getByTestId('toggle-button'));

			// Should remove light and add dark
			expect(documentElementMock.classList.remove).toHaveBeenCalledWith('light');
			expect(documentElementMock.classList.add).toHaveBeenCalledWith('dark');
		});
	});

	describe('Context value', () => {
		it('should provide theme and toggleTheme function to children', () => {
			render(
				<ThemeProvider>
					<TestComponent />
				</ThemeProvider>
			);

			expect(screen.getByTestId('current-theme')).toBeInTheDocument();
			expect(screen.getByTestId('toggle-button')).toBeInTheDocument();
		});
	});
});
