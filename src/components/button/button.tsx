import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import styles from "./styles.module.scss";

interface ButtonProps {
	onClick?: () => void;
	children: ReactNode;
	variant?: "primary" | "secondary";
	icon?: ReactElement;
}

const Button = ({
	children,
	icon: Icon,
	onClick,
	variant = "primary",
}: ButtonProps) => {
	return (
		<button
			className={clsx(styles.button, styles[variant])}
			onClick={onClick}
		>
			{Icon && Icon}
			{children}
		</button>
	);
};

export default Button;
