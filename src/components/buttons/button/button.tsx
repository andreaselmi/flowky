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

		// Check if icon already has size prop
		const iconProps = Icon.props as {
			size?: number;
			width?: number;
			height?: number;
		};
		const hasSize = iconProps?.size !== undefined;
		const hasWidthHeight =
			iconProps?.width !== undefined || iconProps?.height !== undefined;

		let defaultIconProps: Record<string, string | number | boolean> = {
			"aria-hidden": "true", // hide icon from screen readers
		};

		// If icon doesn't already have sizing props, provide defaults
		if (!hasSize && !hasWidthHeight) {
			// Try to use size prop first (many icon libraries prefer this)
			// If that doesn't work, the icon component will ignore it
			defaultIconProps = {
				...defaultIconProps,
				size: 16,
				width: 16,
				height: 16,
			};
		}

		const iconWithProps = cloneElement(Icon, {
			...defaultIconProps,
			...(Icon.props ?? {}),
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
