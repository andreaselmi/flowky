import { Plus } from "lucide-react";

import Button from "../../components/button";
import ToggleThemeButton from "../../components/toggle-theme-button";
import { useTheme } from "../../context/theme";
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
			<ToggleThemeButton onClick={toggleTheme} />
		</div>
	);
};

export default Home;
