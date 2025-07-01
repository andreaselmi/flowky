import clsx from "clsx";
import { cloneElement, type ReactElement, type ReactNode } from "react";

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
	const renderIcon = () => {
		if (!Icon) return null;

		const defaultIconProps = {
			width: 16,
			height: 16,
			"aria-hidden": "true", // hide icon from screen readers
		};

		const iconWithProps = cloneElement(Icon, {
			...defaultIconProps,
			...(Icon.props || {}),
		});

		return <div className={styles.icon}>{iconWithProps}</div>;
	};

	return (
		<button
			className={clsx(styles.button, styles[variant], className)}
			onClick={onClick}
			{...restProps}
		>
			{renderIcon()}
			{children}
		</button>
	);
};

export default Button;
