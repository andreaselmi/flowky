import FacebookIcon from "@/components/icons/facebook";
import GoogleIcon from "@/components/icons/google";
import ToggleThemeButton from "@/components/toggle-theme-button";
import Typography from "@/components/typography";
import { useTheme } from "@/context/theme";

import SocialButton from "./social-button";
import styles from "./styles.module.scss";

const Auth = () => {
	const { toggleTheme, theme } = useTheme();
	return (
		<>
			{/* TODO: Remove it later */}
			<ToggleThemeButton
				onClick={toggleTheme}
				isDarkMode={theme === "dark"}
				style={{
					position: "fixed",
					top: "32px",
					right: "32px",
					zIndex: 999,
				}}
			/>
			<div className={styles.container}>
				<Typography variant="h1" className={styles.pageTitle}>
					Flowky
				</Typography>
				<Typography variant="body">
					Traccia la tua produttività
				</Typography>

				<section className={styles.authCard}>
					<Typography variant="h2" className={styles.authCardTitle}>
						Entra in Flowky
					</Typography>
					<Typography
						variant="body"
						className={styles.authCardSubtitle}
					>
						Usa il tuo account social per iniziare a tracciare le
						tue attività
					</Typography>

					<div className={styles.socialButtons}>
						<SocialButton
							label="Continua con Google"
							icon={<GoogleIcon />}
						/>
						<SocialButton
							label="Continua con Facebook"
							icon={<FacebookIcon width={20} height={20} />}
						/>
					</div>

					<div className={styles.authCardDividerContainer}>
						<div className={styles.authCardDivider} />
						<Typography
							variant="bodySmall"
							className={styles.authCardDividerText}
						>
							Semplice, veloce e sicuro
						</Typography>
					</div>

					<Typography
						className={styles.authCardTerms}
						variant="bodySmall"
					>
						Accedendo accetti i nostri{" "}
						<span className={styles.authCardTermsLink}>
							Termini di Servizio
						</span>{" "}
						e la{" "}
						<span className={styles.authCardTermsLink}>
							Privacy Policy
						</span>
					</Typography>
				</section>

				<div className={styles.authCardFooter}>
					<Typography variant="bodySmall">
						© 2025 Flowky. Designed with ❤️ for productivity.
					</Typography>
				</div>
			</div>
		</>
	);
};

export default Auth;
