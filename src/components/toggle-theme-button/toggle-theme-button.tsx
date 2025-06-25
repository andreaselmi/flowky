import clsx from "clsx";
import { Moon } from "lucide-react";
import { type ButtonHTMLAttributes, useState } from "react";

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

	const handleClick = () => {
		setRotation(prev => prev + 180);
		onClick();
	};

	return (
		<button
			aria-label={
				isDarkMode ? "Switch to light mode" : "Switch to dark mode"
			}
			onClick={handleClick}
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
