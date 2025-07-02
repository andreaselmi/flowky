import "@/design-system/main.scss";
import "./index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./context/theme";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</AuthProvider>
	</StrictMode>
);
