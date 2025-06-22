import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
		setTheme(savedTheme);
		document.documentElement.classList.add(savedTheme);
	}, []);

	const toggleTheme = () => {
		alert('toggleTheme');
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;