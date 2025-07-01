import React from "react";

const ThemeWrapper = ({
	children,
	theme = "light",
}: {
	children: React.ReactNode;
	theme: "light" | "dark";
}) => {
	if (theme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}

	return <>{children}</>;
};

export default ThemeWrapper;
