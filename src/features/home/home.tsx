import { Plus } from "lucide-react";

import Button from "@/components/buttons/button";
import TextInput from "@/components/inputs/text-input";
import ToggleThemeButton from "@/components/toggle-theme-button";
import Typography from "@/components/typography";
import { useTheme } from "@/context/theme";

import styles from "./styles.module.scss";

const Home = () => {
	const { toggleTheme, theme } = useTheme();

	return (
		<div className={styles.home}>
			<Typography variant="display">Hello World</Typography>

			<Typography variant="h1">Hello World</Typography>

			<Typography variant="h2">Hello World</Typography>

			<Typography variant="h3">Hello World</Typography>

			<Typography variant="h4">Hello World</Typography>

			<Typography variant="h5">Hello World</Typography>

			<Typography variant="h6">Hello World</Typography>

			<Typography variant="body">Hello World</Typography>

			<Typography variant="bodyLarge">Hello World</Typography>

			<Typography variant="bodySmall">Hello World</Typography>

			<Button
				onClick={toggleTheme}
				variant="secondary"
				icon={<Plus size={16} />}
				style={{ marginBottom: "2rem" }}
			>
				Switch Theme
			</Button>

			<div className={styles.inputContainer}>
				<TextInput
					label="Minuti"
					id="minutes"
					type="number"
					placeholder="Inserisci un valore"
				/>
			</div>
			<ToggleThemeButton
				onClick={toggleTheme}
				isDarkMode={theme === "dark"}
			/>
		</div>
	);
};

export default Home;
