import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import styles from "./styles.module.scss";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
	className,
	...restProps
}: ButtonProps) => {
	return (
		<button
			className={clsx(styles.button, styles[variant], className)}
			onClick={onClick}
			{...restProps}
		>
			{Icon}
			{children}
		</button>
	);
};

export default Button;
