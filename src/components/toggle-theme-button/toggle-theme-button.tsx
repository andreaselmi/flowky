import clsx from "clsx";
import { Moon } from "lucide-react";
import { type ButtonHTMLAttributes, useState } from "react";

import styles from "./styles.module.scss";

interface ToggleThemeButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
}

const ToggleThemeButton = ({ onClick, ...props }: ToggleThemeButtonProps) => {
	const [rotation, setRotation] = useState(0);

	const handleClick = () => {
		setRotation(prev => prev + 180);
		onClick();
	};

	return (
		<button
			aria-label="Toggle theme"
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
