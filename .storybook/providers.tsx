import React from "react";
import { BrowserRouter } from "react-router";

import { AuthProvider } from "../src/context/auth";
import ThemeWrapper from "./theme-wrapper";

const Providers = ({
	children,
	theme = "light",
}: {
	children: React.ReactNode;
	theme: "light" | "dark";
}) => {
	return (
		<AuthProvider>
			<ThemeWrapper theme={theme}>
				<BrowserRouter>{children}</BrowserRouter>
			</ThemeWrapper>
		</AuthProvider>
	);
};

export default Providers;
