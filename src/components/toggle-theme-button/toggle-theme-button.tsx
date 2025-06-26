import clsx from "clsx";
import { Moon } from "lucide-react";
import { type ButtonHTMLAttributes, useEffect, useState } from "react";

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
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		setRotation(isDarkMode ? 180 : 0);
	}, [isDarkMode]);

	return (
		<button
			aria-label={
				isDarkMode ? "Switch to light mode" : "Switch to dark mode"
			}
			onClick={onClick}
			className={clsx(styles.iconButton)}
			{...props}
		>
			<Moon
				size={20}
				style={{ transform: `rotate(${rotation}deg)` }}
				className={styles.icon}
			/>
		</button>
	);
};

export default ToggleThemeButton;
