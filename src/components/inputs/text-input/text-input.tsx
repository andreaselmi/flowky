import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

import Typography from "@/components/typography";

import styles from "./styles.module.scss";

interface BaseProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
	labelClassName?: string;
}

/**
 * Text input component props where label is optional.
 * If a label is provided, an id must also be provided for accessibility.
 * If no label is provided, id is optional.
 */
type TextInputProps = BaseProps &
	(
		| {
				label: string;
				id: string;
		  }
		| {
				label?: undefined;
				id?: string;
		  }
	);

const TextInput = ({
	label,
	type = "text",
	className,
	labelClassName,
	id,
	...restProps
}: TextInputProps) => {
	return (
		<div className={styles.container}>
			{label && (
				<Typography
					variant="bodySmall"
					component="label"
					htmlFor={id}
					className={clsx(styles.label, labelClassName)}
				>
					{label}
				</Typography>
			)}
			<input
				id={id}
				type={type}
				className={clsx(styles.textInput, className)}
				{...restProps}
			/>
		</div>
	);
};

export default TextInput;
