import { Plus } from "lucide-react";

import Button from "@/components/buttons/button";
import TextInput from "@/components/inputs/text-input";
import { useTheme } from "@/context/theme";

import styles from "./styles.module.scss";

const Home = () => {
	const { toggleTheme } = useTheme();

	return (
		<div className={styles.home}>
			<Button
				onClick={toggleTheme}
				variant="primary"
				icon={<Plus size={16} />}
				style={{ marginBottom: "2rem" }}
			>
				Switch Theme
			</Button>

			<div className={styles.inputContainer}>
				<TextInput
					label="Minuti"
					id="text-input"
					type="number"
					placeholder="Inserisci un valore"
				/>
			</div>
			{/* <ToggleThemeButton
				onClick={toggleTheme}
				isDarkMode={theme === "dark"}
			/> */}
		</div>
	);
};

export default Home;
