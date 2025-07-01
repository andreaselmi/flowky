import React, { useEffect } from "react";

const ThemeWrapper = ({
	children,
	theme = "light",
}: {
	children: React.ReactNode;
	theme: "light" | "dark";
}) => {
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Cleanup function to remove dark class when component unmounts
		return () => {
			document.documentElement.classList.remove("dark");
		};
	}, [theme]);

	return <>{children}</>;
};

export default ThemeWrapper;
