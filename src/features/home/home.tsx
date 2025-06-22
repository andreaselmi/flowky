import Button from '../../components/button';
import { useTheme } from '../../context/theme';

const Home = () => {
	const { toggleTheme } = useTheme()
	return (
		<div>
			<Button onClick={toggleTheme}>
				Switch Theme
			</Button>
		</div>
	);
};

export default Home;