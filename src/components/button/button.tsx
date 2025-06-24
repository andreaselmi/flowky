import type { ReactNode } from 'react';
import styles from './styles.module.scss'
import clsx from 'clsx';

interface ButtonProps {
	onClick?: () => void;
	children: ReactNode;
	variant?: 'primary' | 'secondary';
}

const Button = ({ onClick, children, variant = 'primary' }: ButtonProps) => {
	return (
		<button className={clsx(styles.button, styles[variant])} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;