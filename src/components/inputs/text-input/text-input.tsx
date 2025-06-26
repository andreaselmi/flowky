import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const TextInput = ({
	label,
	type = "text",
	className,
	...restProps
}: TextInputProps) => {
	return (
		<label htmlFor={restProps.id} className={clsx(styles.label, className)}>
			{label && <span className={styles.labelText}>{label}</span>}
			<input type={type} className={styles.textInput} {...restProps} />
		</label>
	);
};

export default TextInput;
