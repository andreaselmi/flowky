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
				variant="secondary"
				icon={<Plus size={16} />}
			>
				Switch Theme
			</Button>
			<TextInput />
			{/* <ToggleThemeButton
				onClick={toggleTheme}
				isDarkMode={theme === "dark"}
			/> */}
		</div>
	);
};

export default Home;
