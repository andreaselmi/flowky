import clsx from "clsx";
import React, { type ComponentProps, type ElementType } from "react";

import styles from "./styles.module.scss";

type Variant =
	| "display"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "body"
	| "bodyLarge"
	| "bodySmall";

const defaultElementMapping: Record<Variant, ElementType> = {
	display: "h1",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	body: "p",
	bodyLarge: "p",
	bodySmall: "p",
} as const;

interface BaseTypographyProps {
	variant: Variant;
	children?: React.ReactNode;
}

type TypographyProps<C extends ElementType> = BaseTypographyProps & {
	component?: C;
} & Omit<ComponentProps<C>, keyof BaseTypographyProps>;

const Typography = <C extends ElementType = "p">({
	variant,
	children,
	component,
	className,
	...restProps
}: TypographyProps<C>) => {
	const Component = component || defaultElementMapping[variant];

	return (
		<Component className={clsx(styles[variant], className)} {...restProps}>
			{children}
		</Component>
	);
};

export default Typography;
