import type { SelectHTMLAttributes } from "react";

import InputLabel from "../input-label";
import styles from "./styles.module.scss";

interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "onChange"> {
	label: string;
	id: string;
	options: { id: string; label: string }[];
	onChange: (id: string) => void;
}

const Select = ({
	label,
	id,
	options,
	onChange,
	...restProps
}: SelectProps) => {
	return (
		<div className={styles.container}>
			<InputLabel htmlFor={id} text={label} />
			<select
				id={id}
				className={styles.select}
				onChange={e => onChange(e.target.value)}
				{...restProps}
			>
				{options.map(option => (
					<option key={option.id} value={option.id}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
