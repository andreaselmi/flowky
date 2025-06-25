import Button from "../../components/button";
import { useTheme } from "../../context/theme";
import styles from "./styles.module.scss";

const Home = () => {
	const { toggleTheme } = useTheme();

	return (
		<div className={styles.home}>
			<Button onClick={toggleTheme} variant="secondary">
				Switch Theme
			</Button>
		</div>
	);
};

export default Home;
