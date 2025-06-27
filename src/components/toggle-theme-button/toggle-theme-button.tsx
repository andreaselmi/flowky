import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { type ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface ToggleThemeButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
	isDarkMode: boolean;
}

const ToggleThemeButton = ({
	onClick,
	isDarkMode,
	...props
}: ToggleThemeButtonProps) => {
	return (
		<button
			aria-label={
				isDarkMode ? "Switch to light mode" : "Switch to dark mode"
			}
			onClick={onClick}
			className={clsx(styles.iconButton)}
			{...props}
		>
			{isDarkMode ? <Sun /> : <Moon />}
		</button>
	);
};

export default ToggleThemeButton;
