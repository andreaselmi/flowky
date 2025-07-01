import Button from "@/components/buttons/button";
import type { ButtonProps } from "@/components/buttons/button/button";

interface SocialButtonProps extends Omit<ButtonProps, "children"> {
	icon: React.ReactElement;
	label: string;
}

const SocialButton = ({ icon, label, ...restProps }: SocialButtonProps) => {
	return (
		<Button icon={icon} variant="secondary" {...restProps}>
			{label}
		</Button>
	);
};

export default SocialButton;
