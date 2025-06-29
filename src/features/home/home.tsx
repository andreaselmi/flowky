import { Plus } from "lucide-react";
import { useState } from "react";

import Button from "@/components/buttons/button";
import Select from "@/components/inputs/select";
import TextArea from "@/components/inputs/text-area";
import TextInput from "@/components/inputs/text-input";
import Dialog from "@/components/modals/dialog";
import ToggleThemeButton from "@/components/toggle-theme-button";
import Typography from "@/components/typography";
import { useTheme } from "@/context/theme";

import styles from "./styles.module.scss";

const Home = () => {
	const { toggleTheme, theme } = useTheme();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<div className={styles.home}>
			<Select
				label="Seleziona un'opzione"
				id="select"
				options={[
					{ id: "1", label: "Opzione 1" },
					{ id: "2", label: "Opzione 2" },
					{ id: "3", label: "Opzione 3" },
				]}
				onChange={value => console.log(value)}
			/>
			<TextArea
				label="Testo"
				id="text"
				placeholder="Inserisci un testo"
			/>
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
				variant="primary"
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

			<Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
				Open Dialog
			</Button>

			{isDialogOpen && (
				<Dialog
					isOpen={isDialogOpen}
					setIsOpen={() => setIsDialogOpen(false)}
					title="Dialog Title"
				>
					<p>Dialog Content</p>
				</Dialog>
			)}
		</div>
	);
};

export default Home;
