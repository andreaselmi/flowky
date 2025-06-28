import clsx from "clsx";

import Typography from "@/components/typography";
import type { TypographyProps } from "@/components/typography/typography";

import styles from "./styles.module.scss";

interface InputLabelProps extends Omit<TypographyProps<"label">, "variant"> {
	htmlFor: string;
	text: string;
	variant?: TypographyProps<"label">["variant"];
}

const InputLabel = ({
	className,
	htmlFor,
	text,
	variant = "bodySmall",
	...restProps
}: InputLabelProps) => {
	return (
		<Typography
			htmlFor={htmlFor}
			component="label"
			variant={variant}
			className={clsx(styles.label, className)}
			{...restProps}
		>
			{text}
		</Typography>
	);
};

export default InputLabel;
