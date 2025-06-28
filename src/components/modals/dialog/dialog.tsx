import { X } from "lucide-react";

import styles from "./styles.module.scss";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	showCloseIcon?: boolean;
}

const Dialog = ({
	isOpen,
	onClose,
	title,
	children,
	showCloseIcon = true,
}: DialogProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.dialog} onClick={e => e.stopPropagation()}>
				{(title || showCloseIcon) && (
					<div className={styles.header}>
						{title && <h2 className={styles.title}>{title}</h2>}
						{showCloseIcon && (
							<button className={styles.close} onClick={onClose}>
								<X size={20} />
							</button>
						)}
					</div>
				)}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Dialog;
