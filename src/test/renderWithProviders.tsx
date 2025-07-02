/* eslint-disable react-refresh/only-export-components */
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router";

import { AuthProvider } from "@/context/auth";
import { ThemeProvider } from "@/context/theme";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<AuthProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</AuthProvider>
		</ThemeProvider>
	);
};

const customRender = (ui: React.ReactNode, options?: RenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
