import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import styles from "./styles.module.scss";

function safelyShowModal(dialog: HTMLDialogElement | null) {
	if (dialog && !dialog.open) {
		dialog.showModal();
	}
}

interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	title?: string;
	children: React.ReactNode;
	showCloseIcon?: boolean;
	closeOnClickOutside?: boolean;
}

const Dialog = ({
	isOpen,
	setIsOpen,
	title,
	children,
	showCloseIcon = true,
	closeOnClickOutside = true,
	...props
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	useEffect(() => {
		const dialog = dialogRef.current;

		if (isOpen) {
			safelyShowModal(dialog);
		} else {
			dialog?.close();
		}

		return () => {
			dialog?.close();
		};
	}, [isOpen]);

	useEffect(() => {
		const dialog = dialogRef.current;

		/** function that runs when we intercept a close event */
		function handleClose(event: Event | KeyboardEvent) {
			event.preventDefault();
			event.stopPropagation();
			setIsOpen(false);
		}

		/** Handles dismissing the modal when clicking outside of it / on the ::backdrop */
		function lightDismiss(event: Event) {
			const { target } = event;
			if (target instanceof Element && target.nodeName === "DIALOG") {
				handleClose(event);
			}
		}

		/** function that runs when the user presses the Escape key when the Modal is open */
		function closeOnEscape(event: KeyboardEvent) {
			if (event.code === "Escape") {
				handleClose(event);
			}
		}

		// we add a click event listener to handle the Modal light dismiss
		if (closeOnClickOutside) {
			dialog?.addEventListener("click", lightDismiss);
		}

		// we add a keydown event listener to intercept the Escape key press
		dialog?.addEventListener("keydown", closeOnEscape);

		// our clean up function removes the event listeners to prevent memory leaks
		return () => {
			if (closeOnClickOutside) {
				dialog?.removeEventListener("click", lightDismiss);
			}
			dialog?.removeEventListener("keydown", closeOnEscape);
		};
	}, [setIsOpen, closeOnClickOutside]);

	return (
		<dialog
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? titleId : undefined}
			ref={dialogRef}
			className={styles.overlay}
			{...props}
		>
			<div className={styles.dialog}>
				{(title || showCloseIcon) && (
					<div className={styles.header}>
						{title && (
							<h2 className={styles.title} id={titleId}>
								{title}
							</h2>
						)}
						{showCloseIcon && (
							<button
								aria-label="Close Dialog"
								className={styles.close}
								onClick={() => setIsOpen(false)}
							>
								<X size={20} />
							</button>
						)}
					</div>
				)}
				<div>{children}</div>
			</div>
		</dialog>
	);
};

export default Dialog;
