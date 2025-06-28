import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

import InputLabel from "../input-label";
import styles from "./style.module.scss";

interface TextAreaProps
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
	label: string;
	id: string;
	labelClassName?: string;
	resize?: "none" | "both" | "horizontal" | "vertical";
}

const TextArea = ({
	label,
	id,
	labelClassName,
	className,
	resize = "none",
	disabled = false,
	...restProps
}: TextAreaProps) => {
	return (
		<div className={styles.container}>
			<InputLabel htmlFor={id} text={label} className={labelClassName} />
			<textarea
				id={id}
				style={{ resize }}
				className={clsx(styles.textArea, className)}
				disabled={disabled}
				{...restProps}
			/>
		</div>
	);
};

export default TextArea;
