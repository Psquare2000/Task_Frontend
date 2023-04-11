import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { addCronJob } from "../requests";
import { FREQ, LSKeys } from "../models";

function FrequencyButton({ freq, setFrequency, currentFrequency }) {
	return (
		<Button
			variant={freq === currentFrequency ? "contained" : "outlined"}
			onClick={() => setFrequency(freq)}
		>
			{freq.title}
		</Button>
	);
}

export default function FormPropsTextFields({ backups, setBackups }) {
	const [repoLink, setRepoLink] = useState("");
	const [frequency, setFrequency] = useState(FREQ.daily);
	const [location, setLocation] = useState("");
	const [isLoading, setLoading] = useState(false);

	return (
		<div className="flex flex-col items-center gap-y-5 px-20 py-10 bg-slate-700 rounded-lg">
			<div className="flex item-center justify-center gap-x-3">
				<TextField
					id="filled-helperText"
					label="Repository Link"
					helperText="https://github.com/XxxxXxx/xxxx.git"
					variant="filled"
					value={repoLink}
					onChange={(e) => {
						setRepoLink(e.target.value);
						let name = e.target.value
							.split("/")
							.slice(-1)[0]
							.split(".")
							.slice(0)[0];
						setLocation(name);
					}}
				/>
				<TextField
					id="filled-helperText"
					label="Backup Folder"
					variant="filled"
					value={location}
					onChange={(e) => {
						setLocation(e.target.value);
					}}
				/>
			</div>
			<div className="flex flex-row gap-x-2">
				{Object.values(FREQ).map((freq) => (
					<FrequencyButton
						key={freq.title.length}
						freq={freq}
						setFrequency={setFrequency}
						currentFrequency={frequency}
					/>
				))}
			</div>
			{isLoading ? (
				<LoadingButton
					size="small"
					loading={isLoading}
					variant="outlined"
					disabled
				>
					<span>disabled</span>
				</LoadingButton>
			) : (
				<Button
					color="primary"
					variant="contained"
					aria-label="add an alarm"
					onClick={async () => {
						setLoading(true);
						try {
							const pattern = new RegExp(
								"((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?"
							);
							if (!pattern.test(repoLink) && repoLink !== "abc") {
								alert(
									"Please check the repository link and try again"
								);
								return;
							}
							let alreadyExists = false;
							backups.forEach((data) => {
								alreadyExists =
									alreadyExists ||
									(repoLink === data.repoLink &&
										frequency === data.frequency &&
										location === data.location);
							});
							if (alreadyExists) {
								alert("The given entry already exists");
								return;
							}
							// TODO: handle backup location
							const response = await addCronJob(
								repoLink,
								frequency.frequency,
								location
							);
							if (!response) {
								alert(
									"Unable to process your request at the moment, please try again!"
								);
								return;
							}
							setBackups((prev) => {
								let final = [
									...prev,
									{
										repoLink: repoLink,
										frequency: frequency,
										location: location,
									},
								];
								return final;
							});
							setRepoLink("");
							setLocation("");
						} catch (e) {
							alert(e);
						} finally {
							setLoading(false);
						}
					}}
					endIcon={<LibraryAddIcon />}
				>
					Add Backup
				</Button>
			)}
		</div>
	);
}
