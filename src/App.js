import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormPropsTextFields from "./components/form";
import AddedRepositories from "./components/addedRepositories";
import { useState, useEffect } from "react";
import { LSKeys } from "./models";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	let stale = Array.from(
		JSON.parse(localStorage.getItem(LSKeys.ongoingBackups)) ?? []
	);
	const [backups, setBackups] = useState(stale);

	useEffect(() => {
		localStorage.setItem(LSKeys.ongoingBackups, JSON.stringify(backups));
	}, [backups]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="flex flex-col items-center justify-center h-screen bg-slate-900 gap-y-3">
				<FormPropsTextFields
					backups={backups}
					setBackups={setBackups}
				/>
				<AddedRepositories backups={backups} setBackups={setBackups} />
			</div>
		</ThemeProvider>
	);
}

export default App;
