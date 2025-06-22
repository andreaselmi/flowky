import { useEffect, useState } from "react";
import ThemeContext from "./theme-context";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.classList.add(savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.remove(theme);
		document.documentElement.classList.add(newTheme);
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;